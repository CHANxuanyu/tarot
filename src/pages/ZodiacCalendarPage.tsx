const ZODIAC_DATA = [
  { symbol: '♈', nameZh: '白羊座', en: 'Aries',       start: [3,21], end: [4,19],   guardian: '火星',   color: '#c0392b', keywords: '行动·勇气·领导', forecast: '太阳双子座与水星相合，带来清晰的思维与强大的沟通能量。今日适合表达想法，开展交流。月亮天秤提醒你关注关系中的平衡与和谐。新的想法可能在意想不到的对话中浮现。', color2: '红色', lucky: 7 },
  { symbol: '♉', nameZh: '金牛座', en: 'Taurus',      start: [4,20], end: [5,20],   guardian: '金星',   color: '#27ae60', keywords: '稳定·感官·财富', forecast: '金星巨蟹带来对家庭和情感连接的渴望。今日适合专注于安全感与物质基础的建立，财务规划或家居布置能带来满足感。', color2: '绿色', lucky: 6 },
  { symbol: '♊', nameZh: '双子座', en: 'Gemini',      start: [5,21], end: [6,21],   guardian: '水星',   color: '#f39c12', keywords: '沟通·好奇·变化', forecast: '太阳水星均在你的星座，思维极为活跃，灵感涌现。今日多听多问，在对话中寻找答案，灵活应变是你的优势。', color2: '黄色', lucky: 5 },
  { symbol: '♋', nameZh: '巨蟹座', en: 'Cancer',      start: [6,22], end: [7,22],   guardian: '月亮',   color: '#2980b9', keywords: '直觉·守护·情感', forecast: '月亮天秤带来对关系平衡的关注，金星进入你的星座放大情感与吸引力。今日适合表达爱意，关注内心的真实感受。', color2: '银色', lucky: 2 },
  { symbol: '♌', nameZh: '狮子座', en: 'Leo',         start: [7,23], end: [8,22],   guardian: '太阳',   color: '#e67e22', keywords: '创意·热情·自信', forecast: '木星金牛为长期目标蓄积力量，火星白羊激发行动热情。今日是大胆追求创意与展示才华的好时机，自信是你最强的武器。', color2: '金色', lucky: 1 },
  { symbol: '♍', nameZh: '处女座', en: 'Virgo',       start: [8,23], end: [9,22],   guardian: '水星',   color: '#8e44ad', keywords: '细致·分析·服务', forecast: '水星双子强化分析力，土星双鱼提醒你保持务实。今日适合处理积压的细节事务，完善计划，注意不要陷入过度分析的陷阱。', color2: '棕色', lucky: 3 },
  { symbol: '♎', nameZh: '天秤座', en: 'Libra',       start: [9,23], end: [10,23],  guardian: '金星',   color: '#16a085', keywords: '平衡·美感·关系', forecast: '月亮在你的星座放大了对和谐的追求，金星巨蟹为关系带来温柔。今日关注内外的平衡，外交与美感能力使你左右逢源。', color2: '粉色', lucky: 8 },
  { symbol: '♏', nameZh: '天蝎座', en: 'Scorpio',     start: [10,24], end: [11,22], guardian: '冥王星', color: '#c0392b', keywords: '深邃·转化·洞察', forecast: '冥王星水瓶带来对权力结构的深度洞察，今日直觉极强，适合挖掘隐藏的动机与模式，勇于面对内心的阴影。', color2: '深红', lucky: 9 },
  { symbol: '♐', nameZh: '射手座', en: 'Sagittarius', start: [11,23], end: [12,21], guardian: '木星',   color: '#9b59b6', keywords: '自由·探索·智慧', forecast: '木星金牛为你的哲学探索提供实际支撑，今日是学习、旅行规划或分享知识的好日子，拓展视野带来真正的满足。', color2: '紫色', lucky: 3 },
  { symbol: '♑', nameZh: '摩羯座', en: 'Capricorn',   start: [12,22], end: [1,19],  guardian: '土星',   color: '#7f8c8d', keywords: '责任·纪律·成就', forecast: '土星双鱼调和严谨与直觉，今日脚踏实地的行动能推动长期目标前进，专注于可量化的进展，耐心是最大资产。', color2: '黑色', lucky: 4 },
  { symbol: '♒', nameZh: '水瓶座', en: 'Aquarius',    start: [1,20],  end: [2,18],  guardian: '天王星', color: '#2980b9', keywords: '创新·独立·人道', forecast: '天王星金牛激活创新与突破，冥王星在你的星座持续推动个人革命。今日适合构思未来愿景，在集体中分享独特的洞见。', color2: '蓝色', lucky: 11 },
  { symbol: '♓', nameZh: '双鱼座', en: 'Pisces',      start: [2,19],  end: [3,20],  guardian: '海王星', color: '#1abc9c', keywords: '直觉·同情·梦想', forecast: '海王星在你的星座深化灵性感知，土星帮助将梦想落地。今日适合冥想、艺术或帮助他人，注意界限，避免情绪过载。', color2: '海蓝', lucky: 7 },
];

const PLANETS_ZH = [
  { name: '太阳', symbol: '☀', sign: '双子座', deg: "3°42'" },
  { name: '月亮', symbol: '☽', sign: '天秤座', deg: "12°17'" },
  { name: '水星', symbol: '☿', sign: '双子座', deg: "18°33'" },
  { name: '金星', symbol: '♀', sign: '巨蟹座', deg: "27°09'" },
  { name: '火星', symbol: '♂', sign: '白羊座', deg: "10°55'" },
  { name: '木星', symbol: '♃', sign: '金牛座', deg: "22°41'" },
  { name: '土星', symbol: '♄', sign: '双鱼座', deg: "19°28'" },
  { name: '天王星',symbol: '♅', sign: '金牛座', deg: "24°11'" },
  { name: '海王星',symbol: '♆', sign: '双鱼座', deg: "29°36'" },
  { name: '冥王星',symbol: '♇', sign: '水瓶座', deg: "1°45'" },
];

const MOON_PHASES = [
  { symbol: '🌑', name: '新月' },
  { symbol: '🌒', name: '娥眉月' },
  { symbol: '🌓', name: '上弦月' },
  { symbol: '🌔', name: '盈凸月' },
  { symbol: '🌕', name: '满月' },
  { symbol: '🌖', name: '亏凸月' },
  { symbol: '🌗', name: '下弦月' },
  { symbol: '🌘', name: '残月' },
];

const MOON_INFLUENCES = [
  '新月: 播种意图，开始新计划，设定月度目标。',
  '娥眉月: 采取行动，推进计划，积累动能。',
  '上弦月: 克服阻力，决策行动，调整方向。',
  '盈凸月: 完善细节，评估进展，增强努力。',
  '满月: 释放与完成，情感高涨，显化达顶峰。',
  '亏凸月: 感恩与分享，整合所学的智慧。',
  '下弦月: 放手清理，反思过往，内观沉淀。',
  '残月: 休息更新，清空空间，准备新周期。',
];

function getMonthMoonPhases(year: number, month: number) {
  const knownNewMoon = new Date('2024-01-11');
  const result = [];
  const daysInMonth = new Date(year, month, 0).getDate();
  for (let d = 1; d <= daysInMonth; d++) {
    const date = new Date(year, month - 1, d);
    const diff = (date.getTime() - knownNewMoon.getTime()) / (1000 * 60 * 60 * 24);
    const cycle = ((diff % 29.53) + 29.53) % 29.53;
    const phaseIdx = Math.floor(cycle / (29.53 / 8));
    result.push({ day: d, phaseIdx });
  }
  return result;
}

function getCurrentZodiacIdx(): number {
  const now = new Date();
  const m = now.getMonth() + 1, d = now.getDate();
  for (let i = 0; i < ZODIAC_DATA.length; i++) {
    const z = ZODIAC_DATA[i];
    const [sm, sd] = z.start, [em, ed] = z.end;
    if (sm <= em) {
      if ((m === sm && d >= sd) || (m === em && d <= ed) || (m > sm && m < em)) return i;
    } else {
      if ((m === sm && d >= sd) || m > sm || (m === em && d <= ed) || m < em) return i;
    }
  }
  return 11;
}

function ZodiacWheelSvg({ currentIdx }: { currentIdx: number }) {
  const cx = 160, cy = 160, r = 130, rInner = 75;
  const signs = ZODIAC_DATA;

  return (
    <svg viewBox="0 0 320 320" className="zodiac-wheel-svg" aria-label="星座轮">
      {/* Outer ring */}
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(201,168,76,0.3)" strokeWidth="1" />
      <circle cx={cx} cy={cy} r={rInner} fill="none" stroke="rgba(201,168,76,0.2)" strokeWidth="1" />
      {/* Center glow */}
      <circle cx={cx} cy={cy} r={rInner - 10} fill="rgba(201,168,76,0.04)" />
      <text x={cx} y={cy + 8} textAnchor="middle" fontSize="28" fill="rgba(232,200,112,0.8)" fontFamily="serif">☀</text>

      {signs.map((sign, i) => {
        const startAngle = (i * 30 - 90) * (Math.PI / 180);
        const midAngle = ((i * 30 + 15) - 90) * (Math.PI / 180);
        const endAngle = ((i + 1) * 30 - 90) * (Math.PI / 180);

        const x1 = cx + r * Math.cos(startAngle);
        const y1 = cy + r * Math.sin(startAngle);
        const x2 = cx + rInner * Math.cos(startAngle);
        const y2 = cy + rInner * Math.sin(startAngle);

        const symR = (r + rInner) / 2;
        const symX = cx + symR * Math.cos(midAngle);
        const symY = cy + symR * Math.sin(midAngle);

        const isActive = i === currentIdx;

        // Sector path
        const ax = cx + r * Math.cos(startAngle);
        const ay = cy + r * Math.sin(startAngle);
        const bx = cx + r * Math.cos(endAngle);
        const by = cy + r * Math.sin(endAngle);
        const cx2 = cx + rInner * Math.cos(endAngle);
        const cy2 = cy + rInner * Math.sin(endAngle);
        const dx = cx + rInner * Math.cos(startAngle);
        const dy = cy + rInner * Math.sin(startAngle);

        return (
          <g key={i}>
            {isActive && (
              <path
                d={`M${ax},${ay} A${r},${r} 0 0,1 ${bx},${by} L${cx2},${cy2} A${rInner},${rInner} 0 0,0 ${dx},${dy} Z`}
                fill="rgba(201,168,76,0.15)"
                stroke="rgba(201,168,76,0.5)"
                strokeWidth="1.5"
              />
            )}
            <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(201,168,76,0.2)" strokeWidth="0.8" />
            <text
              x={symX} y={symY + 4}
              textAnchor="middle"
              fontSize={isActive ? "13" : "11"}
              fill={isActive ? "rgba(232,200,112,1)" : "rgba(201,168,76,0.55)"}
              fontFamily="serif"
            >
              {sign.symbol}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export function ZodiacCalendarPage() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const today = now.getDate();
  const zodiacIdx = getCurrentZodiacIdx();
  const sign = ZODIAC_DATA[zodiacIdx];
  const monthPhases = getMonthMoonPhases(year, month);
  const currentPhaseIdx = monthPhases.find(p => p.day === today)?.phaseIdx ?? 0;

  const dateStr = now.toLocaleDateString('zh-CN', { year: 'numeric', month: 'long' });

  return (
    <div className="page">
      <div className="zodiac-layout">
        {/* Left: moon calendar */}
        <aside className="side-panel">
          <div className="moon-calendar">
            <div className="moon-cal-title">月相日历</div>
            <div className="moon-cal-month">{dateStr}</div>
            <div className="moon-cal-list">
              {monthPhases.map(({ day, phaseIdx }) => (
                <div key={day} className={`moon-cal-item${day === today ? ' today' : ''}`}>
                  <span className="moon-cal-date">{month}月{day}日</span>
                  <span className="moon-cal-phase-sym">{MOON_PHASES[phaseIdx].symbol}</span>
                  <span className="moon-cal-phase-name">{MOON_PHASES[phaseIdx].name}</span>
                </div>
              ))}
            </div>
            <div className="moon-influence">
              <span style={{ color: 'var(--gold)', fontWeight: 600 }}>今日月相影响：</span>
              <br />{MOON_INFLUENCES[currentPhaseIdx]}
            </div>
          </div>
        </aside>

        {/* Center: zodiac wheel */}
        <div className="zodiac-center">
          <div className="gold-heading">{dateStr}</div>
          <ZodiacWheelSvg currentIdx={zodiacIdx} />
          <div className="zodiac-energy">
            <span style={{ color: 'var(--text-muted)' }}>当前星象能量</span>
            <div className="energy-dots">
              {[1,2,3,4,5].map(i => {
                const energy = 3;
                return <div key={i} className={`energy-dot${i <= energy ? ' active' : ''}`} />;
              })}
            </div>
            <span style={{ color: 'var(--gold)' }}>中等</span>
          </div>
        </div>

        {/* Right: daily reading */}
        <aside className="side-panel right">
          <div className="daily-reading-panel">
            <div className="daily-sign-header">
              <div className="daily-sign-sym">{sign.symbol}</div>
              <div className="daily-sign-name">{sign.nameZh}</div>
              <div className="daily-keywords">{sign.keywords}</div>
              <div className="daily-planet">守护星：{sign.guardian}</div>
            </div>

            <div>
              <div className="guidance-reading-label">今日行星位置</div>
              <div className="planet-list">
                {PLANETS_ZH.map((p, i) => (
                  <div key={i} className="planet-item">
                    <span className="planet-name">{p.symbol} {p.name}</span>
                    <span className="planet-pos">{p.sign} {p.deg}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="daily-forecast">{sign.forecast}</div>

            <div className="daily-lucky">
              <div className="lucky-item">幸运色：<span>{sign.color2}</span></div>
              <div className="lucky-item">幸运数字：<span>{sign.lucky}</span></div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
