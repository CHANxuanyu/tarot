import { useNavigate } from 'react-router-dom';
import { useDivinationContext } from '../store/DivinationContext';
import { getThemeAssetPath } from '../core/ThemeLoader';
import { buildThreeCardReport } from '../core/TarotReadingEngine';
import { useI18n } from '../i18n/I18nContext';

interface Props {
  onCopy: () => void;
  onSave: () => void;
}

export function ResultThreeCard({ onCopy, onSave }: Props) {
  const navigate = useNavigate();
  const { state, dispatch } = useDivinationContext();
  const { locale, t } = useI18n();

  if (state.drawnCards.length < 3) return null;

  const report = buildThreeCardReport({
    drawnCards: state.drawnCards,
    question: state.question,
    locale,
  });
  
  const questionText = state.question || t('question.none');

  const handleReshuffle = () => {
    dispatch({ type: 'RESET' });
    navigate('/');
  };

  return (
    <div className="three-result-layout">
      <div className="three-report-header-section">
        <h1 className="three-report-main-title">{t('three.title')}</h1>
        <div className="three-report-question-box">
          <div className="three-report-question-label">{t('question.labelUpper')}</div>
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
                    ? t('orientation.reversed')
                    : t('orientation.upright')}
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
        <h3 className="three-section-title">{t('section.storyline')}</h3>
        <p className="three-section-content">{report.storyline}</p>
      </div>

      <div className="three-advice-grid">
        <div className="three-report-section">
          <h3 className="three-section-title">{t('section.hiddenReminder')}</h3>
          <p className="three-section-content">{report.hiddenReminder}</p>
        </div>
        
        <div className="three-report-section">
          <h3 className="three-section-title">{t('section.actionAdvice')}</h3>
          <p className="three-section-content">{report.actionAdvice}</p>
        </div>
      </div>

      <div className="three-report-quote">
        <div className="three-quote-icon">“</div>
        <div className="three-quote-text">{report.quote}</div>
      </div>

      <div className="three-report-actions">
        <button className="three-action-btn" onClick={handleReshuffle}>
          {t('button.reshuffle')}
        </button>
        <button className="three-action-btn primary" onClick={onCopy}>
          {t('button.copyFull')}
        </button>
        <button className="three-action-btn" onClick={onSave}>
          {t('button.saveReading')}
        </button>
      </div>
    </div>
  );
}
