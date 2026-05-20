import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { DivinationProvider, useDivinationContext } from './store/DivinationContext';
import { I18nProvider, useI18n } from './i18n/I18nContext';
import { loadTheme, applyThemeCSS } from './core/ThemeLoader';
import { setMuted } from './core/AudioManager';
import { ErrorBoundary } from './components/ErrorBoundary';
import { StarField } from './components/StarField';
import { NavBar } from './components/NavBar';
import { HistoryDrawer } from './components/HistoryDrawer';
import { ShuffleStage } from './components/ShuffleStage';
import { SpreadStage } from './components/SpreadStage';
import { ResultStage } from './components/ResultStage';
import { HomePage } from './pages/HomePage';
import { LearningHallPage } from './pages/LearningHallPage';
import { ZodiacCalendarPage } from './pages/ZodiacCalendarPage';
import { AboutPage } from './pages/AboutPage';
import './styles.css';

function ReadingPage() {
  const { state } = useDivinationContext();
  const { t } = useI18n();

  if (state.stage === 'loading') {
    return (
      <div className="loading">
        <div className="loading-symbol">✦</div>
        <div className="loading-text">{t('loading.default')}</div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="reading-page">
        {(state.stage === 'idle' || state.stage === 'shuffling') && <ShuffleStage />}
        {state.stage === 'selecting' && <SpreadStage />}
        {state.stage === 'result' && <ResultStage />}
      </div>
    </div>
  );
}

function AppInner() {
  const { state, dispatch } = useDivinationContext();
  const { t } = useI18n();

  useEffect(() => {
    loadTheme(state.themeId).then(data => {
      applyThemeCSS(data.theme);
      dispatch({ type: 'SET_THEME_DATA', payload: data });
    });
  }, [state.themeId]);

  useEffect(() => {
    setMuted(!state.soundEnabled);
  }, [state.soundEnabled]);

  if (state.stage === 'loading') {
    return (
      <div className="loading">
        <div className="loading-symbol">✦</div>
        <div className="loading-text">{t('loading.mystic')}</div>
      </div>
    );
  }

  return (
    <>
      <StarField />
      <NavBar />
      <Routes>
        <Route path="/"         element={<HomePage />} />
        <Route path="/reading"  element={<ReadingPage />} />
        <Route path="/learn"    element={<LearningHallPage />} />
        <Route path="/calendar" element={<ZodiacCalendarPage />} />
        <Route path="/about"    element={<AboutPage />} />
        <Route path="*"         element={<HomePage />} />
      </Routes>
      <HistoryDrawer />
    </>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <I18nProvider>
        <DivinationProvider>
          <BrowserRouter>
            <AppInner />
          </BrowserRouter>
        </DivinationProvider>
      </I18nProvider>
    </ErrorBoundary>
  );
}
