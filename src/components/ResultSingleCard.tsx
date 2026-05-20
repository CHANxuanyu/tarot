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

  const handleReshuffle = () => {
    dispatch({ type: 'RESET' });
    navigate('/');
  };

  const isZh = state.lang === 'zh';
  const questionText = state.question
    ? state.question
    : (isZh ? '无特定问题，本次解读将以通用能量为主。' : 'No specific question, general energy reading.');

  return (
    <div className="single-result-layout">
      <div className="single-result-card-col">
        <div className="report-question-box">
          <div className="report-question-label">{isZh ? '你的问题' : 'YOUR QUERY'}</div>
          <div className="report-question-text">{questionText}</div>
        </div>

        <div className="report-hero-frame">
          <img
            src={imgPath}
            alt={report.card.nameZh}
            className={`report-hero-img${drawn.reversed ? ' reversed' : ''}`}
          />
        </div>

        <div className="card-identity-box">
          <h2 className="identity-title">{isZh ? report.card.nameZh : report.card.nameEn}</h2>
          <div className="identity-subtitle">{report.card.nameEn.toUpperCase()}</div>
          <div className={`orientation-badge ${report.orientation}`}>
            {report.orientation === 'upright' 
              ? (isZh ? '正位' : 'Upright') 
              : (isZh ? '逆位' : 'Reversed')}
          </div>

          <div className="identity-attributes">
            <div className="attr-row">
              <span className="attr-label">{isZh ? '原型' : 'Archetype'}:</span>
              <span className="attr-value">{report.identity.archetype}</span>
            </div>
            <div className="attr-row">
              <span className="attr-label">{isZh ? '元素' : 'Element'}:</span>
              <span className="attr-value">{report.identity.element}</span>
            </div>
            <div className="attr-row">
              <span className="attr-label">{isZh ? '星象' : 'Astrology'}:</span>
              <span className="attr-value">{report.identity.astrology}</span>
            </div>
            {report.identity.mythicAssociation.length > 0 && (
              <div className="attr-row">
                <span className="attr-label">{isZh ? '神话' : 'Myth'}:</span>
                <span className="attr-value">{report.identity.mythicAssociation.join(' · ')}</span>
              </div>
            )}
          </div>

          <div className="identity-symbols">
            <div className="attr-label">{isZh ? '牌面象征' : 'Symbols'}:</div>
            <div className="symbol-tags">
              {report.symbols.map(s => <span key={s} className="symbol-tag">{s}</span>)}
            </div>
          </div>
        </div>
      </div>

      <div className="single-result-report-col">
        <div className="report-header">
          <h1 className="report-main-title">{isZh ? '牌义解读报告' : 'Reading Report'}</h1>
        </div>

        <div className="report-section">
          <h3 className="section-title">{isZh ? '核心关键词' : 'Keywords'}</h3>
          <div className="keyword-chips">
            {report.keywords.map(kw => <span key={kw} className="keyword-chip">{kw}</span>)}
          </div>
        </div>

        <div className="report-section">
          <h3 className="section-title">{isZh ? '牌意精解' : 'Essence'}</h3>
          <p className="section-content">{report.sections.essence}</p>
        </div>

        <div className="report-section highlight">
          <h3 className="section-title">{isZh ? '对你问题的回应' : 'Response'}</h3>
          <p className="section-content">{report.sections.questionResponse}</p>
        </div>

        <div className="report-section">
          <h3 className="section-title">{isZh ? '隐藏提醒' : 'Hidden Reminder'}</h3>
          <p className="section-content">{report.sections.hiddenReminder}</p>
        </div>

        <div className="report-section">
          <h3 className="section-title">{isZh ? '行动建议' : 'Action Advice'}</h3>
          <p className="section-content">{report.sections.actionAdvice}</p>
        </div>

        <div className="report-quote">
          <div className="quote-icon">“</div>
          <div className="quote-text">{report.sections.quote}</div>
        </div>

        <div className="report-actions">
          <button className="action-btn" onClick={handleReshuffle}>
            {isZh ? '重新抽牌' : 'Reshuffle'}
          </button>
          <button className="action-btn" onClick={onCopy}>
            {isZh ? '复制全文' : 'Copy'}
          </button>
          <button className="action-btn primary" onClick={onSave}>
            {isZh ? '保存日记' : 'Save'}
          </button>
        </div>
      </div>
    </div>
  );
}
