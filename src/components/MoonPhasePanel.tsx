const MOON_PHASES = [
  { symbol: '🌑', name: '新月',   labelEn: 'New Moon' },
  { symbol: '🌒', name: '娥眉月', labelEn: 'Waxing Crescent' },
  { symbol: '🌓', name: '上弦月', labelEn: 'First Quarter' },
  { symbol: '🌔', name: '盈凸月', labelEn: 'Waxing Gibbous' },
  { symbol: '🌕', name: '满月',   labelEn: 'Full Moon' },
  { symbol: '🌖', name: '亏凸月', labelEn: 'Waning Gibbous' },
  { symbol: '🌗', name: '下弦月', labelEn: 'Last Quarter' },
  { symbol: '🌘', name: '残月',   labelEn: 'Waning Crescent' },
];

const ZODIAC_SIGNS = [
  { symbol: '♈', name: '白羊' },
  { symbol: '♉', name: '金牛' },
  { symbol: '♊', name: '双子' },
  { symbol: '♋', name: '巨蟹' },
  { symbol: '♌', name: '狮子' },
  { symbol: '♍', name: '处女' },
  { symbol: '♎', name: '天秤' },
  { symbol: '♏', name: '天蝎' },
  { symbol: '♐', name: '射手' },
  { symbol: '♑', name: '摩羯' },
  { symbol: '♒', name: '水瓶' },
  { symbol: '♓', name: '双鱼' },
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
  const currentPhase = getCurrentMoonPhase();
  const currentZodiac = getCurrentZodiac();

  return (
    <>
      <div className="side-panel-title">月相 · 星宫</div>

      <div>
        <div className="side-panel-title" style={{ fontSize: '0.7rem', marginBottom: '0.8rem' }}>月相之轮</div>
        <div className="moon-phases">
          {MOON_PHASES.map((phase, idx) => (
            <div key={idx} className={`moon-phase-item${idx === currentPhase ? ' current' : ''}`}>
              <span className="moon-phase-symbol">{phase.symbol}</span>
              <span className="moon-phase-name">{phase.name}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="side-panel-title" style={{ fontSize: '0.7rem', marginBottom: '0.8rem' }}>十二星座</div>
        <div className="zodiac-grid">
          {ZODIAC_SIGNS.map((sign, idx) => (
            <div key={idx} className={`zodiac-item${idx === currentZodiac ? ' current' : ''}`}>
              <span className="zodiac-symbol">{sign.symbol}</span>
              <span className="zodiac-name-zh">{sign.name}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
