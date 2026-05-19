import { useState, useCallback } from 'react';
import { useDivinationContext } from '../store/DivinationContext';
import { castCoin, yaoFromValue, computeHexagram, getCoinResults, type Yao } from '../core/IChing';
import { playSound } from '../core/AudioManager';
import { CoinToss } from './CoinToss';

const YAO_NAMES_EN = ['Line 1 (bottom)', 'Line 2', 'Line 3', 'Line 4', 'Line 5', 'Line 6 (top)'];
const YAO_NAMES_ZH = ['初爻', '二爻', '三爻', '四爻', '五爻', '上爻'];

export function CastingStage() {
  const { state, dispatch } = useDivinationContext();
  const copy = state.copy?.lang[state.lang];
  const [yaos, setYaos] = useState<Yao[]>([]);
  const [currentCoins, setCurrentCoins] = useState<boolean[]>([false, false, false]);
  const [animating, setAnimating] = useState(false);
  const [question, setQuestion] = useState('');
  const [started, setStarted] = useState(false);

  const round = yaos.length;
  const isComplete = round >= 6;

  const handleStart = () => {
    dispatch({ type: 'SET_QUESTION', payload: question.trim() });
    dispatch({ type: 'SET_STAGE', payload: 'casting' });
    setStarted(true);
  };

  const handleCast = useCallback(() => {
    if (animating || isComplete) return;
    setAnimating(true);
    playSound('shuffle');

    setTimeout(() => {
      const value = castCoin();
      const yao = yaoFromValue(value);
      const coins = getCoinResults(value);
      setCurrentCoins(coins);
      setAnimating(false);
      playSound('flip');

      const newYaos = [...yaos, yao];
      setYaos(newYaos);

      if (newYaos.length === 6) {
        setTimeout(() => {
          const result = computeHexagram(newYaos);
          dispatch({ type: 'SET_HEXAGRAM', payload: newYaos.map(y => y.value) });
          dispatch({ type: 'SET_STAGE', payload: 'result' });
        }, 1000);
      }
    }, 1000);
  }, [animating, isComplete, yaos, dispatch]);

  if (!started) {
    return (
      <div className="stage casting-stage">
        <p className="prompt">{copy?.shufflePrompt}</p>
        <div className="question-input-wrapper">
          <input
            type="text"
            className="question-input"
            placeholder={state.lang === 'zh' ? '心中所问之事...' : 'What is your question...'}
            value={question}
            onChange={e => setQuestion(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') handleStart(); }}
            maxLength={100}
          />
        </div>
        <button className="action-btn" onClick={handleStart}>
          ✦ {copy?.revealButton || '起卦'} ✦
        </button>
      </div>
    );
  }

  return (
    <div className="stage casting-stage">
      <p className="prompt">
        {state.lang === 'zh'
          ? `第 ${round + 1} 爻（共六爻）`
          : `Line ${round + 1} of 6`
        }
      </p>

      <div className="casting-display">
        <CoinToss results={currentCoins} animating={animating} />

        <div className="yao-stack">
          {yaos.map((yao, i) => (
            <div
              key={i}
              className={`yao-line ${yao.isChanging ? 'changing' : ''}`}
              title={state.lang === 'zh' ? YAO_NAMES_ZH[i] : YAO_NAMES_EN[i]}
            >
              {yao.isYang ? (
                <div className="yao-yang" />
              ) : (
                <div className="yao-yin">
                  <div className="yao-yin-half" />
                  <div className="yao-yin-gap" />
                  <div className="yao-yin-half" />
                </div>
              )}
              {yao.isChanging && <span className="yao-change-mark">○</span>}
            </div>
          ))}
        </div>
      </div>

      {!isComplete && (
        <button
          className="action-btn"
          onClick={handleCast}
          disabled={animating}
        >
          {animating
            ? '✦ ✦ ✦'
            : `✦ ${state.lang === 'zh' ? '掷卦' : 'Cast'} ✦`
          }
        </button>
      )}
    </div>
  );
}
