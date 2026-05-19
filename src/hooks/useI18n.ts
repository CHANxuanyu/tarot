import { useDivinationContext } from '../store/DivinationContext';
import type { CopyLang } from '../core/types';

export function useI18n() {
  const { state } = useDivinationContext();
  const { copy, lang } = state;

  const t = (copy?.lang[lang] || {}) as CopyLang;
  const setLang = () => {}; // placeholder, dispatch handled in component

  return { t, lang, setLang };
}
