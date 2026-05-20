const ZODIAC_DATA = [
  { symbol: '♈', name: '白羊座', en: 'Aries',       guardian: '火星',   keywords: '行动·勇气·领导', forecast: '今日能量旺盛，适合开创新局面，勇于表达自我意见，行动力是你的优势。', color: '红色', lucky: 7 },
  { symbol: '♉', name: '金牛座', en: 'Taurus',      guardian: '金星',   keywords: '稳定·感官·财富', forecast: '今日适合专注于实际事务，财务运势良好，感受生活中的美好细节。', color: '绿色', lucky: 6 },
  { symbol: '♊', name: '双子座', en: 'Gemini',      guardian: '水星',   keywords: '沟通·好奇·变化', forecast: '思维活跃，灵感涌现。今日适合交流与学习，多听多问，答案藏在对话之中。', color: '黄色', lucky: 5 },
  { symbol: '♋', name: '巨蟹座', en: 'Cancer',      guardian: '月亮',   keywords: '直觉·守护·情感', forecast: '内心感受异常敏锐，关注家庭与亲密关系，情感上的联结带来深刻的满足感。', color: '银色', lucky: 2 },
  { symbol: '♌', name: '狮子座', en: 'Leo',         guardian: '太阳',   keywords: '创意·热情·自信', forecast: '光芒四射的一天，创意与自信并存。大胆展示才华，你的表达会感染周围的人。', color: '金色', lucky: 1 },
  { symbol: '♍', name: '处女座', en: 'Virgo',       guardian: '水星',   keywords: '细致·分析·服务', forecast: '今日适合处理细节事务，分析力强，注意不要过度追求完美，接受适当的不完整。', color: '棕色', lucky: 3 },
  { symbol: '♎', name: '天秤座', en: 'Libra',       guardian: '金星',   keywords: '平衡·美感·关系', forecast: '关系和谐是今日的主题，寻求内外的平衡，美感与外交能力为你带来顺畅的互动。', color: '粉色', lucky: 8 },
  { symbol: '♏', name: '天蝎座', en: 'Scorpio',     guardian: '冥王星', keywords: '深邃·转化·洞察', forecast: '今日直觉极其敏锐，适合深入探索隐藏的真相与自我转化，勿回避内心的黑暗面。', color: '深红', lucky: 9 },
  { symbol: '♐', name: '射手座', en: 'Sagittarius', guardian: '木星',   keywords: '自由·探索·智慧', forecast: '对远方充满渴望，今日适合学习、旅行或探讨哲学，拓展你的视野与人生哲学。', color: '紫色', lucky: 3 },
  { symbol: '♑', name: '摩羯座', en: 'Capricorn',   guardian: '土星',   keywords: '责任·纪律·成就', forecast: '脚踏实地的一天，专注于长期目标，持续的努力正在积累成未来的丰收与成就。', color: '黑色', lucky: 4 },
  { symbol: '♒', name: '水瓶座', en: 'Aquarius',    guardian: '天王星', keywords: '创新·独立·人道', forecast: '思维超前，今日适合创新与突破传统框架，团体活动中你的独特观点将被珍视。', color: '蓝色', lucky: 11 },
  { symbol: '♓', name: '双鱼座', en: 'Pisces',      guardian: '海王星', keywords: '直觉·同情·梦想', forecast: '感性之极，今日适合艺术创作与冥想，梦境或预感可能带来重要的灵性启示。', color: '海蓝', lucky: 7 },
];

const QUOTES = [
  "The cards are mirrors of the soul, windows to the unseen, and whispers from the eternal. Trust the mystery.",
  "In the language of symbols, the universe speaks. Be still enough to listen.",
  "Every card drawn is a conversation with the cosmos. Your question is already answered within you.",
  "The stars do not dictate, they illuminate. You hold the pen of your own story.",
];

function getCurrentZodiacIndex(): number {
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

function getEnergyLevel(): number {
  const knownNewMoon = new Date('2024-01-11');
  const now = new Date();
  const diff = (now.getTime() - knownNewMoon.getTime()) / (1000 * 60 * 60 * 24);
  const cycle = diff % 29.53;
  const phase = cycle / 29.53;
  return Math.round(2 + Math.abs(Math.sin(phase * Math.PI)) * 3);
}

export function TodayGuidance() {
  const now = new Date();
  const zodiacIdx = getCurrentZodiacIndex();
  const sign = ZODIAC_DATA[zodiacIdx];
  const energy = getEnergyLevel();
  const quote = QUOTES[now.getDate() % QUOTES.length];

  const dateStr = now.toLocaleDateString('zh-CN', {
    year: 'numeric', month: 'long', day: 'numeric', weekday: 'long',
  });

  return (
    <>
      <div className="side-panel-title">今日指引</div>

      <div className="guidance-wheel">
        <div className="guidance-sun">{sign.symbol}</div>
        <div className="guidance-sign-name">{sign.name}</div>
        <div className="guidance-date">{dateStr}</div>
      </div>

      <div className="guidance-quote">
        <div className="guidance-quote-text">"{quote}"</div>
      </div>

      <div className="guidance-reading">
        <div className="guidance-reading-label">今日星象能量</div>
        <div className="energy-dots">
          {[1,2,3,4,5].map(i => (
            <div key={i} className={`energy-dot${i <= energy ? ' active' : ''}`} />
          ))}
          <span style={{ marginLeft: '0.5rem', fontFamily: 'var(--font-zh)', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
            {energy >= 4 ? '较强' : energy >= 3 ? '中等' : '偏弱'}
          </span>
        </div>
        <div className="guidance-reading-label" style={{ marginTop: '0.5rem' }}>今日关键词</div>
        <div className="guidance-reading-text">{sign.keywords}</div>
        <div className="guidance-reading-label" style={{ marginTop: '0.5rem' }}>守护星</div>
        <div className="guidance-reading-text">{sign.guardian}</div>
      </div>

      <div className="guidance-reading">
        <div className="guidance-reading-label">每日星象</div>
        <div className="guidance-reading-text">{sign.forecast}</div>
      </div>

      <div className="guidance-energy" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '0.3rem' }}>
        <span>幸运色：<span style={{ color: 'var(--gold)' }}>{sign.color}</span></span>
        <span>幸运数字：<span style={{ color: 'var(--gold)' }}>{sign.lucky}</span></span>
      </div>
    </>
  );
}
