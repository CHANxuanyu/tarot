import { useEffect, useState } from 'react';
import { useDivinationContext } from '../store/DivinationContext';
import { yaoFromValue, computeHexagram, type Yao, type HexagramData } from '../core/IChing';
import { HexagramDiagram } from './HexagramDiagram';

export function HexagramResult() {
  const { state, dispatch } = useDivinationContext();
  const [primaryHex, setPrimaryHex] = useState<HexagramData | null>(null);
  const [changedHex, setChangedHex] = useState<HexagramData | null>(null);
  const [castResult, setCastResult] = useState<ReturnType<typeof computeHexagram> | null>(null);

  useEffect(() => {
    if (!state.hexagram) return;
    const yaos: Yao[] = state.hexagram.map(v => yaoFromValue(v as 6 | 7 | 8 | 9));
    const result = computeHexagram(yaos);
    setCastResult(result);

    fetch(`/themes/${state.themeId}/hexagrams.json`)
      .then(r => r.json())
      .then(data => {
        const hexes = data.hexagrams;
        setPrimaryHex(hexes[String(result.primaryHexagram)] || null);
        if (result.changedHexagram) {
          setChangedHex(hexes[String(result.changedHexagram)] || null);
        }
      });
  }, [state.hexagram, state.themeId]);

  const handleReset = () => dispatch({ type: 'RESET' });

  if (!castResult || !primaryHex) {
    return <div className="stage">Loading...</div>;
  }

  const isZh = state.lang === 'zh';

  return (
    <div className="stage result-stage hexagram-result">
      {state.question && (
        <p className="result-question">"{state.question}"</p>
      )}

      <div className="hexagram-display">
        <div className="hexagram-primary">
          <HexagramDiagram
            yaos={castResult.yaos}
            label={isZh ? '本卦' : 'Primary'}
          />
          <div className="hexagram-info">
            <span className="hexagram-char">{primaryHex.character}</span>
            <h2 className="hexagram-name">
              {isZh ? primaryHex.nameZh : primaryHex.name}
            </h2>
          </div>
        </div>

        {changedHex && (
          <>
            <div className="hexagram-arrow">→</div>
            <div className="hexagram-changed">
              <HexagramDiagram
                yaos={castResult.yaos.map(y => ({
                  isYang: y.isChanging ? !y.isYang : y.isYang,
                  isChanging: false,
                }))}
                label={isZh ? '变卦' : 'Changed'}
              />
              <div className="hexagram-info">
                <span className="hexagram-char">{changedHex.character}</span>
                <h2 className="hexagram-name">
                  {isZh ? changedHex.nameZh : changedHex.name}
                </h2>
              </div>
            </div>
          </>
        )}
      </div>

      <div className="hexagram-reading">
        <div className="reading-section">
          <h3>{isZh ? '卦辞' : 'Judgment'}</h3>
          <p>{isZh ? primaryHex.judgmentZh : primaryHex.judgment}</p>
        </div>

        <div className="reading-section">
          <h3>{isZh ? '象辞' : 'Image'}</h3>
          <p>{isZh ? primaryHex.imageZh : primaryHex.image}</p>
        </div>

        {castResult.changingLines.length > 0 && (
          <div className="reading-section">
            <h3>{isZh ? '动爻' : 'Changing Lines'}</h3>
            {castResult.changingLines.map(idx => (
              <p key={idx} className="line-reading">
                <strong>{isZh ? `第${idx + 1}爻` : `Line ${idx + 1}`}:</strong>{' '}
                {isZh ? primaryHex.linesZh[idx] : primaryHex.lines[idx]}
              </p>
            ))}
          </div>
        )}

        {changedHex && (
          <div className="reading-section">
            <h3>{isZh ? '变卦卦辞' : 'Changed Hexagram'}</h3>
            <p>{isZh ? changedHex.judgmentZh : changedHex.judgment}</p>
          </div>
        )}
      </div>

      <div className="result-actions">
        <button className="action-btn" onClick={handleReset}>
          ✦ {state.copy?.lang[state.lang].readAgain} ✦
        </button>
      </div>
    </div>
  );
}
