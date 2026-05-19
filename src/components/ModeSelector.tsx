import { useDivinationContext, type DivinationMode } from '../store/DivinationContext';

const MODES: { id: DivinationMode; label: string; labelZh: string }[] = [
  { id: 'tarot', label: 'Tarot', labelZh: '塔罗' },
  { id: 'iching', label: 'I Ching', labelZh: '六爻' },
];

export function ModeSelector() {
  const { state, dispatch } = useDivinationContext();

  return (
    <div className="mode-selector" role="radiogroup" aria-label="Divination mode">
      {MODES.map(m => (
        <button
          key={m.id}
          className={`mode-option ${state.mode === m.id ? 'active' : ''}`}
          onClick={() => dispatch({ type: 'SET_MODE', payload: m.id })}
          role="radio"
          aria-checked={state.mode === m.id}
        >
          {state.lang === 'zh' ? m.labelZh : m.label}
        </button>
      ))}
    </div>
  );
}
