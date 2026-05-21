import { useI18n } from '../i18n/I18nContext';
import type { Locale, TranslationKey } from '../i18n';

const ZODIAC_COIN_SHEET = '/assets/images/zodiac/zodiac-baroque-coin-sheet.jpg';
const ZODIAC_SPRITE_POSITIONS = [
  '0% 0%', '33.333% 0%', '66.666% 0%', '100% 0%',
  '0% 50%', '33.333% 50%', '66.666% 50%', '100% 50%',
  '0% 100%', '33.333% 100%', '66.666% 100%', '100% 100%',
];

type LocalizedText = Record<Locale, string>;

type GuidanceSign = {
  nameKey: TranslationKey;
  guardian: LocalizedText;
  keywords: LocalizedText;
  forecast: LocalizedText;
  color: LocalizedText;
  lucky: number;
};

const ZODIAC_DATA: GuidanceSign[] = [
  {
    nameKey: 'zodiac.aries',
    guardian: { 'zh-CN': '火星', 'en-US': 'Mars', 'fr-FR': 'Mars', 'es-ES': 'Marte' },
    keywords: { 'zh-CN': '行动·勇气·领导', 'en-US': 'Action · Courage · Leadership', 'fr-FR': 'Action · Courage · Leadership', 'es-ES': 'Acción · Coraje · Liderazgo' },
    forecast: { 'zh-CN': '今日能量旺盛，适合开创新局面，勇于表达自我意见，行动力是你的优势。', 'en-US': 'Today carries active momentum. It favors new beginnings, clear self-expression, and decisive movement.', 'fr-FR': 'La journée porte une énergie active. Elle favorise les nouveaux élans, l’expression claire et l’action décidée.', 'es-ES': 'El día trae una energía activa. Favorece los comienzos, la expresión clara y los pasos decididos.' },
    color: { 'zh-CN': '红色', 'en-US': 'Red', 'fr-FR': 'Rouge', 'es-ES': 'Rojo' },
    lucky: 7,
  },
  {
    nameKey: 'zodiac.taurus',
    guardian: { 'zh-CN': '金星', 'en-US': 'Venus', 'fr-FR': 'Vénus', 'es-ES': 'Venus' },
    keywords: { 'zh-CN': '稳定·感官·财富', 'en-US': 'Stability · Senses · Wealth', 'fr-FR': 'Stabilité · Sens · Ressources', 'es-ES': 'Estabilidad · Sentidos · Recursos' },
    forecast: { 'zh-CN': '今日适合专注于实际事务，财务运势良好，感受生活中的美好细节。', 'en-US': 'A grounded day for practical matters, material planning, and appreciating the small pleasures that restore steadiness.', 'fr-FR': 'Une journée ancrée pour les sujets pratiques, l’organisation matérielle et les plaisirs simples qui ramènent la stabilité.', 'es-ES': 'Un día estable para asuntos prácticos, planificación material y pequeños placeres que devuelven calma.' },
    color: { 'zh-CN': '绿色', 'en-US': 'Green', 'fr-FR': 'Vert', 'es-ES': 'Verde' },
    lucky: 6,
  },
  {
    nameKey: 'zodiac.gemini',
    guardian: { 'zh-CN': '水星', 'en-US': 'Mercury', 'fr-FR': 'Mercure', 'es-ES': 'Mercurio' },
    keywords: { 'zh-CN': '沟通·好奇·变化', 'en-US': 'Communication · Curiosity · Change', 'fr-FR': 'Communication · Curiosité · Changement', 'es-ES': 'Comunicación · Curiosidad · Cambio' },
    forecast: { 'zh-CN': '思维活跃，灵感涌现。今日适合交流与学习，多听多问，答案藏在对话之中。', 'en-US': 'The mind is quick and receptive. Conversations, study, and questions may open the answer you were circling around.', 'fr-FR': 'L’esprit est vif et réceptif. Les échanges, l’étude et les questions peuvent ouvrir une réponse déjà proche.', 'es-ES': 'La mente está ágil y receptiva. Conversar, estudiar y preguntar puede abrir la respuesta que ya intuías.' },
    color: { 'zh-CN': '黄色', 'en-US': 'Yellow', 'fr-FR': 'Jaune', 'es-ES': 'Amarillo' },
    lucky: 5,
  },
  {
    nameKey: 'zodiac.cancer',
    guardian: { 'zh-CN': '月亮', 'en-US': 'Moon', 'fr-FR': 'Lune', 'es-ES': 'Luna' },
    keywords: { 'zh-CN': '直觉·守护·情感', 'en-US': 'Intuition · Care · Emotion', 'fr-FR': 'Intuition · Protection · Émotion', 'es-ES': 'Intuición · Cuidado · Emoción' },
    forecast: { 'zh-CN': '内心感受异常敏锐，关注家庭与亲密关系，情感上的联结带来深刻的满足感。', 'en-US': 'Feelings are more sensitive today. Home, intimacy, and emotional safety bring the deepest sense of nourishment.', 'fr-FR': 'Les ressentis sont plus sensibles aujourd’hui. Le foyer, l’intimité et la sécurité affective nourrissent en profondeur.', 'es-ES': 'Las emociones están más sensibles hoy. El hogar, la intimidad y la seguridad afectiva nutren profundamente.' },
    color: { 'zh-CN': '银色', 'en-US': 'Silver', 'fr-FR': 'Argent', 'es-ES': 'Plateado' },
    lucky: 2,
  },
  {
    nameKey: 'zodiac.leo',
    guardian: { 'zh-CN': '太阳', 'en-US': 'Sun', 'fr-FR': 'Soleil', 'es-ES': 'Sol' },
    keywords: { 'zh-CN': '创意·热情·自信', 'en-US': 'Creativity · Warmth · Confidence', 'fr-FR': 'Créativité · Chaleur · Confiance', 'es-ES': 'Creatividad · Calidez · Confianza' },
    forecast: { 'zh-CN': '光芒四射的一天，创意与自信并存。大胆展示才华，你的表达会感染周围的人。', 'en-US': 'A radiant day for creativity and confidence. Let your talents be visible; sincere expression can inspire others.', 'fr-FR': 'Une journée rayonnante pour la créativité et la confiance. Montrez vos talents avec sincérité : cela peut inspirer autour de vous.', 'es-ES': 'Un día radiante para la creatividad y la confianza. Muestra tu talento con sinceridad; puede inspirar a otros.' },
    color: { 'zh-CN': '金色', 'en-US': 'Gold', 'fr-FR': 'Or', 'es-ES': 'Dorado' },
    lucky: 1,
  },
  {
    nameKey: 'zodiac.virgo',
    guardian: { 'zh-CN': '水星', 'en-US': 'Mercury', 'fr-FR': 'Mercure', 'es-ES': 'Mercurio' },
    keywords: { 'zh-CN': '细致·分析·服务', 'en-US': 'Detail · Analysis · Service', 'fr-FR': 'Détail · Analyse · Service', 'es-ES': 'Detalle · Análisis · Servicio' },
    forecast: { 'zh-CN': '今日适合处理细节事务，分析力强，注意不要过度追求完美，接受适当的不完整。', 'en-US': 'Details are easier to handle today. Use your discernment, but do not let perfectionism delay useful progress.', 'fr-FR': 'Les détails se traitent plus facilement aujourd’hui. Servez-vous de votre discernement sans laisser le perfectionnisme bloquer l’avancée.', 'es-ES': 'Hoy los detalles se ordenan mejor. Usa tu criterio sin permitir que el perfeccionismo frene el avance.' },
    color: { 'zh-CN': '棕色', 'en-US': 'Brown', 'fr-FR': 'Brun', 'es-ES': 'Marrón' },
    lucky: 3,
  },
  {
    nameKey: 'zodiac.libra',
    guardian: { 'zh-CN': '金星', 'en-US': 'Venus', 'fr-FR': 'Vénus', 'es-ES': 'Venus' },
    keywords: { 'zh-CN': '平衡·美感·关系', 'en-US': 'Balance · Beauty · Relationship', 'fr-FR': 'Équilibre · Beauté · Relation', 'es-ES': 'Equilibrio · Belleza · Relación' },
    forecast: { 'zh-CN': '关系和谐是今日的主题，寻求内外的平衡，美感与外交能力为你带来顺畅的互动。', 'en-US': 'Harmony is the theme. Diplomacy, aesthetic sense, and balanced choices can smooth important interactions.', 'fr-FR': 'L’harmonie domine la journée. Diplomatie, sens esthétique et choix équilibrés facilitent les échanges importants.', 'es-ES': 'La armonía marca el día. La diplomacia, el sentido estético y las decisiones equilibradas facilitan los vínculos.' },
    color: { 'zh-CN': '粉色', 'en-US': 'Pink', 'fr-FR': 'Rose', 'es-ES': 'Rosa' },
    lucky: 8,
  },
  {
    nameKey: 'zodiac.scorpio',
    guardian: { 'zh-CN': '冥王星', 'en-US': 'Pluto', 'fr-FR': 'Pluton', 'es-ES': 'Plutón' },
    keywords: { 'zh-CN': '深邃·转化·洞察', 'en-US': 'Depth · Transformation · Insight', 'fr-FR': 'Profondeur · Transformation · Lucidité', 'es-ES': 'Profundidad · Transformación · Perspicacia' },
    forecast: { 'zh-CN': '今日直觉极其敏锐，适合深入探索隐藏的真相与自我转化，勿回避内心的黑暗面。', 'en-US': 'Intuition runs deep. It is a good day to examine hidden motives and transform what has been avoided.', 'fr-FR': 'L’intuition est profonde. La journée aide à explorer les motivations cachées et à transformer ce qui a été évité.', 'es-ES': 'La intuición es profunda. Es buen día para mirar motivos ocultos y transformar lo que has evitado.' },
    color: { 'zh-CN': '深红', 'en-US': 'Dark red', 'fr-FR': 'Rouge sombre', 'es-ES': 'Rojo oscuro' },
    lucky: 9,
  },
  {
    nameKey: 'zodiac.sagittarius',
    guardian: { 'zh-CN': '木星', 'en-US': 'Jupiter', 'fr-FR': 'Jupiter', 'es-ES': 'Júpiter' },
    keywords: { 'zh-CN': '自由·探索·智慧', 'en-US': 'Freedom · Exploration · Wisdom', 'fr-FR': 'Liberté · Exploration · Sagesse', 'es-ES': 'Libertad · Exploración · Sabiduría' },
    forecast: { 'zh-CN': '对远方充满渴望，今日适合学习、旅行或探讨哲学，拓展你的视野与人生哲学。', 'en-US': 'A wider horizon calls. Learning, travel planning, or philosophical reflection can renew your sense of direction.', 'fr-FR': 'Un horizon plus vaste appelle. Étude, voyage ou réflexion philosophique peuvent renouveler votre direction.', 'es-ES': 'Un horizonte más amplio llama. Estudiar, planear un viaje o reflexionar puede renovar tu rumbo.' },
    color: { 'zh-CN': '紫色', 'en-US': 'Purple', 'fr-FR': 'Violet', 'es-ES': 'Morado' },
    lucky: 3,
  },
  {
    nameKey: 'zodiac.capricorn',
    guardian: { 'zh-CN': '土星', 'en-US': 'Saturn', 'fr-FR': 'Saturne', 'es-ES': 'Saturno' },
    keywords: { 'zh-CN': '责任·纪律·成就', 'en-US': 'Responsibility · Discipline · Achievement', 'fr-FR': 'Responsabilité · Discipline · Réalisation', 'es-ES': 'Responsabilidad · Disciplina · Logro' },
    forecast: { 'zh-CN': '脚踏实地的一天，专注于长期目标，持续的努力正在积累成未来的丰收与成就。', 'en-US': 'A practical day for long-term goals. Steady effort now becomes the structure for later achievement.', 'fr-FR': 'Une journée concrète pour les objectifs à long terme. L’effort régulier construit les réussites futures.', 'es-ES': 'Un día práctico para metas a largo plazo. El esfuerzo constante construye logros futuros.' },
    color: { 'zh-CN': '黑色', 'en-US': 'Black', 'fr-FR': 'Noir', 'es-ES': 'Negro' },
    lucky: 4,
  },
  {
    nameKey: 'zodiac.aquarius',
    guardian: { 'zh-CN': '天王星', 'en-US': 'Uranus', 'fr-FR': 'Uranus', 'es-ES': 'Urano' },
    keywords: { 'zh-CN': '创新·独立·人道', 'en-US': 'Innovation · Independence · Humanity', 'fr-FR': 'Innovation · Indépendance · Humanité', 'es-ES': 'Innovación · Independencia · Humanidad' },
    forecast: { 'zh-CN': '思维超前，今日适合创新与突破传统框架，团体活动中你的独特观点将被珍视。', 'en-US': 'Original thinking is highlighted. Innovation and group conversations may value the perspective only you can bring.', 'fr-FR': 'La pensée originale est mise en avant. Innovation et échanges collectifs valorisent votre point de vue singulier.', 'es-ES': 'El pensamiento original destaca. La innovación y los grupos pueden valorar tu mirada singular.' },
    color: { 'zh-CN': '蓝色', 'en-US': 'Blue', 'fr-FR': 'Bleu', 'es-ES': 'Azul' },
    lucky: 11,
  },
  {
    nameKey: 'zodiac.pisces',
    guardian: { 'zh-CN': '海王星', 'en-US': 'Neptune', 'fr-FR': 'Neptune', 'es-ES': 'Neptuno' },
    keywords: { 'zh-CN': '直觉·同情·梦想', 'en-US': 'Intuition · Compassion · Dreams', 'fr-FR': 'Intuition · Compassion · Rêves', 'es-ES': 'Intuición · Compasión · Sueños' },
    forecast: { 'zh-CN': '感性之极，今日适合艺术创作与冥想，梦境或预感可能带来重要的灵性启示。', 'en-US': 'Sensitivity is heightened. Art, meditation, and subtle impressions may bring meaningful inner guidance.', 'fr-FR': 'La sensibilité augmente. Art, méditation et impressions subtiles peuvent apporter une guidance intérieure.', 'es-ES': 'La sensibilidad aumenta. El arte, la meditación y las impresiones sutiles pueden traer guía interior.' },
    color: { 'zh-CN': '海蓝', 'en-US': 'Sea blue', 'fr-FR': 'Bleu marin', 'es-ES': 'Azul marino' },
    lucky: 7,
  },
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

function pickText(text: LocalizedText, locale: Locale): string {
  return text[locale] ?? text['en-US'];
}

export function TodayGuidance() {
  const { locale, t } = useI18n();
  const now = new Date();
  const zodiacIdx = getCurrentZodiacIndex();
  const sign = ZODIAC_DATA[zodiacIdx];
  const energy = getEnergyLevel();
  const quote = t(`today.quote.${now.getDate() % 4}` as TranslationKey);
  const energyLabel = energy >= 4 ? t('today.energyStrong') : energy >= 3 ? t('today.energyMedium') : t('today.energyLow');

  const dateStr = new Intl.DateTimeFormat(locale, {
    year: 'numeric', month: 'long', day: 'numeric', weekday: 'long',
  }).format(now);

  return (
    <>
      <div className="side-panel-title">{t('today.title')}</div>

      <div className="guidance-wheel">
        <div className="guidance-sun" style={{ backgroundImage: `url(${ZODIAC_COIN_SHEET})`, backgroundPosition: ZODIAC_SPRITE_POSITIONS[zodiacIdx] }}></div>
        <div className="guidance-sign-name">{t(sign.nameKey)}</div>
        <div className="guidance-date">{dateStr}</div>
      </div>

      <div className="guidance-quote">
        <div className="guidance-quote-text">"{quote}"</div>
      </div>

      <div className="guidance-reading">
        <div className="guidance-reading-label">{t('today.energy')}</div>
        <div className="energy-dots">
          {[1,2,3,4,5].map(i => (
            <div key={i} className={`energy-dot${i <= energy ? ' active' : ''}`} />
          ))}
          <span style={{ marginLeft: '0.5rem', fontFamily: 'var(--font-zh)', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
            {energyLabel}
          </span>
        </div>
        <div className="guidance-reading-label" style={{ marginTop: '0.5rem' }}>{t('today.keywords')}</div>
        <div className="guidance-reading-text">{pickText(sign.keywords, locale)}</div>
        <div className="guidance-reading-label" style={{ marginTop: '0.5rem' }}>{t('today.guardian')}</div>
        <div className="guidance-reading-text">{pickText(sign.guardian, locale)}</div>
      </div>

      <div className="guidance-reading">
        <div className="guidance-reading-label">{t('today.daily')}</div>
        <div className="guidance-reading-text">{pickText(sign.forecast, locale)}</div>
      </div>

      <div className="guidance-energy" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '0.3rem' }}>
        <span>{t('today.luckyColor')}: <span style={{ color: 'var(--gold)' }}>{pickText(sign.color, locale)}</span></span>
        <span>{t('today.luckyNumber')}: <span style={{ color: 'var(--gold)' }}>{sign.lucky}</span></span>
      </div>
    </>
  );
}