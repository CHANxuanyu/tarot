import { useEffect, useRef, useState } from 'react';
import { useDivinationContext } from '../store/DivinationContext';
import { interpret, interpretRich, generateSynthesis } from '../core/InterpretationEngine';
import { getThemeAssetPath } from '../core/ThemeLoader';
import { saveReading } from '../core/HistoryManager';
import { generateShareCard } from '../core/CanvasShare';

export function ResultStage() {
  const { state, dispatch } = useDivinationContext();
  const copy = state.copy?.lang[state.lang];
  const saved = useRef(false);
  const [richTexts, setRichTexts] = useState<Record<number, string>>({});

  useEffect(() => {
    if (!saved.current && state.drawnCards.length > 0) {
      saveReading(state.drawnCards);
      saved.current = true;
    }
  }, [state.drawnCards]);

  useEffect(() => {
    let cancelled = false;
    async function loadRich() {
      const results: Record<number, string> = {};
      for (const drawn of state.drawnCards) {
        const text = await interpretRich(drawn, state.lang, state.themeId);
        if (text) results[drawn.card.id] = text;
      }
      if (!cancelled) setRichTexts(results);
    }
    loadRich();
    return () => { cancelled = true; };
  }, [state.drawnCards, state.lang, state.themeId]);

  const handleReset = () => {
    dispatch({ type: 'RESET' });
  };

  const handleShare = async () => {
    if (!copy) return;
    const blob = await generateShareCard(state.drawnCards, state.lang, state.themeId, state.question);
    if (!blob) return;

    if (navigator.share && navigator.canShare?.({ files: [new File([blob], 'reading.png')] })) {
      await navigator.share({
        files: [new File([blob], 'tarot-reading.png', { type: 'image/png' })],
      });
    } else {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'tarot-reading.png';
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  if (!copy) return null;

  return (
    <div className="stage result-stage">
      <h2 className="result-title">
        {state.lang === 'zh' ? '✦ 占卜结果 ✦' : '✦ Your Reading ✦'}
      </h2>
      {state.question && (
        <p className="result-question">"{state.question}"</p>
      )}
      <div className="result-cards">
        {state.drawnCards.map(drawn => {
          const imgPath = getThemeAssetPath(state.themeId, drawn.card.image);
          const text = richTexts[drawn.card.id] || interpret(drawn, copy, state.lang);
          return (
            <div key={drawn.card.id} className="result-card-item">
              <div className="result-card-header">
                <span className="result-position">{drawn.position}</span>
                <span className="result-orientation">
                  {drawn.reversed
                    ? (state.lang === 'zh' ? '逆位' : 'Reversed')
                    : (state.lang === 'zh' ? '正位' : 'Upright')
                  }
                </span>
              </div>
              <div className={`result-card-img ${drawn.reversed ? 'reversed' : ''}`}>
                <img src={imgPath} alt={drawn.card.name} />
              </div>
              <h3 className="result-card-name">
                {state.lang === 'zh' ? drawn.card.nameZh : drawn.card.name}
              </h3>
              <p className="result-interpretation">{text}</p>
            </div>
          );
        })}
      </div>
      <div className="result-synthesis">
        <h3 className="synthesis-title">
          {state.lang === 'zh' ? '✦ 综合解读 ✦' : '✦ Overall Reading ✦'}
        </h3>
        <p className="synthesis-text">
          {generateSynthesis(state.drawnCards, state.lang)}
        </p>
      </div>
      <div className="result-actions">
        <button className="action-btn" onClick={handleShare}>
          ✦ {copy.share} ✦
        </button>
        <button className="action-btn" onClick={handleReset}>
          ✦ {copy.readAgain} ✦
        </button>
      </div>
    </div>
  );
}
