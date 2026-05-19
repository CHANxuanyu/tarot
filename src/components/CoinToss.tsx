import { useDivinationContext } from '../store/DivinationContext';
import { getThemeAssetPath } from '../core/ThemeLoader';

interface CoinTossProps {
  results: boolean[];
  animating: boolean;
}

export function CoinToss({ results, animating }: CoinTossProps) {
  const { state } = useDivinationContext();
  const frontSrc = getThemeAssetPath(state.themeId, 'assets/coin-front.svg');
  const backSrc = getThemeAssetPath(state.themeId, 'assets/coin-back.svg');

  return (
    <div className="coin-toss-group">
      {results.map((isHead, i) => (
        <div
          key={i}
          className={`coin ${animating ? 'coin-spinning' : 'coin-landed'}`}
          style={{ animationDelay: `${i * 0.15}s` }}
        >
          <div className="coin-inner">
            <div className="coin-face coin-front-face">
              <img src={frontSrc} alt="front" draggable={false} />
            </div>
            <div className="coin-face coin-back-face">
              <img src={backSrc} alt="back" draggable={false} />
            </div>
          </div>
          {!animating && (
            <span className="coin-label">{isHead ? '字' : '花'}</span>
          )}
        </div>
      ))}
    </div>
  );
}
