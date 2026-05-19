import { useState } from 'react';
import { useDivinationContext } from '../store/DivinationContext';
import { shuffleDeck, drawCards } from '../core/DivinationEngine';
import { getThemeAssetPath } from '../core/ThemeLoader';
import { playSound } from '../core/AudioManager';

export function ShuffleStage() {
  const { state, dispatch } = useDivinationContext();
  const copy = state.copy?.lang[state.lang];
  const [phase, setPhase] = useState<'idle' | 'fanning' | 'scattering' | 'gathering'>('idle');
  const [question, setQuestion] = useState('');

  const backSrc = getThemeAssetPath(state.themeId, state.theme?.cardBack || 'assets/back.svg');

  const handleShuffle = () => {
    dispatch({ type: 'SET_QUESTION', payload: question.trim() });
    dispatch({ type: 'SET_STAGE', payload: 'shuffling' });
    setPhase('fanning');
    playSound('shuffle');

    setTimeout(() => setPhase('scattering'), 600);
    setTimeout(() => setPhase('gathering'), 1400);
    setTimeout(() => {
      if (!state.cards || !state.spreads) return;
      const spread = state.spreads.spreads[0];
      const positions = spread.layout.map(l => state.lang === 'zh' ? l.labelZh : l.label);
      const shuffled = shuffleDeck(state.cards.cards);
      const drawn = drawCards(shuffled, spread.positions, positions);
      dispatch({ type: 'SET_DRAWN_CARDS', payload: drawn });
      dispatch({ type: 'SET_STAGE', payload: 'selecting' });
    }, 2200);
  };

  const cardCount = 7;
  const cards = Array.from({ length: cardCount }, (_, i) => i);

  return (
    <div className="stage shuffle-stage">
      <p className="prompt">{copy?.shufflePrompt}</p>
      <div className="question-input-wrapper">
        <input
          type="text"
          className="question-input"
          placeholder={state.lang === 'zh' ? '输入你的问题（可选）...' : 'Enter your question (optional)...'}
          value={question}
          onChange={e => setQuestion(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter' && state.stage !== 'shuffling') handleShuffle(); }}
          disabled={state.stage === 'shuffling'}
          maxLength={100}
          aria-label="Your question"
        />
      </div>
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
        {state.stage === 'shuffling' ? '✦ ✦ ✦' : `✦ ${copy?.revealButton || 'Shuffle'} ✦`}
      </button>
    </div>
  );
}
