import { zhCN } from './locales/zh-CN';
import { enUS } from './locales/en-US';
import { frFR } from './locales/fr-FR';
import { esES } from './locales/es-ES';

export type Locale = 'zh-CN' | 'en-US' | 'fr-FR' | 'es-ES';

export type TranslationKey = keyof typeof zhCN;

export const DEFAULT_LOCALE: Locale = 'zh-CN';

export const LOCALE_LABELS: Record<Locale, string> = {
  'zh-CN': '中文',
  'en-US': 'English',
  'fr-FR': 'Français',
  'es-ES': 'Español',
};

export const translations: Record<Locale, Partial<Record<TranslationKey, string>>> = {
  'zh-CN': zhCN,
  'en-US': enUS,
  'fr-FR': frFR,
  'es-ES': esES,
};

export function isLocale(value: string | null): value is Locale {
  return value === 'zh-CN' || value === 'en-US' || value === 'fr-FR' || value === 'es-ES';
}

export function translate(locale: Locale, key: TranslationKey): string {
  if (locale === 'zh-CN') {
    return zhCN[key] ?? key;
  }

  return translations[locale]?.[key] ?? enUS[key] ?? key;
}