import { useState } from 'react';
import { useDivinationContext } from '../store/DivinationContext';
import { shuffleDeck, drawCards } from '../core/DivinationEngine';
import { getThemeAssetPath } from '../core/ThemeLoader';
import { playSound } from '../core/AudioManager';
import { useI18n } from '../i18n/I18nContext';
import type { TranslationKey } from '../i18n';

const SPREAD_NAMES: Record<string, TranslationKey> = {
  'single-card':  'shuffle.single',
  'three-card':   'shuffle.three',
  'celtic-cross': 'shuffle.celtic',
};

export function ShuffleStage() {
  const { state, dispatch } = useDivinationContext();
  const { locale, t } = useI18n();
  const [phase, setPhase] = useState<'idle' | 'fanning' | 'scattering' | 'gathering'>('idle');

  const backSrc = getThemeAssetPath(state.themeId, state.theme?.cardBack || 'assets/back.svg');

  const handleShuffle = () => {
    dispatch({ type: 'SET_STAGE', payload: 'shuffling' });
    setPhase('fanning');
    if (state.soundEnabled) playSound('shuffle');

    setTimeout(() => setPhase('scattering'), 600);
    setTimeout(() => setPhase('gathering'), 1400);
    setTimeout(() => {
      if (!state.cards || !state.spreads) return;

      // Find the selected spread by spreadId
      const spread = state.spreads.spreads.find(s => s.id === state.spreadId)
        || state.spreads.spreads[0];
      const positions = spread.layout.map(l => locale === 'zh-CN' ? l.labelZh : l.label);
      const shuffled = shuffleDeck(state.cards.cards);
      const drawn = drawCards(shuffled, spread.positions, positions);
      dispatch({ type: 'SET_DRAWN_CARDS', payload: drawn });
      dispatch({ type: 'SET_STAGE', payload: 'selecting' });
    }, 2200);
  };

  const cardCount = 7;
  const cards = Array.from({ length: cardCount }, (_, i) => i);
  const spreadName = SPREAD_NAMES[state.spreadId] ? t(SPREAD_NAMES[state.spreadId]) : state.spreadId;

  return (
    <div className="stage shuffle-stage">
      <div className="shuffle-spread-badge">
        ✦ {spreadName} ✦
      </div>

      {state.question && (
        <div className="prompt" style={{ maxWidth: 340, textAlign: 'center' }}>
          「{state.question}」
        </div>
      )}

      <p className="prompt">
        {t('shuffle.prompt')}
      </p>

      <div className={`deck-area deck-${phase}`}>
        {cards.map(i => (
          <div
            key={i}
            className="deck-card"
            style={{ '--card-index': i, '--card-total': cardCount } as React.CSSProperties}
          >
            <img src={backSrc} alt="" draggable={false} />
          </div>
        ))}
      </div>

      <button
        className="action-btn"
        onClick={handleShuffle}
        disabled={state.stage === 'shuffling'}
      >
        {state.stage === 'shuffling' ? '✦ ✦ ✦' : `✦ ${t('shuffle.button')} ✦`}
      </button>
    </div>
  );
}
