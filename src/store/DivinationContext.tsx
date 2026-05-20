import { createContext, useContext, useReducer, type ReactNode } from 'react';
import type { ThemeConfig, CardsConfig, CopyConfig, SpreadsConfig, DrawnCard, SpreadId } from '../core/types';

type Stage = 'loading' | 'idle' | 'shuffling' | 'selecting' | 'revealing' | 'result';

interface State {
  stage: Stage;
  themeId: string;
  theme: ThemeConfig | null;
  cards: CardsConfig | null;
  copy: CopyConfig | null;
  spreads: SpreadsConfig | null;
  drawnCards: DrawnCard[];
  question: string;
  spreadId: SpreadId;
  darkMode: boolean;
  soundEnabled: boolean;
}

type Action =
  | { type: 'SET_THEME_DATA'; payload: { theme: ThemeConfig; cards: CardsConfig; copy: CopyConfig; spreads: SpreadsConfig } }
  | { type: 'SET_THEME_ID'; payload: string }
  | { type: 'SET_STAGE'; payload: Stage }
  | { type: 'SET_DRAWN_CARDS'; payload: DrawnCard[] }
  | { type: 'SET_QUESTION'; payload: string }
  | { type: 'SET_SPREAD'; payload: SpreadId }
  | { type: 'TOGGLE_DARK_MODE' }
  | { type: 'TOGGLE_SOUND' }
  | { type: 'RESET' };

const initialState: State = {
  stage: 'loading',
  themeId: 'classic-mystic',
  theme: null,
  cards: null,
  copy: null,
  spreads: null,
  drawnCards: [],
  question: '',
  spreadId: 'single-card',
  darkMode: true,
  soundEnabled: true,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_THEME_DATA':
      return { ...state, ...action.payload, stage: 'idle' };
    case 'SET_THEME_ID':
      return { ...state, themeId: action.payload, stage: 'loading', drawnCards: [] };
    case 'SET_STAGE':
      return { ...state, stage: action.payload };
    case 'SET_DRAWN_CARDS':
      return { ...state, drawnCards: action.payload };
    case 'SET_QUESTION':
      return { ...state, question: action.payload };
    case 'SET_SPREAD':
      return { ...state, spreadId: action.payload };
    case 'TOGGLE_DARK_MODE':
      return { ...state, darkMode: !state.darkMode };
    case 'TOGGLE_SOUND':
      return { ...state, soundEnabled: !state.soundEnabled };
    case 'RESET':
      return { ...state, stage: 'idle', drawnCards: [], question: '' };
    default:
      return state;
  }
}

const DivinationContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
} | null>(null);

export function DivinationProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <DivinationContext.Provider value={{ state, dispatch }}>
      {children}
    </DivinationContext.Provider>
  );
}

export function useDivinationContext() {
  const ctx = useContext(DivinationContext);
  if (!ctx) throw new Error('useDivinationContext must be used within DivinationProvider');
  return ctx;
}
