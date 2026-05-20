import { useNavigate } from 'react-router-dom';
import { useDivinationContext } from '../store/DivinationContext';
import { getThemeAssetPath } from '../core/ThemeLoader';
import { buildSingleCardReport } from '../core/TarotReadingEngine';

interface Props {
  onCopy: () => void;
  onSave: () => void;
}

export function ResultSingleCard({ onCopy, onSave }: Props) {
  const navigate = useNavigate();
  const { state, dispatch } = useDivinationContext();
  const drawn = state.drawnCards[0];
  if (!drawn) return null;

  const imgPath = getThemeAssetPath(state.themeId, drawn.card.image);
  const report = buildSingleCardReport({ drawn, question: state.question });

  // Build interpretation text
  const copy = state.copy?.lang[state.lang];
  let interpText = '';
  if (copy) {
    const kw = drawn.reversed ? drawn.card.keywordsReversed : drawn.card.keywords;
    const template = drawn.reversed ? copy.interpretation.reversed : copy.interpretation.upright;
    interpText = template
      .replace('{name}', state.lang === 'zh' ? drawn.card.nameZh : drawn.card.name)
      .replace('{position}', drawn.position)
      .replace('{keyword1}', kw[0] || '')
      .replace('{keyword2}', kw[1] || '')
      .replace('{keyword3}', kw[2] || '');
  }

  const handleReshuffle = () => {
    dispatch({ type: 'RESET' });
    navigate('/');
  };

  const question = state.question || (state.lang === 'zh' ? '无特定问题' : 'No specific question');

  return (
    <div className="single-result">
      {/* Left ribbon */}
      <div className="ribbon-left">
        <div className="ribbon-label">{state.lang === 'zh' ? '问题' : 'QUERY'}</div>
        <div className="ribbon-scroll">
          <div className="ribbon-question">{question}</div>
        </div>
      </div>

      {/* Center hero card */}
      <div className="hero-card-section">
        <div className="hero-card-frame">
          <img
            src={imgPath}
            alt={drawn.card.nameZh}
            className={`hero-card-img${drawn.reversed ? ' reversed' : ''}`}
          />
        </div>

        <div className="hero-card-info">
          <div className="hero-card-name-zh">{drawn.card.nameZh}</div>
          <div className="hero-card-name-en">{drawn.card.name.toUpperCase()}</div>
          <div className="hero-card-orientation">
            {drawn.reversed
              ? (state.lang === 'zh' ? '逆位' : 'Reversed')
              : (state.lang === 'zh' ? '正位' : 'Upright')}
          </div>
        </div>

        <div className="hero-card-interpretation">
          {report.sections.essence || interpText}
        </div>
      </div>

      {/* Right jewel actions */}
      <div className="jewel-actions">
        <button className="jewel-btn" onClick={handleReshuffle}>
          <span className="jewel-btn-icon">⟳</span>
          {state.lang === 'zh' ? '重新洗牌' : 'Reshuffle'}
        </button>
        <button className="jewel-btn" onClick={onCopy}>
          <span className="jewel-btn-icon">⧉</span>
          {state.lang === 'zh' ? '复制结果' : 'Copy Result'}
        </button>
        <button className="jewel-btn" onClick={onSave}>
          <span className="jewel-btn-icon">✦</span>
          {state.lang === 'zh' ? '保存到日记' : 'Save to Diary'}
        </button>
      </div>
    </div>
  );
}
