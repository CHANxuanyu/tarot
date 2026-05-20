import { useState } from 'react';
import { useI18n } from '../i18n/I18nContext';
import type { Locale, TranslationKey } from '../i18n';

const ZODIAC_COIN_SHEET = '/assets/images/zodiac/zodiac-baroque-coin-sheet.png';
const ZODIAC_SPRITE_POSITIONS = [
  '0% 0%', '33.333% 0%', '66.666% 0%', '100% 0%',
  '0% 50%', '33.333% 50%', '66.666% 50%', '100% 50%',
  '0% 100%', '33.333% 100%', '66.666% 100%', '100% 100%',
];

type LocalizedText = Record<Locale, string>;

type ZodiacSign = {
  nameKey: TranslationKey;
  start: [number, number];
  end: [number, number];
  guardian: LocalizedText;
  keywords: LocalizedText;
  forecast: LocalizedText;
  colorName: LocalizedText;
  lucky: number;
};

type PlanetPosition = {
  name: LocalizedText;
  symbol: string;
  signKey: TranslationKey;
  deg: string;
};

const ZODIAC_DATA: ZodiacSign[] = [
  {
    nameKey: 'zodiac.aries',
    start: [3, 21],
    end: [4, 19],
    guardian: { 'zh-CN': '火星', 'en-US': 'Mars', 'fr-FR': 'Mars', 'es-ES': 'Marte' },
    keywords: { 'zh-CN': '行动·勇气·领导', 'en-US': 'Action · Courage · Leadership', 'fr-FR': 'Action · Courage · Leadership', 'es-ES': 'Acción · Coraje · Liderazgo' },
    forecast: { 'zh-CN': '太阳双子座与水星相合，带来清晰的思维与强大的沟通能量。今日适合表达想法，开展交流。', 'en-US': 'The Sun and Mercury sharpen communication. This is a useful day for speaking clearly, asking questions, and beginning practical exchanges.', 'fr-FR': 'Le Soleil et Mercure clarifient la communication. La journée favorise les échanges, les questions justes et les débuts concrets.', 'es-ES': 'El Sol y Mercurio aclaran la comunicación. Es un día útil para hablar con claridad, preguntar y abrir intercambios concretos.' },
    colorName: { 'zh-CN': '红色', 'en-US': 'Red', 'fr-FR': 'Rouge', 'es-ES': 'Rojo' },
    lucky: 7,
  },
  {
    nameKey: 'zodiac.taurus',
    start: [4, 20],
    end: [5, 20],
    guardian: { 'zh-CN': '金星', 'en-US': 'Venus', 'fr-FR': 'Vénus', 'es-ES': 'Venus' },
    keywords: { 'zh-CN': '稳定·感官·财富', 'en-US': 'Stability · Senses · Resources', 'fr-FR': 'Stabilité · Sens · Ressources', 'es-ES': 'Estabilidad · Sentidos · Recursos' },
    forecast: { 'zh-CN': '金星巨蟹带来对家庭和情感连接的渴望。今日适合专注于安全感与物质基础的建立，财务规划或家居布置能带来满足感。', 'en-US': 'Venus highlights comfort and emotional security. Focus on practical foundations, financial planning, and small choices that restore steadiness.', 'fr-FR': 'Vénus met l’accent sur le confort et la sécurité affective. Privilégiez les bases concrètes, l’organisation matérielle et ce qui ramène la stabilité.', 'es-ES': 'Venus resalta el confort y la seguridad emocional. Enfócate en bases prácticas, planificación material y decisiones que devuelvan estabilidad.' },
    colorName: { 'zh-CN': '绿色', 'en-US': 'Green', 'fr-FR': 'Vert', 'es-ES': 'Verde' },
    lucky: 6,
  },
  {
    nameKey: 'zodiac.gemini',
    start: [5, 21],
    end: [6, 21],
    guardian: { 'zh-CN': '水星', 'en-US': 'Mercury', 'fr-FR': 'Mercure', 'es-ES': 'Mercurio' },
    keywords: { 'zh-CN': '沟通·好奇·变化', 'en-US': 'Communication · Curiosity · Change', 'fr-FR': 'Communication · Curiosité · Changement', 'es-ES': 'Comunicación · Curiosidad · Cambio' },
    forecast: { 'zh-CN': '太阳水星均在你的星座，思维极为活跃，灵感涌现。今日多听多问，在对话中寻找答案。', 'en-US': 'Your mind is quick and flexible. Listening, learning, and asking better questions may reveal the answer already forming.', 'fr-FR': 'L’esprit est vif et souple. Écouter, apprendre et poser de meilleures questions peut révéler une réponse déjà en formation.', 'es-ES': 'La mente está ágil y flexible. Escuchar, aprender y formular mejores preguntas puede revelar una respuesta que ya se está formando.' },
    colorName: { 'zh-CN': '黄色', 'en-US': 'Yellow', 'fr-FR': 'Jaune', 'es-ES': 'Amarillo' },
    lucky: 5,
  },
  {
    nameKey: 'zodiac.cancer',
    start: [6, 22],
    end: [7, 22],
    guardian: { 'zh-CN': '月亮', 'en-US': 'Moon', 'fr-FR': 'Lune', 'es-ES': 'Luna' },
    keywords: { 'zh-CN': '直觉·守护·情感', 'en-US': 'Intuition · Care · Emotion', 'fr-FR': 'Intuition · Protection · Émotion', 'es-ES': 'Intuición · Cuidado · Emoción' },
    forecast: { 'zh-CN': '月亮天秤带来对关系平衡的关注，今日适合表达爱意，关注内心的真实感受。', 'en-US': 'Relationship balance matters today. Honest care, gentleness, and emotional boundaries help you feel more centered.', 'fr-FR': 'L’équilibre relationnel compte aujourd’hui. Attention sincère, douceur et limites émotionnelles aident à retrouver votre centre.', 'es-ES': 'El equilibrio relacional importa hoy. El cuidado sincero, la suavidad y los límites emocionales ayudan a centrarte.' },
    colorName: { 'zh-CN': '银色', 'en-US': 'Silver', 'fr-FR': 'Argent', 'es-ES': 'Plateado' },
    lucky: 2,
  },
  {
    nameKey: 'zodiac.leo',
    start: [7, 23],
    end: [8, 22],
    guardian: { 'zh-CN': '太阳', 'en-US': 'Sun', 'fr-FR': 'Soleil', 'es-ES': 'Sol' },
    keywords: { 'zh-CN': '创意·热情·自信', 'en-US': 'Creativity · Warmth · Confidence', 'fr-FR': 'Créativité · Chaleur · Confiance', 'es-ES': 'Creatividad · Calidez · Confianza' },
    forecast: { 'zh-CN': '木星金牛为长期目标蓄积力量，火星白羊激发行动热情。今日适合大胆展示才华。', 'en-US': 'Creative fire is present, but it works best when anchored in a long-term goal. Show your talent with intention.', 'fr-FR': 'Le feu créatif est présent, surtout s’il s’ancre dans un objectif durable. Montrez vos talents avec intention.', 'es-ES': 'Hay fuego creativo, especialmente si se apoya en una meta duradera. Muestra tu talento con intención.' },
    colorName: { 'zh-CN': '金色', 'en-US': 'Gold', 'fr-FR': 'Or', 'es-ES': 'Dorado' },
    lucky: 1,
  },
  {
    nameKey: 'zodiac.virgo',
    start: [8, 23],
    end: [9, 22],
    guardian: { 'zh-CN': '水星', 'en-US': 'Mercury', 'fr-FR': 'Mercure', 'es-ES': 'Mercurio' },
    keywords: { 'zh-CN': '细致·分析·服务', 'en-US': 'Detail · Analysis · Service', 'fr-FR': 'Détail · Analyse · Service', 'es-ES': 'Detalle · Análisis · Servicio' },
    forecast: { 'zh-CN': '水星双子强化分析力，土星双鱼提醒你保持务实。今日适合处理积压细节。', 'en-US': 'Analysis is strong, yet practicality matters. Clear one backlog item instead of trying to perfect everything.', 'fr-FR': 'L’analyse est forte, mais le concret compte. Traitez un point en attente plutôt que de vouloir tout perfectionner.', 'es-ES': 'El análisis es fuerte, pero importa lo práctico. Resuelve un pendiente en vez de intentar perfeccionarlo todo.' },
    colorName: { 'zh-CN': '棕色', 'en-US': 'Brown', 'fr-FR': 'Brun', 'es-ES': 'Marrón' },
    lucky: 3,
  },
  {
    nameKey: 'zodiac.libra',
    start: [9, 23],
    end: [10, 23],
    guardian: { 'zh-CN': '金星', 'en-US': 'Venus', 'fr-FR': 'Vénus', 'es-ES': 'Venus' },
    keywords: { 'zh-CN': '平衡·美感·关系', 'en-US': 'Balance · Beauty · Relationship', 'fr-FR': 'Équilibre · Beauté · Relation', 'es-ES': 'Equilibrio · Belleza · Relación' },
    forecast: { 'zh-CN': '月亮在你的星座放大了对和谐的追求，今日关注内外的平衡。', 'en-US': 'Balance is the central theme. A diplomatic tone and attention to fairness can improve the atmosphere around you.', 'fr-FR': 'L’équilibre est le thème central. Un ton diplomate et le sens de l’équité peuvent améliorer l’atmosphère.', 'es-ES': 'El equilibrio es el tema central. Un tono diplomático y sentido de justicia pueden mejorar el ambiente.' },
    colorName: { 'zh-CN': '粉色', 'en-US': 'Pink', 'fr-FR': 'Rose', 'es-ES': 'Rosa' },
    lucky: 8,
  },
  {
    nameKey: 'zodiac.scorpio',
    start: [10, 24],
    end: [11, 22],
    guardian: { 'zh-CN': '冥王星', 'en-US': 'Pluto', 'fr-FR': 'Pluton', 'es-ES': 'Plutón' },
    keywords: { 'zh-CN': '深邃·转化·洞察', 'en-US': 'Depth · Transformation · Insight', 'fr-FR': 'Profondeur · Transformation · Lucidité', 'es-ES': 'Profundidad · Transformación · Perspicacia' },
    forecast: { 'zh-CN': '冥王星水瓶带来对权力结构的深度洞察，今日适合挖掘隐藏的动机与模式。', 'en-US': 'Hidden patterns are easier to sense. Use that insight for transformation, not control.', 'fr-FR': 'Les schémas cachés se perçoivent plus facilement. Utilisez cette lucidité pour transformer, non pour contrôler.', 'es-ES': 'Los patrones ocultos se perciben mejor. Usa esa lucidez para transformar, no para controlar.' },
    colorName: { 'zh-CN': '深红', 'en-US': 'Dark red', 'fr-FR': 'Rouge sombre', 'es-ES': 'Rojo oscuro' },
    lucky: 9,
  },
  {
    nameKey: 'zodiac.sagittarius',
    start: [11, 23],
    end: [12, 21],
    guardian: { 'zh-CN': '木星', 'en-US': 'Jupiter', 'fr-FR': 'Jupiter', 'es-ES': 'Júpiter' },
    keywords: { 'zh-CN': '自由·探索·智慧', 'en-US': 'Freedom · Exploration · Wisdom', 'fr-FR': 'Liberté · Exploration · Sagesse', 'es-ES': 'Libertad · Exploración · Sabiduría' },
    forecast: { 'zh-CN': '木星金牛为你的哲学探索提供实际支撑，今日适合学习、规划旅行或分享知识。', 'en-US': 'A wider view helps. Learning, planning, or sharing knowledge can reconnect you with meaning.', 'fr-FR': 'Une vision plus large aide. Apprendre, planifier ou transmettre un savoir peut vous reconnecter au sens.', 'es-ES': 'Una mirada más amplia ayuda. Aprender, planear o compartir conocimiento puede reconectarte con el sentido.' },
    colorName: { 'zh-CN': '紫色', 'en-US': 'Purple', 'fr-FR': 'Violet', 'es-ES': 'Morado' },
    lucky: 3,
  },
  {
    nameKey: 'zodiac.capricorn',
    start: [12, 22],
    end: [1, 19],
    guardian: { 'zh-CN': '土星', 'en-US': 'Saturn', 'fr-FR': 'Saturne', 'es-ES': 'Saturno' },
    keywords: { 'zh-CN': '责任·纪律·成就', 'en-US': 'Responsibility · Discipline · Achievement', 'fr-FR': 'Responsabilité · Discipline · Réalisation', 'es-ES': 'Responsabilidad · Disciplina · Logro' },
    forecast: { 'zh-CN': '土星双鱼调和严谨与直觉，今日脚踏实地的行动能推动长期目标前进。', 'en-US': 'Small disciplined steps matter. Long-term work benefits from patience and measured progress.', 'fr-FR': 'Les petits pas disciplinés comptent. Le travail à long terme profite de la patience et d’une progression mesurée.', 'es-ES': 'Los pasos pequeños y disciplinados importan. El trabajo a largo plazo se beneficia de paciencia y avance medido.' },
    colorName: { 'zh-CN': '黑色', 'en-US': 'Black', 'fr-FR': 'Noir', 'es-ES': 'Negro' },
    lucky: 4,
  },
  {
    nameKey: 'zodiac.aquarius',
    start: [1, 20],
    end: [2, 18],
    guardian: { 'zh-CN': '天王星', 'en-US': 'Uranus', 'fr-FR': 'Uranus', 'es-ES': 'Urano' },
    keywords: { 'zh-CN': '创新·独立·人道', 'en-US': 'Innovation · Independence · Humanity', 'fr-FR': 'Innovation · Indépendance · Humanité', 'es-ES': 'Innovación · Independencia · Humanidad' },
    forecast: { 'zh-CN': '天王星金牛激活创新与突破，今日适合构思未来愿景。', 'en-US': 'Original ideas may arrive through unexpected routes. Let innovation stay connected to real human needs.', 'fr-FR': 'Des idées originales peuvent venir par des chemins inattendus. Gardez l’innovation reliée aux besoins humains.', 'es-ES': 'Las ideas originales pueden llegar por caminos inesperados. Mantén la innovación conectada con necesidades humanas reales.' },
    colorName: { 'zh-CN': '蓝色', 'en-US': 'Blue', 'fr-FR': 'Bleu', 'es-ES': 'Azul' },
    lucky: 11,
  },
  {
    nameKey: 'zodiac.pisces',
    start: [2, 19],
    end: [3, 20],
    guardian: { 'zh-CN': '海王星', 'en-US': 'Neptune', 'fr-FR': 'Neptune', 'es-ES': 'Neptuno' },
    keywords: { 'zh-CN': '直觉·同情·梦想', 'en-US': 'Intuition · Compassion · Dreams', 'fr-FR': 'Intuition · Compassion · Rêves', 'es-ES': 'Intuición · Compasión · Sueños' },
    forecast: { 'zh-CN': '海王星在你的星座深化灵性感知，今日适合冥想、艺术或帮助他人。', 'en-US': 'Sensitivity and imagination deepen. Art, rest, and compassionate action can bring quiet clarity.', 'fr-FR': 'Sensibilité et imagination s’approfondissent. Art, repos et compassion peuvent apporter une clarté douce.', 'es-ES': 'La sensibilidad y la imaginación se profundizan. Arte, descanso y compasión pueden traer claridad suave.' },
    colorName: { 'zh-CN': '海蓝', 'en-US': 'Sea blue', 'fr-FR': 'Bleu marin', 'es-ES': 'Azul marino' },
    lucky: 7,
  },
];

const PLANETS: PlanetPosition[] = [
  { name: { 'zh-CN': '太阳', 'en-US': 'Sun', 'fr-FR': 'Soleil', 'es-ES': 'Sol' }, symbol: '☀', signKey: 'zodiac.gemini', deg: "3°42'" },
  { name: { 'zh-CN': '月亮', 'en-US': 'Moon', 'fr-FR': 'Lune', 'es-ES': 'Luna' }, symbol: '☽', signKey: 'zodiac.libra', deg: "12°17'" },
  { name: { 'zh-CN': '水星', 'en-US': 'Mercury', 'fr-FR': 'Mercure', 'es-ES': 'Mercurio' }, symbol: '☿', signKey: 'zodiac.gemini', deg: "18°33'" },
  { name: { 'zh-CN': '金星', 'en-US': 'Venus', 'fr-FR': 'Vénus', 'es-ES': 'Venus' }, symbol: '♀', signKey: 'zodiac.cancer', deg: "27°09'" },
  { name: { 'zh-CN': '火星', 'en-US': 'Mars', 'fr-FR': 'Mars', 'es-ES': 'Marte' }, symbol: '♂', signKey: 'zodiac.aries', deg: "10°55'" },
  { name: { 'zh-CN': '木星', 'en-US': 'Jupiter', 'fr-FR': 'Jupiter', 'es-ES': 'Júpiter' }, symbol: '♃', signKey: 'zodiac.taurus', deg: "22°41'" },
  { name: { 'zh-CN': '土星', 'en-US': 'Saturn', 'fr-FR': 'Saturne', 'es-ES': 'Saturno' }, symbol: '♄', signKey: 'zodiac.pisces', deg: "19°28'" },
  { name: { 'zh-CN': '天王星', 'en-US': 'Uranus', 'fr-FR': 'Uranus', 'es-ES': 'Urano' }, symbol: '♅', signKey: 'zodiac.taurus', deg: "24°11'" },
  { name: { 'zh-CN': '海王星', 'en-US': 'Neptune', 'fr-FR': 'Neptune', 'es-ES': 'Neptuno' }, symbol: '♆', signKey: 'zodiac.pisces', deg: "29°36'" },
  { name: { 'zh-CN': '冥王星', 'en-US': 'Pluto', 'fr-FR': 'Pluton', 'es-ES': 'Plutón' }, symbol: '♇', signKey: 'zodiac.aquarius', deg: "1°45'" },
];

const MOON_PHASE_KEYS: TranslationKey[] = [
  'moon.phase.new',
  'moon.phase.waxingCrescent',
  'moon.phase.firstQuarter',
  'moon.phase.waxingGibbous',
  'moon.phase.full',
  'moon.phase.waningGibbous',
  'moon.phase.lastQuarter',
  'moon.phase.waningCrescent',
];

const MOON_SYMBOLS = ['🌑', '🌒', '🌓', '🌔', '🌕', '🌖', '🌗', '🌘'];

const MOON_INFLUENCES: Array<LocalizedText> = [
  { 'zh-CN': '新月：播种意图，开始新计划，设定月度目标。', 'en-US': 'New Moon: set intentions, begin new plans, and define the next cycle.', 'fr-FR': 'Nouvelle lune : posez vos intentions, démarrez un nouveau cycle et clarifiez vos objectifs.', 'es-ES': 'Luna nueva: establece intenciones, inicia nuevos planes y define el próximo ciclo.' },
  { 'zh-CN': '娥眉月：采取行动，推进计划，积累动能。', 'en-US': 'Waxing Crescent: take the first steps and build momentum.', 'fr-FR': 'Premier croissant : faites les premiers pas et accumulez de l’élan.', 'es-ES': 'Luna creciente: da los primeros pasos y acumula impulso.' },
  { 'zh-CN': '上弦月：克服阻力，决策行动，调整方向。', 'en-US': 'First Quarter: meet resistance, choose your action, and adjust direction.', 'fr-FR': 'Premier quartier : affrontez les résistances, choisissez l’action et ajustez la direction.', 'es-ES': 'Cuarto creciente: enfrenta resistencias, elige una acción y ajusta el rumbo.' },
  { 'zh-CN': '盈凸月：完善细节，评估进展，增强努力。', 'en-US': 'Waxing Gibbous: refine details, assess progress, and strengthen effort.', 'fr-FR': 'Gibbeuse croissante : affinez les détails, évaluez les progrès et renforcez l’effort.', 'es-ES': 'Gibosa creciente: afina detalles, evalúa avances y refuerza el esfuerzo.' },
  { 'zh-CN': '满月：释放与完成，情感高涨，显化达顶峰。', 'en-US': 'Full Moon: release, complete, and notice what has reached visibility.', 'fr-FR': 'Pleine lune : libérez, achevez et observez ce qui devient visible.', 'es-ES': 'Luna llena: libera, completa y observa lo que se vuelve visible.' },
  { 'zh-CN': '亏凸月：感恩与分享，整合所学的智慧。', 'en-US': 'Waning Gibbous: give thanks, share insight, and integrate what was learned.', 'fr-FR': 'Gibbeuse décroissante : remerciez, partagez et intégrez l’apprentissage.', 'es-ES': 'Gibosa menguante: agradece, comparte e integra lo aprendido.' },
  { 'zh-CN': '下弦月：放手清理，反思过往，内观沉淀。', 'en-US': 'Last Quarter: release, review, and simplify what no longer serves.', 'fr-FR': 'Dernier quartier : relâchez, faites le point et simplifiez ce qui n’aide plus.', 'es-ES': 'Cuarto menguante: suelta, revisa y simplifica lo que ya no ayuda.' },
  { 'zh-CN': '残月：休息更新，清空空间，准备新周期。', 'en-US': 'Waning Crescent: rest, clear space, and prepare quietly for renewal.', 'fr-FR': 'Dernier croissant : reposez-vous, libérez de l’espace et préparez le renouveau.', 'es-ES': 'Luna menguante: descansa, despeja espacio y prepara la renovación.' },
];

function pickText(text: LocalizedText, locale: Locale): string {
  return text[locale] ?? text['en-US'];
}

function getMonthMoonPhases(year: number, month: number) {
  const knownNewMoon = new Date('2024-01-11');
  const result: Array<{ day: number; phaseIdx: number }> = [];
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

export function ZodiacCalendarPage() {
  const { locale, t } = useI18n();
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const today = now.getDate();
  const [zodiacIdx, setZodiacIdx] = useState(() => getCurrentZodiacIdx());
  const [selectedMoonDay, setSelectedMoonDay] = useState(today);
  const sign = ZODIAC_DATA[zodiacIdx];
  const monthPhases = getMonthMoonPhases(year, month);
  const firstDayOffset = (new Date(year, month - 1, 1).getDay() + 6) % 7;
  const moonCalendarCells = [
    ...Array.from({ length: firstDayOffset }, () => null),
    ...monthPhases,
  ];
  const selectedMoon = monthPhases.find(p => p.day === selectedMoonDay) ?? monthPhases.find(p => p.day === today) ?? monthPhases[0];
  const selectedPhaseIdx = selectedMoon?.phaseIdx ?? 0;
  const energy = 3;
  const monthFormatter = new Intl.DateTimeFormat(locale, { year: 'numeric', month: 'long' });
  const dayFormatter = new Intl.DateTimeFormat(locale, { month: 'short', day: 'numeric' });
  const weekdayFormatter = new Intl.DateTimeFormat(locale, { weekday: 'short' });
  const dateStr = monthFormatter.format(now);
  const weekdayLabels = Array.from({ length: 7 }, (_, index) => weekdayFormatter.format(new Date(2024, 0, index + 1)));

  return (
    <div className="page">
      <div className="zodiac-layout">
        <aside className="side-panel">
          <div className="moon-calendar">
            <div className="moon-cal-title">{t('calendar.moonCalendar')}</div>
            <div className="moon-cal-month">{dateStr}</div>
            <div className="moon-calendar-mini">
              <div className="moon-weekdays" aria-hidden="true">
                {weekdayLabels.map(day => <span key={day}>{day}</span>)}
              </div>
              <div className="moon-month-grid">
                {moonCalendarCells.map((cell, index) => {
                  if (!cell) {
                    return <span key={`empty-${index}`} className="moon-day-cell empty" />;
                  }

                  const phaseName = t(MOON_PHASE_KEYS[cell.phaseIdx]);
                  const cellDate = new Date(year, month - 1, cell.day);
                  const isToday = cell.day === today;
                  const isSelected = cell.day === selectedMoonDay;

                  return (
                    <button
                      key={cell.day}
                      type="button"
                      className={`moon-day-cell${isToday ? ' today' : ''}${isSelected ? ' selected' : ''}`}
                      title={`${dayFormatter.format(cellDate)} · ${phaseName}`}
                      aria-label={`${dayFormatter.format(cellDate)} · ${phaseName}`}
                      onClick={() => setSelectedMoonDay(cell.day)}
                    >
                      <span className="moon-day-number">{cell.day}</span>
                      <span className="moon-day-icon">{MOON_SYMBOLS[cell.phaseIdx]}</span>
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="moon-selected-detail">
              <div className="moon-selected-date">
                {dayFormatter.format(new Date(year, month - 1, selectedMoon?.day ?? today))}
              </div>
              <div className="moon-selected-phase">
                <span>{MOON_SYMBOLS[selectedPhaseIdx]}</span>
                {t(MOON_PHASE_KEYS[selectedPhaseIdx])}
              </div>
            </div>
            <div className="moon-influence">
              <span style={{ color: 'var(--gold)', fontWeight: 600 }}>{t('calendar.moonInfluence')}:</span>
              <br />{pickText(MOON_INFLUENCES[selectedPhaseIdx], locale)}
            </div>
          </div>
        </aside>

        <div className="zodiac-center">
          <div className="gold-heading">{dateStr}</div>

          <div className="zodiac-wheel-container" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.2rem', width: '100%', maxWidth: '420px', margin: '0 auto', padding: '2rem 0' }}>
            {ZODIAC_DATA.map((item, i) => {
              const isActive = i === zodiacIdx;
              return (
                <div key={item.nameKey} className={`zodiac-grid-item ${isActive ? 'active' : ''}`} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.6rem', cursor: 'pointer', opacity: isActive ? 1 : 0.4, transition: 'all 0.4s ease', transform: isActive ? 'scale(1.1)' : 'scale(1)' }} onClick={() => setZodiacIdx(i)}>
                  <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundImage: `url(${ZODIAC_COIN_SHEET})`, backgroundPosition: ZODIAC_SPRITE_POSITIONS[i], backgroundSize: '400% 300%', boxShadow: isActive ? '0 0 20px rgba(201, 168, 76, 0.6), 0 0 0 2px rgba(232, 200, 112, 0.8)' : '0 0 10px rgba(201, 168, 76, 0.18)' }} />
                  <span style={{ fontSize: '0.75rem', color: isActive ? 'var(--gold-bright)' : 'var(--text-muted)', textAlign: 'center', fontFamily: 'var(--font-zh)' }}>{t(item.nameKey)}</span>
                </div>
              );
            })}
          </div>

          <div className="zodiac-energy">
            <span style={{ color: 'var(--text-muted)' }}>{t('calendar.currentEnergy')}</span>
            <div className="energy-dots">
              {[1,2,3,4,5].map(i => (
                <div key={i} className={`energy-dot${i <= energy ? ' active' : ''}`} />
              ))}
            </div>
            <span style={{ color: 'var(--gold)' }}>{t('today.energyMedium')}</span>
          </div>
        </div>

        <aside className="side-panel right">
          <div className="daily-reading-panel">
            <div className="daily-sign-header">
              <div className="daily-sign-sym" style={{ width: '80px', height: '80px', margin: '0 auto', borderRadius: '50%', backgroundImage: `url(${ZODIAC_COIN_SHEET})`, backgroundPosition: ZODIAC_SPRITE_POSITIONS[zodiacIdx], backgroundSize: '400% 300%', boxShadow: '0 0 15px rgba(201, 168, 76, 0.3)' }}></div>
              <div className="daily-sign-name">{t(sign.nameKey)}</div>
              <div className="daily-keywords">{pickText(sign.keywords, locale)}</div>
              <div className="daily-planet">{t('today.guardian')}: {pickText(sign.guardian, locale)}</div>
            </div>

            <div>
              <div className="guidance-reading-label">{t('calendar.planetPositions')}</div>
              <div className="planet-list">
                {PLANETS.map((planet, i) => (
                  <div key={i} className="planet-item">
                    <span className="planet-name">{planet.symbol} {pickText(planet.name, locale)}</span>
                    <span className="planet-pos">{t(planet.signKey)} {planet.deg}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="daily-forecast">{pickText(sign.forecast, locale)}</div>

            <div className="daily-lucky">
              <div className="lucky-item">{t('today.luckyColor')}: <span>{pickText(sign.colorName, locale)}</span></div>
              <div className="lucky-item">{t('today.luckyNumber')}: <span>{sign.lucky}</span></div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}