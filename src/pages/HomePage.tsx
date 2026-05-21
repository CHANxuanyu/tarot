import { useNavigate } from 'react-router-dom';
import { useDivinationContext } from '../store/DivinationContext';
import { MoonPhasePanel } from '../components/MoonPhasePanel';
import { TodayGuidance } from '../components/TodayGuidance';
import type { SpreadId } from '../core/types';
import { useI18n } from '../i18n/I18nContext';
import type { TranslationKey } from '../i18n';

const SPREAD_OPTIONS: Array<{
  id: SpreadId;
  icon: string;
  nameKey: TranslationKey;
  descKey: TranslationKey;
}> = [
  { id: 'single-card', icon: '✦', nameKey: 'spread.single.name', descKey: 'spread.single.desc' },
  { id: 'three-card',  icon: '⟁', nameKey: 'spread.three.name', descKey: 'spread.three.desc' },
  { id: 'celtic-cross',icon: '✙', nameKey: 'spread.celtic.name', descKey: 'spread.celtic.desc' },
];

export function HomePage() {
  const navigate = useNavigate();
  const { state, dispatch } = useDivinationContext();
  const { t } = useI18n();

  const handleSelectSpread = (spreadId: SpreadId) => {
    const question = state.question.trim();
    dispatch({ type: 'RESET' });
    dispatch({ type: 'SET_SPREAD', payload: spreadId });
    dispatch({ type: 'SET_QUESTION', payload: question });
    navigate('/reading');
  };

  const handleQuestionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'SET_QUESTION', payload: e.target.value });
  };

  if (state.stage === 'loading') {
    return (
      <div className="loading">
        <div className="loading-symbol">✦</div>
        <div className="loading-text">{t('loading.mystic')}</div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="home-layout">
        <aside className="side-panel">
          <MoonPhasePanel />
        </aside>

        <main className="home-main">
          <div className="home-title-zh">{t('home.titleZh')}</div>
          <div className="home-title-en">{t('home.titleEn')}</div>

          <div className="home-arch-container">
            <img
              src="/assets/images/hero-arch.jpg"
              alt={t('home.heroAlt')}
              className="home-arch-img"
            />
          </div>

          <div className="section-divider">
            <span>{t('home.chooseSpread')}</span>
          </div>

          <div className="spread-options">
            {SPREAD_OPTIONS.map(opt => (
              <button
                key={opt.id}
                className="spread-btn"
                onClick={() => handleSelectSpread(opt.id)}
              >
                <div className="spread-btn-icon">{opt.icon}</div>
                <div className="spread-btn-text">
                  <span className="spread-btn-name-zh">{t(opt.nameKey)}</span>
                  <span className="spread-btn-desc">{t(opt.descKey)}</span>
                </div>
              </button>
            ))}
          </div>

          <div className="home-question-wrapper">
            <div className="home-question-label">{t('home.questionLabel')}</div>
            <input
              className="home-question-input"
              placeholder={t('home.questionPlaceholder')}
              value={state.question}
              onChange={handleQuestionChange}
              maxLength={60}
            />
          </div>
        </main>

        <aside className="side-panel right">
          <TodayGuidance />
        </aside>

        <section className="mobile-home-panels">
          <div className="mobile-section">
            <TodayGuidance />
          </div>
          <div className="mobile-section">
            <MoonPhasePanel />
          </div>
        </section>
      </div>
    </div>
  );
}
