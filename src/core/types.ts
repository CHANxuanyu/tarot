export type SpreadId = 'single-card' | 'three-card' | 'celtic-cross';

export interface ThemeColors {
  bg: string;
  bgSecondary: string;
  gold: string;
  goldLight: string;
  parchment: string;
  purple: string;
  purpleLight: string;
  text: string;
  textMuted: string;
  cardBack: string;
  cardBorder: string;
  shadow: string;
}

export interface ThemeConfig {
  id: string;
  name: string;
  colors: ThemeColors;
  fonts: { display: string; body: string };
  cardBack: string;
}

export interface CardData {
  id: number;
  name: string;
  nameZh: string;
  keywords: string[];
  keywordsReversed: string[];
  image: string;
}

export interface CardsConfig {
  deck: string;
  cards: CardData[];
}

export interface SpreadPosition {
  label: string;
  labelZh: string;
  x: number;
  y: number;
}

export interface SpreadConfig {
  id: string;
  name: string;
  nameZh: string;
  positions: number;
  layout: SpreadPosition[];
}

export interface SpreadsConfig {
  spreads: SpreadConfig[];
}

export interface CopyLang {
  appTitle: string;
  subtitle: string;
  shufflePrompt: string;
  selectPrompt: string;
  positions: string[];
  revealButton: string;
  readAgain: string;
  interpretation: { upright: string; reversed: string };
  history: string;
  noHistory: string;
  share: string;
  darkMode: string;
  sound: string;
}

export interface CopyConfig {
  lang: { en: CopyLang; zh: CopyLang };
}

export interface DrawnCard {
  card: CardData;
  reversed: boolean;
  position: string;
}
