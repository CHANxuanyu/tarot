import { useNavigate } from 'react-router-dom';
import { useDivinationContext } from '../store/DivinationContext';
import { getThemeAssetPath } from '../core/ThemeLoader';
import { buildSingleCardReport } from '../core/TarotReadingEngine';
import { useI18n } from '../i18n/I18nContext';

interface Props {
  onCopy: () => void;
  onSave: () => void;
}

export function ResultSingleCard({ onCopy, onSave }: Props) {
  const navigate = useNavigate();
  const { state, dispatch } = useDivinationContext();
  const { locale, t } = useI18n();
  const drawn = state.drawnCards[0];
  if (!drawn) return null;

  const imgPath = getThemeAssetPath(state.themeId, drawn.card.image);
  const report = buildSingleCardReport({ drawn, question: state.question, locale });

  const handleReshuffle = () => {
    dispatch({ type: 'RESET' });
    navigate('/');
  };

  const questionText = state.question
    ? state.question
    : t('question.none');

  return (
    <div className="single-result-layout">
      <div className="single-result-card-col">
        <div className="report-question-box">
          <div className="report-question-label">{t('question.labelUpper')}</div>
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
          <h2 className="identity-title">{report.card.nameZh}</h2>
          <div className="identity-subtitle">{report.card.nameEn.toUpperCase()}</div>
          <div className={`orientation-badge ${report.orientation}`}>
            {report.orientation === 'upright' 
              ? t('orientation.upright')
              : t('orientation.reversed')}
          </div>

          <div className="identity-attributes">
            <div className="attr-row">
              <span className="attr-label">{t('attr.archetype')}:</span>
              <span className="attr-value">{report.identity.archetype}</span>
            </div>
            <div className="attr-row">
              <span className="attr-label">{t('attr.element')}:</span>
              <span className="attr-value">{report.identity.element}</span>
            </div>
            <div className="attr-row">
              <span className="attr-label">{t('attr.astrology')}:</span>
              <span className="attr-value">{report.identity.astrology}</span>
            </div>
            {report.identity.mythicAssociation.length > 0 && (
              <div className="attr-row">
                <span className="attr-label">{t('attr.myth')}:</span>
                <span className="attr-value">{report.identity.mythicAssociation.join(' · ')}</span>
              </div>
            )}
          </div>

          <div className="identity-symbols">
            <div className="attr-label">{t('attr.symbols')}:</div>
            <div className="symbol-tags">
              {report.symbols.map(s => <span key={s} className="symbol-tag">{s}</span>)}
            </div>
          </div>
        </div>
      </div>

      <div className="single-result-report-col">
        <div className="report-header">
          <h1 className="report-main-title">{t('single.title')}</h1>
        </div>

        <div className="report-section">
          <h3 className="section-title">{t('section.keywords')}</h3>
          <div className="keyword-chips">
            {report.keywords.map(kw => <span key={kw} className="keyword-chip">{kw}</span>)}
          </div>
        </div>

        <div className="report-section">
          <h3 className="section-title">{t('section.essence')}</h3>
          <p className="section-content">{report.sections.essence}</p>
        </div>

        <div className="report-section highlight">
          <h3 className="section-title">{t('section.questionResponse')}</h3>
          <p className="section-content">{report.sections.questionResponse}</p>
        </div>

        <div className="report-section">
          <h3 className="section-title">{t('section.hiddenReminder')}</h3>
          <p className="section-content">{report.sections.hiddenReminder}</p>
        </div>

        <div className="report-section">
          <h3 className="section-title">{t('section.actionAdvice')}</h3>
          <p className="section-content">{report.sections.actionAdvice}</p>
        </div>

        <div className="report-quote">
          <div className="quote-icon">“</div>
          <div className="quote-text">{report.sections.quote}</div>
        </div>

        <div className="report-actions">
          <button className="action-btn" onClick={handleReshuffle}>
            {t('button.reshuffle')}
          </button>
          <button className="action-btn" onClick={onCopy}>
            {t('button.copyFull')}
          </button>
          <button className="action-btn primary" onClick={onSave}>
            {t('button.saveJournal')}
          </button>
        </div>
      </div>
    </div>
  );
}
