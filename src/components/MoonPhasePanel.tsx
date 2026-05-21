import { useI18n } from '../i18n/I18nContext';
import type { TranslationKey } from '../i18n';

const ZODIAC_COIN_SHEET = '/assets/images/zodiac/zodiac-baroque-coin-sheet.jpg';

const MOON_PHASES: Array<{ symbol: string; nameKey: TranslationKey }> = [
  { symbol: '🌑', nameKey: 'moon.phase.new' },
  { symbol: '🌒', nameKey: 'moon.phase.waxingCrescent' },
  { symbol: '🌓', nameKey: 'moon.phase.firstQuarter' },
  { symbol: '🌔', nameKey: 'moon.phase.waxingGibbous' },
  { symbol: '🌕', nameKey: 'moon.phase.full' },
  { symbol: '🌖', nameKey: 'moon.phase.waningGibbous' },
  { symbol: '🌗', nameKey: 'moon.phase.lastQuarter' },
  { symbol: '🌘', nameKey: 'moon.phase.waningCrescent' },
];

const ZODIAC_SIGNS: Array<{ nameKey: TranslationKey }> = [
  { nameKey: 'zodiac.aries' },
  { nameKey: 'zodiac.taurus' },
  { nameKey: 'zodiac.gemini' },
  { nameKey: 'zodiac.cancer' },
  { nameKey: 'zodiac.leo' },
  { nameKey: 'zodiac.virgo' },
  { nameKey: 'zodiac.libra' },
  { nameKey: 'zodiac.scorpio' },
  { nameKey: 'zodiac.sagittarius' },
  { nameKey: 'zodiac.capricorn' },
  { nameKey: 'zodiac.aquarius' },
  { nameKey: 'zodiac.pisces' },
];

const ZODIAC_SPRITE_POSITIONS = [
  '0% 0%',
  '33.333% 0%',
  '66.666% 0%',
  '100% 0%',
  '0% 50%',
  '33.333% 50%',
  '66.666% 50%',
  '100% 50%',
  '0% 100%',
  '33.333% 100%',
  '66.666% 100%',
  '100% 100%',
];

function getCurrentMoonPhase(): number {
  const knownNewMoon = new Date('2024-01-11');
  const now = new Date();
  const diff = (now.getTime() - knownNewMoon.getTime()) / (1000 * 60 * 60 * 24);
  const cycle = diff % 29.53;
  return Math.floor(cycle / (29.53 / 8));
}

function getCurrentZodiac(): number {
  const now = new Date();
  const m = now.getMonth() + 1;
  const d = now.getDate();
  if ((m === 3 && d >= 21) || (m === 4 && d <= 19)) return 0;
  if ((m === 4 && d >= 20) || (m === 5 && d <= 20)) return 1;
  if ((m === 5 && d >= 21) || (m === 6 && d <= 21)) return 2;
  if ((m === 6 && d >= 22) || (m === 7 && d <= 22)) return 3;
  if ((m === 7 && d >= 23) || (m === 8 && d <= 22)) return 4;
  if ((m === 8 && d >= 23) || (m === 9 && d <= 22)) return 5;
  if ((m === 9 && d >= 23) || (m === 10 && d <= 23)) return 6;
  if ((m === 10 && d >= 24) || (m === 11 && d <= 22)) return 7;
  if ((m === 11 && d >= 23) || (m === 12 && d <= 21)) return 8;
  if ((m === 12 && d >= 22) || (m === 1 && d <= 19)) return 9;
  if ((m === 1 && d >= 20) || (m === 2 && d <= 18)) return 10;
  return 11;
}

export function MoonPhasePanel() {
  const { t } = useI18n();
  const currentPhase = getCurrentMoonPhase();
  const currentZodiac = getCurrentZodiac();

  return (
    <>
      <div className="side-panel-title">{t('moon.panelTitle')}</div>

      <div>
        <div className="side-panel-title" style={{ fontSize: '0.7rem', marginBottom: '0.8rem' }}>{t('moon.phaseWheel')}</div>
        <div className="moon-phases">
          {MOON_PHASES.map((phase, idx) => (
            <div key={idx} className={`moon-phase-item${idx === currentPhase ? ' current' : ''}`}>
              <span className="moon-phase-symbol">{phase.symbol}</span>
              <span className="moon-phase-name">{t(phase.nameKey)}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="side-panel-title" style={{ fontSize: '0.7rem', marginBottom: '0.8rem' }}>{t('moon.zodiac')}</div>
        <div className="zodiac-grid">
          {ZODIAC_SIGNS.map((sign, idx) => (
            <div key={idx} className={`zodiac-item${idx === currentZodiac ? ' current' : ''}`}>
              <span
                className="zodiac-coin-icon"
                role="img"
                aria-label={t(sign.nameKey)}
                style={{
                  backgroundImage: `url(${ZODIAC_COIN_SHEET})`,
                  backgroundPosition: ZODIAC_SPRITE_POSITIONS[idx],
                }}
              />
              <span className="zodiac-name-zh">{t(sign.nameKey)}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}