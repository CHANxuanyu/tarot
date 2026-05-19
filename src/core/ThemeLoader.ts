import type { ThemeConfig, CardsConfig, CopyConfig, SpreadsConfig } from './types';

const THEME_BASE = '/themes';

export async function loadTheme(themeId: string): Promise<{
  theme: ThemeConfig;
  cards: CardsConfig;
  copy: CopyConfig;
  spreads: SpreadsConfig;
}> {
  const base = `${THEME_BASE}/${themeId}`;

  const [theme, cards, copy, spreads] = await Promise.all([
    fetch(`${base}/theme.json`).then(r => r.json()),
    fetch(`${base}/cards.json`).then(r => r.json()),
    fetch(`${base}/copy.json`).then(r => r.json()),
    fetch(`${base}/spreads.json`).then(r => r.json()),
  ]);

  return { theme, cards, copy, spreads };
}

export function applyThemeCSS(theme: ThemeConfig) {
  const root = document.documentElement;
  const { colors, fonts } = theme;

  root.style.setProperty('--color-bg', colors.bg);
  root.style.setProperty('--color-bg-secondary', colors.bgSecondary);
  root.style.setProperty('--color-gold', colors.gold);
  root.style.setProperty('--color-gold-light', colors.goldLight);
  root.style.setProperty('--color-parchment', colors.parchment);
  root.style.setProperty('--color-purple', colors.purple);
  root.style.setProperty('--color-purple-light', colors.purpleLight);
  root.style.setProperty('--color-text', colors.text);
  root.style.setProperty('--color-text-muted', colors.textMuted);
  root.style.setProperty('--color-card-back', colors.cardBack);
  root.style.setProperty('--color-card-border', colors.cardBorder);
  root.style.setProperty('--color-shadow', colors.shadow);
  root.style.setProperty('--font-display', fonts.display);
  root.style.setProperty('--font-body', fonts.body);
}

export function getThemeAssetPath(themeId: string, relativePath: string): string {
  return `${THEME_BASE}/${themeId}/${relativePath}`;
}
