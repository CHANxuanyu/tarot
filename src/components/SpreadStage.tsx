import { useState } from 'react';
import { useDivinationContext } from '../store/DivinationContext';
import { getThemeAssetPath } from '../core/ThemeLoader';
import { playSound } from '../core/AudioManager';
import { Card } from './Card';
import { useI18n } from '../i18n/I18nContext';

export function SpreadStage() {
  const { state, dispatch } = useDivinationContext();
  const { locale, t } = useI18n();
  const [revealedIndices, setRevealedIndices] = useState<Set<number>>(new Set());
  const [transitioning, setTransitioning] = useState(false);

  const handleReveal = (idx: number) => {
    if (transitioning) return;
    const next = new Set(revealedIndices);
    next.add(idx);
    setRevealedIndices(next);
    playSound('flip');

    if (next.size === state.drawnCards.length) {
      setTransitioning(true);
      setTimeout(() => {
        playSound('reveal');
      }, 600);
      setTimeout(() => {
        dispatch({ type: 'SET_STAGE', payload: 'result' });
      }, 1200);
    }
  };

  return (
    <div className="stage spread-stage">
      <p className="prompt">{t('spread.selectPrompt')}</p>
      <div className="spread-layout">
        {state.drawnCards.map((drawn, idx) => {
          const revealed = revealedIndices.has(idx);
          const imgPath = getThemeAssetPath(state.themeId, drawn.card.image);
          return (
            <Card
              key={drawn.card.id}
              faceUp={revealed}
              image={imgPath}
              reversed={drawn.reversed}
              label={drawn.position}
              onClick={() => !revealed && handleReveal(idx)}
            />
          );
        })}
      </div>
      {revealedIndices.size > 0 && revealedIndices.size < state.drawnCards.length && (
        <p className="prompt" style={{ fontSize: '0.9rem', opacity: 0.6 }}>
          {locale === 'zh-CN'
            ? `${state.drawnCards.length - revealedIndices.size}${t('spread.remaining')}…`
            : `${state.drawnCards.length - revealedIndices.size} ${t('spread.remaining')}...`}
        </p>
      )}
    </div>
  );
}
