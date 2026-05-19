import { useDivinationContext } from '../store/DivinationContext';
import { getThemeAssetPath } from '../core/ThemeLoader';

interface CardProps {
  faceUp: boolean;
  image?: string;
  reversed?: boolean;
  onClick?: () => void;
  label?: string;
}

export function Card({ faceUp, image, reversed, onClick, label }: CardProps) {
  const { state } = useDivinationContext();
  const backSrc = getThemeAssetPath(state.themeId, state.theme?.cardBack || 'assets/back.svg');

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.key === 'Enter' || e.key === ' ') && onClick) {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <div
      className="card-slot"
      onClick={onClick}
      onKeyDown={handleKeyDown}
      tabIndex={onClick ? 0 : -1}
      role={onClick ? 'button' : undefined}
      aria-label={label ? `${label} card${faceUp ? ' (revealed)' : ' (tap to reveal)'}` : 'Tarot card'}
    >
      {label && <div className="card-label">{label}</div>}
      <div className={`card-container ${faceUp ? 'flipped' : ''} ${reversed ? 'reversed' : ''}`}>
        <div className="card-inner">
          <div className="card-face card-back">
            <img src={backSrc} alt="" draggable={false} />
          </div>
          <div className="card-face card-front">
            {image ? (
              <img src={image} alt="tarot card" draggable={false} />
            ) : (
              <div className="card-placeholder">✦</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
