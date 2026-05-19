import { useEffect } from 'react';
import { DivinationProvider, useDivinationContext } from './store/DivinationContext';
import { loadTheme, applyThemeCSS } from './core/ThemeLoader';
import { setMuted } from './core/AudioManager';
import { ErrorBoundary } from './components/ErrorBoundary';
import { ModeSelector } from './components/ModeSelector';
import { StarField } from './components/StarField';
import { ShuffleStage } from './components/ShuffleStage';
import { SpreadStage } from './components/SpreadStage';
import { ResultStage } from './components/ResultStage';
import { CastingStage } from './components/CastingStage';
import { HexagramResult } from './components/HexagramResult';
import { HistoryDrawer } from './components/HistoryDrawer';

function LoadingSplash() {
  return (
    <div className="loading" role="status" aria-label="Loading">
      <div className="loading-inner">
        <div className="loading-symbol">✦</div>
        <p className="loading-text">Loading...</p>
      </div>
    </div>
  );
}

function AppInner() {
  const { state, dispatch } = useDivinationContext();

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
    return <LoadingSplash />;
  }

  return (
    <div className={`app ${state.darkMode ? 'dark' : 'light'}`} role="main">
      {state.darkMode && <StarField />}
      <header className="app-header">
        <h1 className="app-title">
          {state.copy?.lang[state.lang].appTitle}
        </h1>
        <p className="app-subtitle">
          {state.copy?.lang[state.lang].subtitle}
        </p>
        <div className="controls" role="toolbar" aria-label="Settings">
          <ModeSelector />
          <button
            className="control-btn"
            onClick={() => dispatch({ type: 'SET_LANG', payload: state.lang === 'en' ? 'zh' : 'en' })}
            aria-label={state.lang === 'en' ? 'Switch to Chinese' : 'Switch to English'}
          >
            {state.lang === 'en' ? '中文' : 'EN'}
          </button>
          <button
            className="control-btn"
            onClick={() => dispatch({ type: 'TOGGLE_SOUND' })}
            aria-label={state.soundEnabled ? 'Mute sound' : 'Enable sound'}
          >
            {state.soundEnabled ? '♪' : '✕'}
          </button>
          <button
            className="control-btn"
            onClick={() => dispatch({ type: 'TOGGLE_DARK_MODE' })}
            aria-label={state.darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {state.darkMode ? '☀' : '☽'}
          </button>
        </div>
      </header>

      <main className="app-main">
        {state.mode === 'tarot' && (
          <>
            {(state.stage === 'idle' || state.stage === 'shuffling') && <ShuffleStage />}
            {state.stage === 'selecting' && <SpreadStage />}
            {state.stage === 'result' && <ResultStage />}
          </>
        )}
        {state.mode === 'iching' && (
          <>
            {(state.stage === 'idle' || state.stage === 'casting') && <CastingStage />}
            {state.stage === 'result' && <HexagramResult />}
          </>
        )}
      </main>

      <HistoryDrawer />
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <DivinationProvider>
        <AppInner />
      </DivinationProvider>
    </ErrorBoundary>
  );
}
