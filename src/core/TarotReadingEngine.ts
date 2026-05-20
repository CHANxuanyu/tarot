import { majorArcanaMeaningByNumber, type QuestionResponses, type TarotCardMeaning } from '../data/majorArcanaMeanings';
import type { DrawnCard } from './types';
import type { Locale } from '../i18n';

export type QuestionDomain =
  | 'general'
  | 'relationship'
  | 'career'
  | 'study'
  | 'money'
  | 'decision'
  | 'selfGrowth';

export type CardOrientation = 'upright' | 'reversed';
export type ThreeCardPositionRole = 'past' | 'present' | 'future' | 'unknown';
export type CelticCrossPositionRole =
  | 'present'
  | 'challenge'
  | 'foundation'
  | 'past'
  | 'conscious'
  | 'nearFuture'
  | 'self'
  | 'environment'
  | 'hopesFears'
  | 'outcome'
  | 'unknown';

export type SingleCardReport = {
  domain: QuestionDomain;
  orientation: CardOrientation;
  card: TarotCardMeaning;
  identity: {
    archetype: string;
    element: TarotCardMeaning['element'];
    astrology: string;
    mythicAssociation: string[];
  };
  keywords: string[];
  symbols: string[];
  sections: {
    essence: string;
    questionResponse: string;
    hiddenReminder: string;
    actionAdvice: string;
    quote: string;
  };
};

export type ThreeCardReport = {
  domain: QuestionDomain;
  cards: Array<{
    positionName: string;
    positionRole: ThreeCardPositionRole;
    cardNameZh: string;
    cardNameEn: string;
    orientation: CardOrientation;
    keywords: string[];
    shortReading: string;
    roleReading: string;
  }>;
  storyline: string;
  hiddenReminder: string;
  actionAdvice: string;
  quote: string;
};

export type CelticCrossReport = {
  domain: QuestionDomain;
  overview: string;
  cards: Array<{
    positionName: string;
    positionRole: CelticCrossPositionRole;
    cardNameZh: string;
    cardNameEn: string;
    orientation: CardOrientation;
    keywords: string[];
    shortReading: string;
    positionReading: string;
  }>;
  sections: {
    coreConflict: string;
    deepCause: string;
    consciousDirection: string;
    selfAndEnvironment: string;
    emotionalTension: string;
    futureTrend: string;
    finalAdvice: string;
    quote: string;
  };
};

type BuildSingleCardReportInput = {
  drawn: DrawnCard;
  question?: string;
  locale?: Locale;
};

type BuildThreeCardReportInput = {
  drawnCards: DrawnCard[];
  question?: string;
  locale?: Locale;
};

type BuildCelticCrossReportInput = {
  drawnCards: DrawnCard[];
  question?: string;
  locale?: Locale;
};

const DOMAIN_KEYWORDS: Record<Exclude<QuestionDomain, 'general'>, string[]> = {
  relationship: [
    '感情', '爱情', '喜欢', '爱', '恋爱', '关系', '复合', '前任', '暧昧', '伴侣', '对象', '男友', '女友',
    '老公', '老婆', '婚姻', '结婚', '分手', '他', '她', 'ta', 'love', 'relationship', 'partner', 'dating', 'marriage', 'romance', 'breakup',
    'amour', 'relation', 'couple', 'partenaire', 'mariage', 'romance', 'rupture',
    'ex', 'sentiments', 'attirance',
    'amor', 'relación', 'relacion', 'pareja', 'matrimonio', 'romance', 'ruptura',
    'ex', 'sentimientos', 'atracción', 'atraccion',
  ],
  career: [
    '工作', '事业', '职业', '职场', '跳槽', '面试', '老板', '同事', '项目', 'offer', '升职', '离职',
    '创业', '岗位', '公司', '客户', '合作', 'work', 'career', 'job', 'interview', 'boss', 'project', 'promotion', 'business', 'client',
    'travail', 'carrière', 'carriere', 'emploi', 'entretien', 'patron', 'projet', 'promotion', 'entreprise',
    'offre', 'stage', 'collègue', 'collegue',
    'trabajo', 'carrera', 'empleo', 'entrevista', 'jefe', 'proyecto', 'ascenso', 'empresa',
    'oferta', 'prácticas', 'practicas', 'colega',
  ],
  study: [
    '学习', '考试', '考研', '考公', '论文', '学校', '课程', '作业', '成绩', '证书', '读书', '复习',
    '专业', '毕业', '留学', 'study', 'exam', 'school', 'course', 'homework', 'grade', 'certificate', 'university', 'thesis',
    'étude', 'etude', 'examen', 'école', 'ecole', 'cours', 'devoir', 'université', 'universite', 'mémoire',
    'note',
    'estudio', 'examen', 'escuela', 'curso', 'tarea', 'universidad', 'tesis',
    'nota',
  ],
  money: [
    '钱', '财富', '财运', '收入', '工资', '投资', '理财', '消费', '债务', '借钱', '还款', '预算',
    '资产', '亏损', '赚钱', 'money', 'earn', 'income', 'salary', 'wealth', 'investment', 'profit', 'finance',
    'argent', 'gagner', 'revenu', 'salaire', 'richesse', 'investissement', 'finance',
    'dinero', 'ganar', 'ingresos', 'salario', 'riqueza', 'inversión', 'inversion', 'finanzas',
  ],
  decision: [
    '是否', '要不要', '该不该', '能不能', '可不可以', '选择', '决定', '怎么办', '还是', '哪个',
    '适合吗', '会不会', 'should', 'whether', 'decision', 'choose', 'choice', 'can i', 'is it right',
    'devrais', 'décision', 'decision', 'choisir', 'choix', 'est-ce que', 'puis-je',
    'devrais-je', 'hésiter', 'hesiter',
    'debería', 'deberia', 'decisión', 'decision', 'elegir', 'elección', 'eleccion', 'puedo',
    'si debo', 'dudar',
  ],
  selfGrowth: [
    '自己', '内心', '成长', '状态', '迷茫', '方向', '焦虑', '情绪', '疗愈', '能量', '人生',
    '未来', '自我', '困惑', '改变', 'self', 'growth', 'anxiety', 'emotion', 'healing', 'energy', 'life', 'change', 'direction',
    'moi', 'croissance', 'anxiété', 'anxiete', 'émotion', 'emotion', 'guérison', 'guerison', 'énergie', 'energie', 'vie',
    'état intérieur', 'etat interieur', 'confusion',
    'yo', 'crecimiento', 'ansiedad', 'emoción', 'emocion', 'sanación', 'sanacion', 'energía', 'energia', 'vida',
    'estado interior', 'confusión', 'confusion',
  ],
};

const DOMAIN_PRIORITY: QuestionDomain[] = [
  'money',
  'relationship',
  'career',
  'study',
  'selfGrowth',
  'decision',
  'general',
];


const ELEMENT_LABELS: Record<string, Record<Locale, string>> = {
  '火': { 'zh-CN': '火', 'en-US': 'Fire', 'fr-FR': 'Feu', 'es-ES': 'Fuego' },
  '水': { 'zh-CN': '水', 'en-US': 'Water', 'fr-FR': 'Eau', 'es-ES': 'Agua' },
  '风': { 'zh-CN': '风', 'en-US': 'Air', 'fr-FR': 'Air', 'es-ES': 'Aire' },
  '土': { 'zh-CN': '土', 'en-US': 'Earth', 'fr-FR': 'Terre', 'es-ES': 'Tierra' },
  '灵性': { 'zh-CN': '灵性', 'en-US': 'Spirit', 'fr-FR': 'Esprit', 'es-ES': 'Espíritu' },
};

const ASTROLOGY_LABELS: Record<string, Record<Locale, string>> = {
  '太阳': { 'zh-CN': '太阳', 'en-US': 'Sun', 'fr-FR': 'Soleil', 'es-ES': 'Sol' },
  '月亮': { 'zh-CN': '月亮', 'en-US': 'Moon', 'fr-FR': 'Lune', 'es-ES': 'Luna' },
  '水星': { 'zh-CN': '水星', 'en-US': 'Mercury', 'fr-FR': 'Mercure', 'es-ES': 'Mercurio' },
  '金星': { 'zh-CN': '金星', 'en-US': 'Venus', 'fr-FR': 'Vénus', 'es-ES': 'Venus' },
  '火星': { 'zh-CN': '火星', 'en-US': 'Mars', 'fr-FR': 'Mars', 'es-ES': 'Mars' },
  '木星': { 'zh-CN': '木星', 'en-US': 'Jupiter', 'fr-FR': 'Jupiter', 'es-ES': 'Jupiter' },
  '土星': { 'zh-CN': '土星', 'en-US': 'Saturn', 'fr-FR': 'Saturne', 'es-ES': 'Saturno' },
  '天王星': { 'zh-CN': '天王星', 'en-US': 'Uranus', 'fr-FR': 'Uranus', 'es-ES': 'Uranus' },
  '海王星': { 'zh-CN': '海王星', 'en-US': 'Neptune', 'fr-FR': 'Neptune', 'es-ES': 'Neptune' },
  '冥王星': { 'zh-CN': '冥王星', 'en-US': 'Pluto', 'fr-FR': 'Pluton', 'es-ES': 'Plutón' },
  '白羊座': { 'zh-CN': '白羊座', 'en-US': 'Aries', 'fr-FR': 'Bélier', 'es-ES': 'Aries' },
  '金牛座': { 'zh-CN': '金牛座', 'en-US': 'Taurus', 'fr-FR': 'Taureau', 'es-ES': 'Tauro' },
  '双子座': { 'zh-CN': '双子座', 'en-US': 'Gemini', 'fr-FR': 'Gémeaux', 'es-ES': 'Géminis' },
  '巨蟹座': { 'zh-CN': '巨蟹座', 'en-US': 'Cancer', 'fr-FR': 'Cancer', 'es-ES': 'Cancer' },
  '狮子座': { 'zh-CN': '狮子座', 'en-US': 'Leo', 'fr-FR': 'Lion', 'es-ES': 'Leo' },
  '处女座': { 'zh-CN': '处女座', 'en-US': 'Virgo', 'fr-FR': 'Vierge', 'es-ES': 'Virgo' },
  '天秤座': { 'zh-CN': '天秤座', 'en-US': 'Libra', 'fr-FR': 'Balance', 'es-ES': 'Libra' },
  '天蝎座': { 'zh-CN': '天蝎座', 'en-US': 'Scorpio', 'fr-FR': 'Scorpion', 'es-ES': 'Escorpio' },
  '射手座': { 'zh-CN': '射手座', 'en-US': 'Sagittarius', 'fr-FR': 'Sagittaire', 'es-ES': 'Sagitario' },
  '摩羯座': { 'zh-CN': '摩羯座', 'en-US': 'Capricorn', 'fr-FR': 'Capricorne', 'es-ES': 'Capricornio' },
  '水瓶座': { 'zh-CN': '水瓶座', 'en-US': 'Aquarius', 'fr-FR': 'Verseau', 'es-ES': 'Acuario' },
  '双鱼座': { 'zh-CN': '双鱼座', 'en-US': 'Pisces', 'fr-FR': 'Poissons', 'es-ES': 'Piscis' },
};

function localizeAstrology(astrology: string, locale: Locale): string {
  if (locale === 'zh-CN') return astrology;

  return astrology
    .split(/([、，,／/\\s]+)/)
    .map(part => ASTROLOGY_LABELS[part]?.[locale] ?? part)
    .join('');
}

const DOMAIN_CONTEXT: Record<QuestionDomain, Record<Locale, string>> = {
  general: { 'zh-CN': '整体能量', 'en-US': 'general energy', 'fr-FR': 'énergie générale', 'es-ES': 'energía general' },
  relationship: { 'zh-CN': '关系议题', 'en-US': 'relationship matters', 'fr-FR': 'questions relationnelles', 'es-ES': 'temas de relación' },
  career: { 'zh-CN': '事业议题', 'en-US': 'career matters', 'fr-FR': 'questions professionnelles', 'es-ES': 'temas profesionales' },
  study: { 'zh-CN': '学习议题', 'en-US': 'study matters', 'fr-FR': 'questions d’étude', 'es-ES': 'temas de estudio' },
  money: { 'zh-CN': '财富议题', 'en-US': 'money and resources', 'fr-FR': 'argent et ressources', 'es-ES': 'dinero y recursos' },
  decision: { 'zh-CN': '选择议题', 'en-US': 'decision-making', 'fr-FR': 'prise de décision', 'es-ES': 'toma de decisiones' },
  selfGrowth: { 'zh-CN': '自我成长', 'en-US': 'self-growth', 'fr-FR': 'croissance personnelle', 'es-ES': 'crecimiento personal' },
};

const MAJOR_ARCANA_EN: Record<number, { archetype: string; element: string; astrology: string; mythicAssociation: string[]; keywords: { upright: string[]; reversed: string[] }; symbols: string[] }> = {
  0: { archetype: 'The Sacred Wanderer', element: 'Air', astrology: 'Uranus', mythicAssociation: ['Dionysus', 'Hermes', 'The Holy Fool'], keywords: { upright: ['beginning', 'freedom', 'trust', 'adventure', 'possibility', 'innocence'], reversed: ['recklessness', 'hesitation', 'avoidance', 'scattered focus', 'immaturity', 'risk'] }, symbols: ['cliff', 'white dog', 'white rose', 'traveler’s bundle', 'sun'] },
  1: { archetype: 'The Manifestor', element: 'Air', astrology: 'Mercury', mythicAssociation: ['Hermes', 'Thoth', 'The Alchemist'], keywords: { upright: ['manifestation', 'will', 'communication', 'resources', 'creation', 'focus'], reversed: ['manipulation', 'dispersion', 'empty performance', 'misused skill', 'deception', 'spinning wheels'] }, symbols: ['wand', 'cup', 'sword', 'pentacle', 'infinity sign', 'roses'] },
  2: { archetype: 'Guardian of the Unconscious', element: 'Water', astrology: 'Moon', mythicAssociation: ['Isis', 'Persephone', 'Hecate'], keywords: { upright: ['intuition', 'subconscious', 'silence', 'secrecy', 'inner wisdom', 'waiting'], reversed: ['distorted secrecy', 'blocked intuition', 'repression', 'confusion', 'over-hiding', 'self-deception'] }, symbols: ['black and white pillars', 'scroll', 'crescent moon', 'pomegranate veil', 'still water'] },
};

const LOCALIZED_MAJOR_NAMES: Record<number, Record<Locale, string>> = {
  0: { 'zh-CN': '愚者', 'en-US': 'The Fool', 'fr-FR': 'Le Mat', 'es-ES': 'El Loco' },
  1: { 'zh-CN': '魔术师', 'en-US': 'The Magician', 'fr-FR': 'Le Magicien', 'es-ES': 'El Mago' },
  2: { 'zh-CN': '女祭司', 'en-US': 'The High Priestess', 'fr-FR': 'La Papesse', 'es-ES': 'La Suma Sacerdotisa' },
  3: { 'zh-CN': '女皇', 'en-US': 'The Empress', 'fr-FR': 'L’Impératrice', 'es-ES': 'La Emperatriz' },
  4: { 'zh-CN': '皇帝', 'en-US': 'The Emperor', 'fr-FR': 'L’Empereur', 'es-ES': 'El Emperador' },
  5: { 'zh-CN': '教皇', 'en-US': 'The Hierophant', 'fr-FR': 'Le Pape', 'es-ES': 'El Hierofante' },
  6: { 'zh-CN': '恋人', 'en-US': 'The Lovers', 'fr-FR': 'Les Amoureux', 'es-ES': 'Los Enamorados' },
  7: { 'zh-CN': '战车', 'en-US': 'The Chariot', 'fr-FR': 'Le Chariot', 'es-ES': 'El Carro' },
  8: { 'zh-CN': '力量', 'en-US': 'Strength', 'fr-FR': 'La Force', 'es-ES': 'La Fuerza' },
  9: { 'zh-CN': '隐士', 'en-US': 'The Hermit', 'fr-FR': 'L’Ermite', 'es-ES': 'El Ermitaño' },
  10: { 'zh-CN': '命运之轮', 'en-US': 'Wheel of Fortune', 'fr-FR': 'La Roue de Fortune', 'es-ES': 'La Rueda de la Fortuna' },
  11: { 'zh-CN': '正义', 'en-US': 'Justice', 'fr-FR': 'La Justice', 'es-ES': 'La Justicia' },
  12: { 'zh-CN': '倒吊人', 'en-US': 'The Hanged Man', 'fr-FR': 'Le Pendu', 'es-ES': 'El Colgado' },
  13: { 'zh-CN': '死神', 'en-US': 'Death', 'fr-FR': 'La Mort', 'es-ES': 'La Muerte' },
  14: { 'zh-CN': '节制', 'en-US': 'Temperance', 'fr-FR': 'Tempérance', 'es-ES': 'La Templanza' },
  15: { 'zh-CN': '恶魔', 'en-US': 'The Devil', 'fr-FR': 'Le Diable', 'es-ES': 'El Diablo' },
  16: { 'zh-CN': '塔', 'en-US': 'The Tower', 'fr-FR': 'La Maison Dieu', 'es-ES': 'La Torre' },
  17: { 'zh-CN': '星星', 'en-US': 'The Star', 'fr-FR': 'L’Étoile', 'es-ES': 'La Estrella' },
  18: { 'zh-CN': '月亮', 'en-US': 'The Moon', 'fr-FR': 'La Lune', 'es-ES': 'La Luna' },
  19: { 'zh-CN': '太阳', 'en-US': 'The Sun', 'fr-FR': 'Le Soleil', 'es-ES': 'El Sol' },
  20: { 'zh-CN': '审判', 'en-US': 'Judgement', 'fr-FR': 'Le Jugement', 'es-ES': 'El Juicio' },
  21: { 'zh-CN': '世界', 'en-US': 'The World', 'fr-FR': 'Le Monde', 'es-ES': 'El Mundo' },
};

function sentence(locale: Locale, zh: string, en: string, fr: string, es: string): string {
  if (locale === 'en-US') return en;
  if (locale === 'fr-FR') return fr;
  if (locale === 'es-ES') return es;
  return zh;
}

function localizeCard(card: TarotCardMeaning, locale: Locale): TarotCardMeaning {
  if (locale === 'zh-CN') return card;
  const en = MAJOR_ARCANA_EN[card.number];
  const suffix = DOMAIN_CONTEXT.general[locale];
  const localizedName = LOCALIZED_MAJOR_NAMES[card.number]?.[locale] ?? card.nameEn;
  return {
    ...card,
    nameZh: localizedName,
    archetype: en?.archetype ?? localizedName,
    element: (ELEMENT_LABELS[card.element]?.[locale] ?? card.element) as TarotCardMeaning['element'],
    astrology: en?.astrology ?? localizeAstrology(card.astrology, locale),
    mythicAssociation: en?.mythicAssociation ?? [localizedName],
    keywords: en?.keywords ?? {
      upright: [sentence(locale, '', 'clarity', 'clarté', 'claridad'), sentence(locale, '', 'movement', 'mouvement', 'movimiento'), suffix],
      reversed: [sentence(locale, '', 'blockage', 'blocage', 'bloqueo'), sentence(locale, '', 'reflection', 'réflexion', 'reflexión'), suffix],
    },
    symbols: en?.symbols ?? [localizedName, suffix],
    essence: {
      upright: sentence(locale, card.essence.upright, `${card.nameEn} highlights a constructive archetypal force within ${suffix}. It invites you to read the situation through its central lesson rather than seek a fixed prediction.`, `${card.nameEn} met en lumière une force archétypale constructive dans ${suffix}. Elle vous invite à lire la situation par sa leçon centrale plutôt qu’à chercher une prédiction figée.`, `${card.nameEn} ilumina una fuerza arquetípica constructiva dentro de ${suffix}. Te invita a leer la situación desde su lección central, no como una predicción fija.`),
      reversed: sentence(locale, card.essence.reversed, `Reversed, ${card.nameEn} points to a blocked or imbalanced expression of ${suffix}. The card asks for adjustment, patience, and a clearer relationship with reality.`, `Renversée, ${card.nameEn} indique une expression bloquée ou déséquilibrée de ${suffix}. La carte demande ajustement, patience et un rapport plus clair à la réalité.`, `Invertida, ${card.nameEn} señala una expresión bloqueada o desequilibrada de ${suffix}. La carta pide ajuste, paciencia y una relación más clara con la realidad.`),
    },
    questionResponses: Object.fromEntries(Object.entries(card.questionResponses).map(([domain]) => [domain, {
      upright: sentence(locale, '', `For ${DOMAIN_CONTEXT[domain as QuestionDomain]?.[locale] ?? suffix}, this card suggests moving with awareness, using the card’s strengths without forcing certainty.`, `Pour ${DOMAIN_CONTEXT[domain as QuestionDomain]?.[locale] ?? suffix}, cette carte conseille d’avancer avec conscience, en utilisant ses forces sans forcer la certitude.`, `Para ${DOMAIN_CONTEXT[domain as QuestionDomain]?.[locale] ?? suffix}, esta carta sugiere avanzar con conciencia, usando sus fortalezas sin forzar certezas.`),
      reversed: sentence(locale, '', `For ${DOMAIN_CONTEXT[domain as QuestionDomain]?.[locale] ?? suffix}, the priority is to notice what is blocked, exaggerated, or avoided before making a firm move.`, `Pour ${DOMAIN_CONTEXT[domain as QuestionDomain]?.[locale] ?? suffix}, la priorité est de voir ce qui est bloqué, exagéré ou évité avant d’agir fermement.`, `Para ${DOMAIN_CONTEXT[domain as QuestionDomain]?.[locale] ?? suffix}, la prioridad es ver qué está bloqueado, exagerado o evitado antes de actuar con firmeza.`),
    }])) as QuestionResponses,
    hiddenReminder: {
      upright: sentence(locale, card.hiddenReminder.upright, 'The card is guidance, not a verdict; your next conscious action still matters.', 'La carte guide, elle ne condamne pas ; votre prochain acte conscient compte encore.', 'La carta orienta, no sentencia; tu próxima acción consciente sigue siendo importante.'),
      reversed: sentence(locale, card.hiddenReminder.reversed, 'A reversal is not failure; it marks the place where attention and honesty are needed.', 'Une carte renversée n’est pas un échec ; elle indique l’endroit qui demande attention et honnêteté.', 'Una carta invertida no es fracaso; señala dónde hacen falta atención y honestidad.'),
    },
    actionAdvice: {
      upright: sentence(locale, card.actionAdvice.upright, 'Choose one grounded next step and observe the feedback before expanding the plan.', 'Choisissez une prochaine étape concrète et observez le retour avant d’élargir le plan.', 'Elige un próximo paso concreto y observa la respuesta antes de ampliar el plan.'),
      reversed: sentence(locale, card.actionAdvice.reversed, 'Pause, clarify the risk, and correct the pattern before committing further energy.', 'Faites une pause, clarifiez le risque et corrigez le schéma avant d’y engager plus d’énergie.', 'Haz una pausa, aclara el riesgo y corrige el patrón antes de invertir más energía.'),
    },
    quote: {
      upright: sentence(locale, card.quote.upright, 'The cards open a mirror; the choice remains alive in your hands.', 'Les cartes ouvrent un miroir ; le choix reste vivant entre vos mains.', 'Las cartas abren un espejo; la elección sigue viva en tus manos.'),
      reversed: sentence(locale, card.quote.reversed, 'What resists you is also showing where consciousness can return.', 'Ce qui résiste montre aussi où la conscience peut revenir.', 'Lo que se resiste también muestra dónde puede volver la conciencia.'),
    },
  };
}


function withLocale(locale: Locale, zh: string, en: string, fr: string, es: string): string {
  return sentence(locale, zh, en, fr, es);
}

function getOrientationText(orientation: CardOrientation, locale: Locale): string {
  if (orientation === 'upright') {
    return withLocale(locale, '正位', 'upright', 'à l’endroit', 'derecha');
  }
  return withLocale(locale, '逆位', 'reversed', 'renversée', 'invertida');
}

function noCardsText(locale: Locale): string {
  return withLocale(locale, '牌面信息不足', 'not enough card information', 'informations de cartes insuffisantes', 'información de cartas insuficiente');
}

function buildThreeRoleReading(
  role: ThreeCardPositionRole,
  singleReport: SingleCardReport,
  locale: Locale
): string {
  const cardName = singleReport.card.nameZh;
  const keyword = singleReport.keywords[0] ?? singleReport.card.archetype;
  const response = singleReport.sections.questionResponse;

  if (role === 'past') {
    return withLocale(
      locale,
      `作为“过去”的位置，${cardName}指出此前留下的${keyword}模式仍在影响此刻：${response}`,
      `In the past position, ${cardName} shows that a pattern of ${keyword} still shapes the present: ${response}`,
      `Dans la position du passé, ${cardName} montre qu’un schéma de ${keyword} influence encore le présent : ${response}`,
      `En la posición del pasado, ${cardName} muestra que un patrón de ${keyword} aún influye en el presente: ${response}`
    );
  }

  if (role === 'present') {
    return withLocale(
      locale,
      `作为“现在”的位置，${cardName}揭示当前真正需要面对的核心状态是${keyword}：${response}`,
      `In the present position, ${cardName} reveals that the core state to face now is ${keyword}: ${response}`,
      `Dans la position du présent, ${cardName} révèle que l’état central à regarder maintenant est ${keyword} : ${response}`,
      `En la posición del presente, ${cardName} revela que el estado central que debes mirar ahora es ${keyword}: ${response}`
    );
  }

  if (role === 'future') {
    return withLocale(
      locale,
      `作为“未来”的位置，${cardName}显示若维持当前趋势，事情可能沿着${keyword}的方向展开：${response}`,
      `In the future position, ${cardName} suggests that if the current pattern continues, events may move toward ${keyword}: ${response}`,
      `Dans la position du futur, ${cardName} indique que si la tendance actuelle continue, les choses peuvent aller vers ${keyword} : ${response}`,
      `En la posición del futuro, ${cardName} sugiere que si la tendencia actual continúa, la situación puede dirigirse hacia ${keyword}: ${response}`
    );
  }

  return withLocale(
    locale,
    `${cardName}在这个位置上提示你关注${keyword}的能量：${response}`,
    `${cardName} asks you to pay attention to the energy of ${keyword} in this position: ${response}`,
    `${cardName} vous invite à observer l’énergie de ${keyword} dans cette position : ${response}`,
    `${cardName} te invita a observar la energía de ${keyword} en esta posición: ${response}`
  );
}

function threeDomainContext(domain: QuestionDomain, locale: Locale): string {
  const contexts: Record<QuestionDomain, Record<Locale, string>> = {
    general: { 'zh-CN': '这组三牌呈现的是整体能量的流动', 'en-US': 'This three-card spread shows the movement of the general energy', 'fr-FR': 'Ce tirage à trois cartes montre le mouvement de l’énergie générale', 'es-ES': 'Esta tirada de tres cartas muestra el movimiento de la energía general' },
    relationship: { 'zh-CN': '这组三牌呈现的是关系能量的演变', 'en-US': 'This three-card spread shows how relationship energy is evolving', 'fr-FR': 'Ce tirage montre l’évolution de l’énergie relationnelle', 'es-ES': 'Esta tirada muestra cómo evoluciona la energía relacional' },
    career: { 'zh-CN': '这组三牌呈现的是事业路径的推进', 'en-US': 'This three-card spread shows how the career path is unfolding', 'fr-FR': 'Ce tirage montre comment le chemin professionnel se déploie', 'es-ES': 'Esta tirada muestra cómo se despliega el camino profesional' },
    study: { 'zh-CN': '这组三牌呈现的是学习状态的转换', 'en-US': 'This three-card spread shows a shift in study energy', 'fr-FR': 'Ce tirage montre une transition dans l’énergie d’étude', 'es-ES': 'Esta tirada muestra un cambio en la energía de estudio' },
    money: { 'zh-CN': '这组三牌呈现的是资源与财务判断的变化', 'en-US': 'This three-card spread shows a shift in resources and financial judgment', 'fr-FR': 'Ce tirage montre une évolution des ressources et du discernement financier', 'es-ES': 'Esta tirada muestra un cambio en los recursos y el criterio financiero' },
    decision: { 'zh-CN': '这组三牌呈现的是选择背后的动态', 'en-US': 'This three-card spread shows the dynamics behind the choice', 'fr-FR': 'Ce tirage montre la dynamique derrière le choix', 'es-ES': 'Esta tirada muestra la dinámica detrás de la elección' },
    selfGrowth: { 'zh-CN': '这组三牌呈现的是内在成长的轨迹', 'en-US': 'This three-card spread shows a path of inner growth', 'fr-FR': 'Ce tirage montre un chemin de croissance intérieure', 'es-ES': 'Esta tirada muestra un camino de crecimiento interior' },
  };
  return contexts[domain][locale];
}

function buildThreeCardStorylineLocalized(
  cards: ThreeCardReport['cards'],
  domain: QuestionDomain,
  locale: Locale
): string {
  const [past, present, future] = cards;
  const context = threeDomainContext(domain, locale);
  if (!past || !present || !future) {
    return withLocale(
      locale,
      `${context}：牌面数量不足以形成完整的过去、现在、未来链路，请以已出现的牌位作为当前阶段提示。`,
      `${context}: there are not enough cards to form a full past-present-future chain. Read the visible positions as guidance for the current phase.`,
      `${context} : il n’y a pas assez de cartes pour former une chaîne complète passé-présent-futur. Lisez les positions visibles comme des repères pour l’étape actuelle.`,
      `${context}: no hay suficientes cartas para formar una cadena completa de pasado-presente-futuro. Lee las posiciones visibles como guía para esta etapa.`
    );
  }
  const reversedCount = cards.filter(card => card.orientation === 'reversed').length;
  const flowTone = reversedCount >= 2
    ? withLocale(locale, '这条路径并非完全顺畅，逆位能量说明你需要先修正内在阻滞，变化才会真正发生', 'The path is not entirely smooth; the reversals point to inner blocks that need adjustment before change can settle.', 'Le chemin n’est pas entièrement fluide ; les cartes renversées indiquent des blocages intérieurs à ajuster avant que le changement ne s’installe.', 'El camino no es del todo fluido; las cartas invertidas señalan bloqueos internos que deben ajustarse antes de que el cambio se asiente.')
    : reversedCount === 1
      ? withLocale(locale, '这条路径中有一个关键阻点，但它也正指出最需要被调整的位置', 'There is one key point of friction, and it shows exactly where adjustment is needed.', 'Un point de friction important apparaît, et il montre précisément où l’ajustement est nécessaire.', 'Hay un punto clave de fricción, y muestra exactamente dónde hace falta ajustar.')
      : withLocale(locale, '这条路径相对连贯，能量正在从经验沉淀走向下一阶段显化', 'The path is relatively coherent; the energy is moving from lived experience toward the next visible stage.', 'Le chemin est relativement cohérent ; l’énergie passe de l’expérience intégrée à la prochaine étape visible.', 'El camino es relativamente coherente; la energía pasa de la experiencia integrada a la próxima etapa visible.');
  return withLocale(
    locale,
    `${context}：过去的${past.cardNameZh}带来${past.keywords[0] ?? past.cardNameZh}的背景，推动你来到现在${present.cardNameZh}所揭示的${present.keywords[0] ?? present.cardNameZh}课题；如果你继续沿着当前方式行动，未来的${future.cardNameZh}会把能量带向${future.keywords[0] ?? future.cardNameZh}。${flowTone}。`,
    `${context}: ${past.cardNameZh} in the past brings a background of ${past.keywords[0] ?? past.cardNameZh}, leading into the present lesson of ${present.keywords[0] ?? present.cardNameZh} shown by ${present.cardNameZh}. If the current pattern continues, ${future.cardNameZh} points the energy toward ${future.keywords[0] ?? future.cardNameZh}. ${flowTone}`,
    `${context} : ${past.cardNameZh} au passé apporte un arrière-plan de ${past.keywords[0] ?? past.cardNameZh}, qui mène à la leçon présente de ${present.keywords[0] ?? present.cardNameZh} montrée par ${present.cardNameZh}. Si la dynamique actuelle continue, ${future.cardNameZh} oriente l’énergie vers ${future.keywords[0] ?? future.cardNameZh}. ${flowTone}`,
    `${context}: ${past.cardNameZh} en el pasado aporta un trasfondo de ${past.keywords[0] ?? past.cardNameZh}, que conduce a la lección presente de ${present.keywords[0] ?? present.cardNameZh} mostrada por ${present.cardNameZh}. Si el patrón actual continúa, ${future.cardNameZh} dirige la energía hacia ${future.keywords[0] ?? future.cardNameZh}. ${flowTone}`
  );
}

export function getMajorArcanaMeaning(cardId: number): TarotCardMeaning | undefined {
  return majorArcanaMeaningByNumber[cardId];
}

export function detectQuestionDomain(question: string): QuestionDomain {
  const normalized = question.trim().toLowerCase();
  if (!normalized) return 'general';

  const scores = new Map<QuestionDomain, number>();

  for (const [domain, keywords] of Object.entries(DOMAIN_KEYWORDS) as Array<[Exclude<QuestionDomain, 'general'>, string[]]>) {
    const score = keywords.reduce((total, keyword) => {
      return normalized.includes(keyword.toLowerCase()) ? total + 1 : total;
    }, 0);
    scores.set(domain, score);
  }

  let bestDomain: QuestionDomain = 'general';
  let bestScore = 0;

  for (const domain of DOMAIN_PRIORITY) {
    const score = scores.get(domain) ?? 0;
    if (score > bestScore) {
      bestDomain = domain;
      bestScore = score;
    }
  }

  return bestDomain;
}

export function buildSingleCardReport({
  drawn,
  question = '',
  locale = 'zh-CN',
}: BuildSingleCardReportInput): SingleCardReport {
  const rawCard = getMajorArcanaMeaning(drawn.card.id);

  if (!rawCard) {
    throw new Error(`Missing Major Arcana meaning for card id: ${drawn.card.id}`);
  }

  const card = localizeCard(rawCard, locale);
  const orientation: CardOrientation = drawn.reversed ? 'reversed' : 'upright';
  const domain = detectQuestionDomain(question);
  const responseSet = card.questionResponses[domain] ?? card.questionResponses.general;

  return {
    domain,
    orientation,
    card,
    identity: {
      archetype: card.archetype,
      element: card.element,
      astrology: card.astrology,
      mythicAssociation: card.mythicAssociation,
    },
    keywords: card.keywords[orientation],
    symbols: card.symbols,
    sections: {
      essence: card.essence[orientation],
      questionResponse: responseSet[orientation],
      hiddenReminder: card.hiddenReminder[orientation],
      actionAdvice: card.actionAdvice[orientation],
      quote: card.quote[orientation],
    },
  };
}

function getThreeCardPositionRole(positionName: string, index: number): ThreeCardPositionRole {
  const normalized = positionName.trim().toLowerCase();

  if (normalized.includes('过去') || normalized.includes('past')) return 'past';
  if (normalized.includes('现在') || normalized.includes('当下') || normalized.includes('present')) return 'present';
  if (normalized.includes('未来') || normalized.includes('future')) return 'future';

  if (index === 0) return 'past';
  if (index === 1) return 'present';
  if (index === 2) return 'future';
  return 'unknown';
}

function getLocalizedThreePositionName(role: ThreeCardPositionRole, fallback: string, locale: Locale): string {
  const labels: Record<ThreeCardPositionRole, Record<Locale, string>> = {
    past: { 'zh-CN': '过去', 'en-US': 'Past', 'fr-FR': 'Passé', 'es-ES': 'Pasado' },
    present: { 'zh-CN': '现在', 'en-US': 'Present', 'fr-FR': 'Présent', 'es-ES': 'Presente' },
    future: { 'zh-CN': '未来', 'en-US': 'Future', 'fr-FR': 'Futur', 'es-ES': 'Futuro' },
    unknown: { 'zh-CN': fallback, 'en-US': fallback, 'fr-FR': fallback, 'es-ES': fallback },
  };
  return labels[role][locale];
}

function getLocalizedCelticPositionName(role: CelticCrossPositionRole, fallback: string, locale: Locale): string {
  const labels: Record<CelticCrossPositionRole, Record<Locale, string>> = {
    present: { 'zh-CN': '现状', 'en-US': 'Present', 'fr-FR': 'Présent', 'es-ES': 'Presente' },
    challenge: { 'zh-CN': '交叉', 'en-US': 'Challenge', 'fr-FR': 'Défi', 'es-ES': 'Desafío' },
    foundation: { 'zh-CN': '根基', 'en-US': 'Foundation', 'fr-FR': 'Fondation', 'es-ES': 'Fundamento' },
    past: { 'zh-CN': '过去', 'en-US': 'Past', 'fr-FR': 'Passé', 'es-ES': 'Pasado' },
    conscious: { 'zh-CN': '顶部', 'en-US': 'Crown', 'fr-FR': 'Couronne', 'es-ES': 'Corona' },
    nearFuture: { 'zh-CN': '即将', 'en-US': 'Near Future', 'fr-FR': 'Futur proche', 'es-ES': 'Futuro cercano' },
    self: { 'zh-CN': '自我', 'en-US': 'Self', 'fr-FR': 'Soi', 'es-ES': 'Yo' },
    environment: { 'zh-CN': '环境', 'en-US': 'Environment', 'fr-FR': 'Environnement', 'es-ES': 'Entorno' },
    hopesFears: { 'zh-CN': '希望', 'en-US': 'Hopes & Fears', 'fr-FR': 'Espoirs et craintes', 'es-ES': 'Esperanzas y temores' },
    outcome: { 'zh-CN': '结局', 'en-US': 'Outcome', 'fr-FR': 'Résultat', 'es-ES': 'Resultado' },
    unknown: { 'zh-CN': fallback, 'en-US': fallback, 'fr-FR': fallback, 'es-ES': fallback },
  };
  return labels[role][locale];
}

export function buildThreeCardReport({
  drawnCards,
  question = '',
  locale = 'zh-CN',
}: BuildThreeCardReportInput): ThreeCardReport {
  const domain = detectQuestionDomain(question);
  const singleReports = drawnCards.slice(0, 3).map(drawn => buildSingleCardReport({ drawn, question, locale }));

  const cards: ThreeCardReport['cards'] = singleReports.map((singleReport, index) => {
    const drawn = drawnCards[index];
    const rawPositionName = drawn?.position || `Position ${index + 1}`;
    const positionRole = getThreeCardPositionRole(rawPositionName, index);
    const positionName = getLocalizedThreePositionName(positionRole, rawPositionName, locale);

    return {
      positionName,
      positionRole,
      cardNameZh: singleReport.card.nameZh,
      cardNameEn: singleReport.card.nameEn,
      orientation: singleReport.orientation,
      keywords: singleReport.keywords,
      shortReading: singleReport.sections.essence,
      roleReading: buildThreeRoleReading(positionRole, singleReport, locale),
    };
  });

  const presentReport = singleReports[1] ?? singleReports[0];
  const futureReport = singleReports[2] ?? presentReport;

  return {
    domain,
    cards,
    storyline: buildThreeCardStorylineLocalized(cards, domain, locale),
    hiddenReminder: presentReport
      ? withLocale(locale, `这组三牌的隐藏提醒集中在“现在”：${presentReport.sections.hiddenReminder}`, `The hidden reminder of this spread gathers around the present card: ${presentReport.sections.hiddenReminder}`, `Le rappel caché de ce tirage se concentre autour de la carte du présent : ${presentReport.sections.hiddenReminder}`, `El recordatorio oculto de esta tirada se concentra en la carta del presente: ${presentReport.sections.hiddenReminder}`)
      : withLocale(locale, '这组三牌暂时缺少足够牌面形成隐藏提醒。', 'There are not enough cards to form a hidden reminder.', 'Il n’y a pas assez de cartes pour former un rappel caché.', 'No hay suficientes cartas para formar un recordatorio oculto.'),
    actionAdvice: futureReport
      ? withLocale(locale, `下一步行动可以参考未来牌给出的方向：${futureReport.sections.actionAdvice}`, `For the next step, use the future card as a directional guide: ${futureReport.sections.actionAdvice}`, `Pour la prochaine étape, utilisez la carte du futur comme repère : ${futureReport.sections.actionAdvice}`, `Para el siguiente paso, usa la carta del futuro como guía: ${futureReport.sections.actionAdvice}`)
      : withLocale(locale, '请先补足牌面信息，再决定下一步行动。', 'Complete the card information before deciding the next step.', 'Complétez les informations des cartes avant de décider de la prochaine étape.', 'Completa la información de las cartas antes de decidir el siguiente paso.'),
    quote: futureReport?.sections.quote ?? presentReport?.sections.quote ?? withLocale(locale, '让牌面成为镜子，而不是替你做决定的声音。', 'Let the cards be a mirror, not a voice that decides for you.', 'Que les cartes soient un miroir, pas une voix qui décide à votre place.', 'Deja que las cartas sean un espejo, no una voz que decida por ti.'),
  };
}

function getCelticCrossPositionRole(positionName: string, index: number): CelticCrossPositionRole {
  const normalized = positionName.trim().toLowerCase();

  if (normalized.includes('现状') || normalized.includes('present')) return 'present';
  if (normalized.includes('交叉') || normalized.includes('challenge') || normalized.includes('cross')) return 'challenge';
  if (normalized.includes('根基') || normalized.includes('foundation')) return 'foundation';
  if (normalized.includes('过去') || normalized.includes('past')) return 'past';
  if (normalized.includes('顶部') || normalized.includes('显意识') || normalized.includes('目标') || normalized.includes('crown') || normalized.includes('conscious')) return 'conscious';
  if (normalized.includes('即将') || normalized.includes('近期') || normalized.includes('near future')) return 'nearFuture';
  if (normalized.includes('自我') || normalized.includes('self')) return 'self';
  if (normalized.includes('环境') || normalized.includes('environment')) return 'environment';
  if (normalized.includes('希望') || normalized.includes('恐惧') || normalized.includes('hopes') || normalized.includes('fears')) return 'hopesFears';
  if (normalized.includes('结局') || normalized.includes('结果') || normalized.includes('outcome')) return 'outcome';

  const fallbackRoles: CelticCrossPositionRole[] = [
    'present',
    'challenge',
    'foundation',
    'conscious',
    'past',
    'nearFuture',
    'self',
    'environment',
    'hopesFears',
    'outcome',
  ];

  return fallbackRoles[index] ?? 'unknown';
}

function buildCelticPositionReading(
  role: CelticCrossPositionRole,
  singleReport: SingleCardReport,
  locale: Locale
): string {
  const cardName = singleReport.card.nameZh;
  const keyword = singleReport.keywords[0] ?? singleReport.card.archetype;
  const response = singleReport.sections.questionResponse;

  const roleLead: Record<CelticCrossPositionRole, string> = {
    present: withLocale(locale, `在“现状”位置，${cardName}揭示你正在经历的核心状态是${keyword}`, `In the present position, ${cardName} reveals the core state you are living through: ${keyword}`, `Dans la position du présent, ${cardName} révèle l’état central que vous traversez : ${keyword}`, `En la posición del presente, ${cardName} revela el estado central que estás viviendo: ${keyword}`),
    challenge: withLocale(locale, `在“交叉”位置，${cardName}说明真正与现状交织的挑战或资源来自${keyword}`, `In the crossing position, ${cardName} shows that the real challenge or resource woven into the situation comes from ${keyword}`, `Dans la position croisée, ${cardName} montre que le défi ou la ressource réelle vient de ${keyword}`, `En la posición de cruce, ${cardName} muestra que el desafío o recurso real viene de ${keyword}`),
    foundation: withLocale(locale, `在“根基”位置，${cardName}指出这件事深层的无意识基础是${keyword}`, `In the foundation position, ${cardName} points to ${keyword} as the deeper basis underneath the matter`, `Dans la position des fondations, ${cardName} indique ${keyword} comme base profonde de la situation`, `En la posición de fundamento, ${cardName} señala ${keyword} como base profunda de la situación`),
    past: withLocale(locale, `在“过去”位置，${cardName}显示已经发生的${keyword}仍在塑造当前局面`, `In the past position, ${cardName} shows that earlier ${keyword} still shapes the present`, `Dans la position du passé, ${cardName} montre qu’un ancien ${keyword} façonne encore le présent`, `En la posición del pasado, ${cardName} muestra que un antiguo ${keyword} aún da forma al presente`),
    conscious: withLocale(locale, `在“顶部”位置，${cardName}呈现你显意识里正在追求或看见的${keyword}`, `At the crown, ${cardName} shows the ${keyword} your conscious mind is seeking or noticing`, `Au sommet, ${cardName} montre le ${keyword} que votre conscience recherche ou perçoit`, `En la corona, ${cardName} muestra el ${keyword} que tu conciencia busca o percibe`),
    nearFuture: withLocale(locale, `在“即将”位置，${cardName}提示短期内会浮现的趋势与${keyword}有关`, `In the near-future position, ${cardName} suggests a short-term trend connected with ${keyword}`, `Dans la position du futur proche, ${cardName} suggère une tendance liée à ${keyword}`, `En el futuro cercano, ${cardName} sugiere una tendencia vinculada con ${keyword}`),
    self: withLocale(locale, `在“自我”位置，${cardName}反映你面对问题时的内在姿态是${keyword}`, `In the self position, ${cardName} reflects an inner stance of ${keyword}`, `Dans la position du soi, ${cardName} reflète une attitude intérieure de ${keyword}`, `En la posición del yo, ${cardName} refleja una postura interna de ${keyword}`),
    environment: withLocale(locale, `在“环境”位置，${cardName}显示外部人事与氛围带来的${keyword}影响`, `In the environment position, ${cardName} shows outside influences shaped by ${keyword}`, `Dans la position de l’environnement, ${cardName} montre des influences extérieures marquées par ${keyword}`, `En la posición del entorno, ${cardName} muestra influencias externas marcadas por ${keyword}`),
    hopesFears: withLocale(locale, `在“希望/恐惧”位置，${cardName}暴露内心深处对${keyword}的渴望或担忧`, `In the hopes and fears position, ${cardName} reveals a deep longing or concern around ${keyword}`, `Dans la position espoirs/craintes, ${cardName} révèle un désir ou une crainte autour de ${keyword}`, `En la posición de esperanzas y temores, ${cardName} revela un deseo o temor profundo sobre ${keyword}`),
    outcome: withLocale(locale, `在“结局”位置，${cardName}指向当前能量最可能汇聚成的${keyword}结果`, `In the outcome position, ${cardName} points toward a likely expression of ${keyword} if the current energy continues`, `Dans la position du résultat, ${cardName} indique une expression probable de ${keyword} si l’énergie actuelle continue`, `En la posición de resultado, ${cardName} apunta a una expresión probable de ${keyword} si la energía actual continúa`),
    unknown: withLocale(locale, `${cardName}在这个位置上提示你关注${keyword}的能量`, `${cardName} asks you to notice the energy of ${keyword} in this position`, `${cardName} vous demande d’observer l’énergie de ${keyword} dans cette position`, `${cardName} te pide observar la energía de ${keyword} en esta posición`),
  };

  return `${roleLead[role]}：${response}`;
}

function cardSummary(card: CelticCrossReport['cards'][number] | undefined, locale: Locale): string {
  if (!card) return noCardsText(locale);
  const orientationText = getOrientationText(card.orientation, locale);
  const keyword = card.keywords[0] ?? card.cardNameZh;
  return withLocale(locale, `${card.positionName}的${card.cardNameZh}（${orientationText}）带来${keyword}`, `${card.cardNameZh} in ${card.positionName} (${orientationText}) brings ${keyword}`, `${card.cardNameZh} en ${card.positionName} (${orientationText}) apporte ${keyword}`, `${card.cardNameZh} en ${card.positionName} (${orientationText}) aporta ${keyword}`);
}

function buildCelticOverview(cards: CelticCrossReport['cards'], domain: QuestionDomain, locale: Locale): string {
  const domainContext: Record<QuestionDomain, string> = {
    general: '这组凯尔特十字呈现的是整体处境的深层结构',
    relationship: '这组凯尔特十字呈现的是关系中的核心拉扯与长期走向',
    career: '这组凯尔特十字呈现的是事业议题中的现实阻力、资源与趋势',
    study: '这组凯尔特十字呈现的是学习议题里的基础状态与推进节奏',
    money: '这组凯尔特十字呈现的是资源、风险与财务判断的系统图景',
    decision: '这组凯尔特十字呈现的是选择背后的动机、阻力与结果链条',
    selfGrowth: '这组凯尔特十字呈现的是内在成长过程中的显意识、阴影与转化方向',
  };
  const reversedCount = cards.filter(card => card.orientation === 'reversed').length;
  const reversedTone = reversedCount >= 5
    ? '逆位能量较多，说明这次议题的关键不在强行推进，而在先校正阻滞与内在矛盾'
    : reversedCount >= 2
      ? '牌面中有若干逆位提示，需要留意阻点，但整体仍有可调整的空间'
      : '牌面能量较为顺畅，重点在于看清结构后稳定行动';

  return withLocale(locale, `${domainContext[domain]}：${cardSummary(cards[0], locale)}，${cardSummary(cards[1], locale)}，而${cardSummary(cards[9], locale)}。${reversedTone}。`, `This Celtic Cross frames ${DOMAIN_CONTEXT[domain][locale]} through ${cardSummary(cards[0], locale)}, ${cardSummary(cards[1], locale)}, and ${cardSummary(cards[9], locale)}. The spread asks for a structured reading rather than a single prediction.`, `Cette Croix celtique éclaire ${DOMAIN_CONTEXT[domain][locale]} à travers ${cardSummary(cards[0], locale)}, ${cardSummary(cards[1], locale)} et ${cardSummary(cards[9], locale)}. Le tirage demande une lecture structurée plutôt qu’une prédiction unique.`, `Esta Cruz celta enfoca ${DOMAIN_CONTEXT[domain][locale]} a través de ${cardSummary(cards[0], locale)}, ${cardSummary(cards[1], locale)} y ${cardSummary(cards[9], locale)}. La tirada pide una lectura estructurada, no una predicción única.`);
}

function combinePair(
  title: string,
  first: CelticCrossReport['cards'][number] | undefined,
  second: CelticCrossReport['cards'][number] | undefined,
  focus: string,
  locale: Locale
): string {
  if (!first && !second) return withLocale(locale, `${title}：牌面信息不足，暂时无法形成稳定判断。`, `${title}: there is not enough card information to form a stable reading.`, `${title} : les informations des cartes sont insuffisantes pour former une lecture stable.`, `${title}: no hay suficiente información de cartas para formar una lectura estable.`);
  if (!second) return withLocale(locale, `${title}：${cardSummary(first, locale)}，${focus}。`, `${title}: ${cardSummary(first, locale)}. ${focus}.`, `${title} : ${cardSummary(first, locale)}. ${focus}.`, `${title}: ${cardSummary(first, locale)}. ${focus}.`);
  return withLocale(locale, `${title}：${cardSummary(first, locale)}，同时${cardSummary(second, locale)}。这说明${focus}。`, `${title}: ${cardSummary(first, locale)}, while ${cardSummary(second, locale)}. This suggests ${focus}.`, `${title} : ${cardSummary(first, locale)}, tandis que ${cardSummary(second, locale)}. Cela suggère que ${focus}.`, `${title}: ${cardSummary(first, locale)}, mientras ${cardSummary(second, locale)}. Esto sugiere que ${focus}.`);
}

export function buildCelticCrossReport({
  drawnCards,
  question = '',
  locale = 'zh-CN',
}: BuildCelticCrossReportInput): CelticCrossReport {
  const domain = detectQuestionDomain(question);
  const singleReports = drawnCards.slice(0, 10).map(drawn => buildSingleCardReport({ drawn, question, locale }));

  const cards: CelticCrossReport['cards'] = singleReports.map((singleReport, index) => {
    const drawn = drawnCards[index];
    const rawPositionName = drawn?.position || `Position ${index + 1}`;
    const positionRole = getCelticCrossPositionRole(rawPositionName, index);
    const positionName = getLocalizedCelticPositionName(positionRole, rawPositionName, locale);

    return {
      positionName,
      positionRole,
      cardNameZh: singleReport.card.nameZh,
      cardNameEn: singleReport.card.nameEn,
      orientation: singleReport.orientation,
      keywords: singleReport.keywords,
      shortReading: singleReport.sections.essence,
      positionReading: buildCelticPositionReading(positionRole, singleReport, locale),
    };
  });

  const present = cards[0];
  const challenge = cards[1];
  const foundation = cards[2];
  const conscious = cards[3];
  const past = cards[4];
  const nearFuture = cards[5];
  const self = cards[6];
  const environment = cards[7];
  const hopesFears = cards[8];
  const outcome = cards[9];
  const outcomeReport = singleReports[9] ?? singleReports[singleReports.length - 1];
  const presentReport = singleReports[0] ?? outcomeReport;

  return {
    domain,
    overview: buildCelticOverview(cards, domain, locale),
    cards,
    sections: {
      coreConflict: combinePair('核心冲突', present, challenge, withLocale(locale, '当前真正要处理的是现状能量与交叉能量之间的互动，而不是只看表面事件', 'the real work is the interaction between the present state and the crossing energy, not the surface event alone', 'le vrai travail se situe dans l’interaction entre l’état présent et l’énergie croisée, pas seulement dans l’événement visible', 'el trabajo real está en la interacción entre el estado presente y la energía que lo cruza, no solo en el evento visible'), locale),
      deepCause: combinePair('深层原因', foundation, past, withLocale(locale, '问题的根并非突然出现，而是由深层基础与过去经验共同累积而成', 'the roots did not appear suddenly; they were built from deeper foundations and past experience', 'les racines ne sont pas apparues soudainement ; elles viennent des fondations profondes et de l’expérience passée', 'las raíces no surgieron de repente; se formaron desde bases profundas y experiencias pasadas'), locale),
      consciousDirection: combinePair('意识方向', conscious, nearFuture, withLocale(locale, '你的目标感会影响近期趋势，越能看清想要去的方向，越能提前调整节奏', 'your sense of direction will influence the near future; clarity helps you adjust the pace early', 'votre sens de la direction influence le futur proche ; la clarté aide à ajuster le rythme plus tôt', 'tu sentido de dirección influirá en el futuro cercano; la claridad ayuda a ajustar el ritmo a tiempo'), locale),
      selfAndEnvironment: combinePair('自我与环境', self, environment, withLocale(locale, '个人态度与外部条件正在互相牵动，单靠内在意愿或外界变化都不足以完成转化', 'inner stance and outer conditions are shaping one another; neither will is enough on its own', 'l’attitude intérieure et les conditions extérieures se répondent ; aucune des deux ne suffit seule', 'la postura interna y las condiciones externas se influyen mutuamente; ninguna basta por sí sola'), locale),
      emotionalTension: hopesFears
        ? withLocale(locale, `情绪张力：${cardSummary(hopesFears, locale)}。这张牌提示你，内心最强烈的期待与最深的担忧可能来自同一个核心需求，需要被诚实看见。`, `Emotional tension: ${cardSummary(hopesFears, locale)}. The strongest hope and deepest fear may come from the same unmet need.`, `Tension émotionnelle : ${cardSummary(hopesFears, locale)}. L’espoir le plus fort et la crainte la plus profonde peuvent venir du même besoin non reconnu.`, `Tensión emocional: ${cardSummary(hopesFears, locale)}. La mayor esperanza y el temor más profundo pueden venir de la misma necesidad no atendida.`)
        : withLocale(locale, '情绪张力：牌面信息不足，暂时无法判断希望与恐惧的核心。', 'Emotional tension: not enough card information to read the center of hope and fear.', 'Tension émotionnelle : les informations manquent pour lire le centre des espoirs et des craintes.', 'Tensión emocional: falta información para leer el centro de esperanzas y temores.'),
      futureTrend: outcome
        ? withLocale(locale, `未来趋势：${cardSummary(outcome, locale)}。如果维持当前能量路径，结局会更接近这张牌所代表的方向：${outcome.positionReading}`, `Future trend: ${cardSummary(outcome, locale)}. If the current energy continues, the outcome moves toward this card’s direction: ${outcome.positionReading}`, `Tendance future : ${cardSummary(outcome, locale)}. Si l’énergie actuelle continue, le résultat se rapproche de la direction de cette carte : ${outcome.positionReading}`, `Tendencia futura: ${cardSummary(outcome, locale)}. Si la energía actual continúa, el resultado se acerca a la dirección de esta carta: ${outcome.positionReading}`)
        : withLocale(locale, '未来趋势：缺少结果牌，无法形成完整趋势判断。', 'Future trend: the outcome card is missing, so a complete trend cannot be formed.', 'Tendance future : la carte de résultat manque, donc la tendance complète ne peut pas être établie.', 'Tendencia futura: falta la carta de resultado, por lo que no se puede formar una tendencia completa.'),
      finalAdvice: outcomeReport
        ? withLocale(locale, `最终建议：先回应现状中的真实矛盾，再把行动落到结果牌给出的方向上。${outcomeReport.sections.actionAdvice}`, `Final advice: respond to the real contradiction in the present first, then act in the direction shown by the outcome card. ${outcomeReport.sections.actionAdvice}`, `Conseil final : répondez d’abord à la vraie contradiction du présent, puis agissez dans la direction indiquée par la carte de résultat. ${outcomeReport.sections.actionAdvice}`, `Consejo final: responde primero a la contradicción real del presente y luego actúa en la dirección que muestra la carta de resultado. ${outcomeReport.sections.actionAdvice}`)
        : withLocale(locale, '最终建议：请先补足牌面信息，再做进一步判断。', 'Final advice: complete the card information before making a deeper judgment.', 'Conseil final : complétez les informations des cartes avant d’approfondir le jugement.', 'Consejo final: completa la información de las cartas antes de hacer un juicio más profundo.'),
      quote: outcomeReport?.sections.quote ?? presentReport?.sections.quote ?? withLocale(locale, '真正的答案不是预言，而是你看清结构之后做出的选择。', 'The true answer is not a prophecy, but the choice you make after seeing the pattern clearly.', 'La vraie réponse n’est pas une prophétie, mais le choix que vous faites après avoir vu la structure clairement.', 'La verdadera respuesta no es una profecía, sino la elección que haces después de ver el patrón con claridad.'),
    },
  };
}