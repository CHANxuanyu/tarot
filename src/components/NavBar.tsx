import { NavLink } from 'react-router-dom';
import { LOCALE_LABELS, type Locale, type TranslationKey } from '../i18n';
import { useI18n } from '../i18n/I18nContext';

const NAV_ITEMS: Array<{ to: string; labelKey: TranslationKey; end?: boolean }> = [
  { to: '/', labelKey: 'nav.home', end: true },
  { to: '/reading', labelKey: 'nav.reading' },
  { to: '/learn', labelKey: 'nav.learn' },
  { to: '/calendar', labelKey: 'nav.calendar' },
  { to: '/about', labelKey: 'nav.about' },
];

const LOCALES: Locale[] = ['zh-CN', 'en-US', 'fr-FR', 'es-ES'];

export function NavBar() {
  const { locale, setLocale, t } = useI18n();

  return (
    <nav className="nav">
      <div className="nav-main-row">
        <NavLink to="/" className="nav-logo">
          <span className="nav-logo-zh">{t('app.logoZh')}</span>
          <span className="nav-logo-sep">✦</span>
          <span style={{ fontFamily: 'Cinzel, serif', fontSize: '0.7rem', letterSpacing: '0.3em', opacity: 0.7 }}>{t('app.logoEn')}</span>
        </NavLink>

        <ul className="nav-items">
          {NAV_ITEMS.map(item => (
            <li key={item.to} className="nav-item">
              <NavLink
                to={item.to}
                end={item.end}
                className={({ isActive }) => isActive ? 'active' : ''}
              >
                {t(item.labelKey)}
              </NavLink>
            </li>
          ))}
        </ul>

        <label className="nav-language" title={t('nav.language')}>
          <span>🌐</span>
          <select className="language-select" value={locale} onChange={event => setLocale(event.target.value as Locale)}>
            {LOCALES.map(item => (
              <option key={item} value={item}>{LOCALE_LABELS[item]}</option>
            ))}
          </select>
        </label>
      </div>

      <div className="mobile-nav" aria-label={t('nav.language')}>
        {NAV_ITEMS.map(item => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) => isActive ? 'mobile-nav-chip active' : 'mobile-nav-chip'}
          >
            {t(item.labelKey)}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}