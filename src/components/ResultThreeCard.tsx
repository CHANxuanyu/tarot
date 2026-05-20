import { useNavigate } from 'react-router-dom';
import { useDivinationContext } from '../store/DivinationContext';
import { getThemeAssetPath } from '../core/ThemeLoader';
import { buildThreeCardReport } from '../core/TarotReadingEngine';

interface Props {
  onCopy: () => void;
  onSave: () => void;
}

export function ResultThreeCard({ onCopy, onSave }: Props) {
  const navigate = useNavigate();
  const { state, dispatch } = useDivinationContext();

  if (state.drawnCards.length < 3) return null;

  const report = buildThreeCardReport({
    drawnCards: state.drawnCards,
    question: state.question,
  });
  
  const isZh = state.lang === 'zh';
  const questionText = state.question || (isZh ? '无特定问题，本次解读将以通用能量为主。' : 'No specific question, reading will focus on general energy.');

  const handleReshuffle = () => {
    dispatch({ type: 'RESET' });
    navigate('/');
  };

  return (
    <div className="three-result-layout">
      <div className="three-report-header-section">
        <h1 className="three-report-main-title">{isZh ? '你的三牌阵解读报告' : 'Your Three-Card Reading Report'}</h1>
        <div className="three-report-question-box">
          <div className="three-report-question-label">{isZh ? '你的问题' : 'YOUR QUERY'}</div>
          <div className="three-report-question-text">{questionText}</div>
        </div>
      </div>

      <div className="three-timeline-section">
        <div className="timeline-connector"></div>
        {state.drawnCards.map((drawn, idx) => {
          const imgPath = getThemeAssetPath(state.themeId, drawn.card.image);
          const reportCard = report.cards[idx];
          return (
            <div key={idx} className="timeline-card-node">
              <div className="timeline-node-header">
                <span className="timeline-position-label">{reportCard.positionName}</span>
                <span className="timeline-position-dot"></span>
              </div>
              
              <div className={`timeline-card-wrap${drawn.reversed ? ' reversed' : ''}`}>
                <img src={imgPath} alt={reportCard.cardNameZh} />
              </div>
              
              <div className="timeline-card-details">
                <div className="timeline-card-identity">
                  <div className="timeline-card-name-zh">{reportCard.cardNameZh}</div>
                  <div className="timeline-card-name-en">{reportCard.cardNameEn}</div>
                </div>
                
                <div className={`three-orientation-badge ${reportCard.orientation}`}>
                  {reportCard.orientation === 'reversed'
                    ? (isZh ? '逆位' : 'Reversed')
                    : (isZh ? '正位' : 'Upright')}
                </div>
                
                <div className="timeline-card-keywords">
                  {reportCard.keywords.slice(0, 3).map(kw => (
                    <span key={kw} className="timeline-keyword-chip">{kw}</span>
                  ))}
                </div>
                
                <div className="timeline-card-reading">
                  {reportCard.roleReading}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="three-report-section three-report-section-highlight three-storyline-section">
        <h3 className="three-section-title">{isZh ? '综合牌路' : 'Storyline Synthesis'}</h3>
        <p className="three-section-content">{report.storyline}</p>
      </div>

      <div className="three-advice-grid">
        <div className="three-report-section">
          <h3 className="three-section-title">{isZh ? '隐藏提醒' : 'Hidden Reminder'}</h3>
          <p className="three-section-content">{report.hiddenReminder}</p>
        </div>
        
        <div className="three-report-section">
          <h3 className="three-section-title">{isZh ? '行动建议' : 'Action Advice'}</h3>
          <p className="three-section-content">{report.actionAdvice}</p>
        </div>
      </div>

      <div className="three-report-quote">
        <div className="three-quote-icon">“</div>
        <div className="three-quote-text">{report.quote}</div>
      </div>

      <div className="three-report-actions">
        <button className="three-action-btn" onClick={handleReshuffle}>
          {isZh ? '重新抽牌' : 'Reshuffle'}
        </button>
        <button className="three-action-btn primary" onClick={onCopy}>
          {isZh ? '复制全文' : 'Copy Full Report'}
        </button>
        <button className="three-action-btn" onClick={onSave}>
          {isZh ? '保存解读' : 'Save Reading'}
        </button>
      </div>
    </div>
  );
}
