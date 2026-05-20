import { majorArcanaMeaningByNumber, type TarotCardMeaning } from '../data/majorArcanaMeanings';
import type { DrawnCard } from './types';

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
};

type BuildThreeCardReportInput = {
  drawnCards: DrawnCard[];
  question?: string;
};

type BuildCelticCrossReportInput = {
  drawnCards: DrawnCard[];
  question?: string;
};

const DOMAIN_KEYWORDS: Record<Exclude<QuestionDomain, 'general'>, string[]> = {
  relationship: [
    '感情', '爱情', '喜欢', '爱', '恋爱', '关系', '复合', '前任', '暧昧', '伴侣', '对象', '男友', '女友',
    '老公', '老婆', '婚姻', '结婚', '分手', '他', '她', 'ta',
  ],
  career: [
    '工作', '事业', '职业', '职场', '跳槽', '面试', '老板', '同事', '项目', 'offer', '升职', '离职',
    '创业', '岗位', '公司', '客户', '合作',
  ],
  study: [
    '学习', '考试', '考研', '考公', '论文', '学校', '课程', '作业', '成绩', '证书', '读书', '复习',
    '专业', '毕业', '留学',
  ],
  money: [
    '钱', '财富', '财运', '收入', '工资', '投资', '理财', '消费', '债务', '借钱', '还款', '预算',
    '资产', '亏损', '赚钱',
  ],
  decision: [
    '是否', '要不要', '该不该', '能不能', '可不可以', '选择', '决定', '怎么办', '还是', '哪个',
    '适合吗', '会不会',
  ],
  selfGrowth: [
    '自己', '内心', '成长', '状态', '迷茫', '方向', '焦虑', '情绪', '疗愈', '能量', '人生',
    '未来', '自我', '困惑', '改变',
  ],
};

const DOMAIN_PRIORITY: QuestionDomain[] = [
  'relationship',
  'career',
  'study',
  'money',
  'selfGrowth',
  'decision',
  'general',
];

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
}: BuildSingleCardReportInput): SingleCardReport {
  const card = getMajorArcanaMeaning(drawn.card.id);

  if (!card) {
    throw new Error(`Missing Major Arcana meaning for card id: ${drawn.card.id}`);
  }

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

function buildRoleReading(
  role: ThreeCardPositionRole,
  singleReport: SingleCardReport
): string {
  const cardName = singleReport.card.nameZh;
  const keyword = singleReport.keywords[0] ?? singleReport.card.archetype;
  const response = singleReport.sections.questionResponse;

  if (role === 'past') {
    return `作为“过去”的位置，${cardName}指出此前留下的${keyword}模式仍在影响此刻：${response}`;
  }

  if (role === 'present') {
    return `作为“现在”的位置，${cardName}揭示当前真正需要面对的核心状态是${keyword}：${response}`;
  }

  if (role === 'future') {
    return `作为“未来”的位置，${cardName}显示若维持当前趋势，事情可能沿着${keyword}的方向展开：${response}`;
  }

  return `${cardName}在这个位置上提示你关注${keyword}的能量：${response}`;
}

function buildThreeCardStoryline(
  cards: ThreeCardReport['cards'],
  domain: QuestionDomain
): string {
  const [past, present, future] = cards;
  const domainContext: Record<QuestionDomain, string> = {
    general: '这组三牌呈现的是整体能量的流动',
    relationship: '这组三牌呈现的是关系能量的演变',
    career: '这组三牌呈现的是事业路径的推进',
    study: '这组三牌呈现的是学习状态的转换',
    money: '这组三牌呈现的是资源与财务判断的变化',
    decision: '这组三牌呈现的是选择背后的动态',
    selfGrowth: '这组三牌呈现的是内在成长的轨迹',
  };

  if (!past || !present || !future) {
    return `${domainContext[domain]}：牌面数量不足以形成完整的过去、现在、未来链路，请以已出现的牌位作为当前阶段提示。`;
  }

  const pastKeyword = past.keywords[0] ?? past.cardNameZh;
  const presentKeyword = present.keywords[0] ?? present.cardNameZh;
  const futureKeyword = future.keywords[0] ?? future.cardNameZh;
  const reversedCount = cards.filter(card => card.orientation === 'reversed').length;
  const flowTone = reversedCount >= 2
    ? '这条路径并非完全顺畅，逆位能量说明你需要先修正内在阻滞，变化才会真正发生'
    : reversedCount === 1
      ? '这条路径中有一个关键阻点，但它也正指出最需要被调整的位置'
      : '这条路径相对连贯，能量正在从经验沉淀走向下一阶段显化';

  return `${domainContext[domain]}：过去的${past.cardNameZh}带来${pastKeyword}的背景，推动你来到现在${present.cardNameZh}所揭示的${presentKeyword}课题；如果你继续沿着当前方式行动，未来的${future.cardNameZh}会把能量带向${futureKeyword}。${flowTone}。`;
}

export function buildThreeCardReport({
  drawnCards,
  question = '',
}: BuildThreeCardReportInput): ThreeCardReport {
  const domain = detectQuestionDomain(question);
  const singleReports = drawnCards.slice(0, 3).map(drawn => buildSingleCardReport({ drawn, question }));

  const cards: ThreeCardReport['cards'] = singleReports.map((singleReport, index) => {
    const drawn = drawnCards[index];
    const positionName = drawn?.position || `Position ${index + 1}`;
    const positionRole = getThreeCardPositionRole(positionName, index);

    return {
      positionName,
      positionRole,
      cardNameZh: singleReport.card.nameZh,
      cardNameEn: singleReport.card.nameEn,
      orientation: singleReport.orientation,
      keywords: singleReport.keywords,
      shortReading: singleReport.sections.essence,
      roleReading: buildRoleReading(positionRole, singleReport),
    };
  });

  const presentReport = singleReports[1] ?? singleReports[0];
  const futureReport = singleReports[2] ?? presentReport;

  return {
    domain,
    cards,
    storyline: buildThreeCardStoryline(cards, domain),
    hiddenReminder: presentReport
      ? `这组三牌的隐藏提醒集中在“现在”：${presentReport.sections.hiddenReminder}`
      : '这组三牌暂时缺少足够牌面形成隐藏提醒。',
    actionAdvice: futureReport
      ? `下一步行动可以参考未来牌给出的方向：${futureReport.sections.actionAdvice}`
      : '请先补足牌面信息，再决定下一步行动。',
    quote: futureReport?.sections.quote ?? presentReport?.sections.quote ?? '让牌面成为镜子，而不是替你做决定的声音。',
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
  singleReport: SingleCardReport
): string {
  const cardName = singleReport.card.nameZh;
  const keyword = singleReport.keywords[0] ?? singleReport.card.archetype;
  const response = singleReport.sections.questionResponse;

  const roleLead: Record<CelticCrossPositionRole, string> = {
    present: `在“现状”位置，${cardName}揭示你正在经历的核心状态是${keyword}`,
    challenge: `在“交叉”位置，${cardName}说明真正与现状交织的挑战或资源来自${keyword}`,
    foundation: `在“根基”位置，${cardName}指出这件事深层的无意识基础是${keyword}`,
    past: `在“过去”位置，${cardName}显示已经发生的${keyword}仍在塑造当前局面`,
    conscious: `在“顶部”位置，${cardName}呈现你显意识里正在追求或看见的${keyword}`,
    nearFuture: `在“即将”位置，${cardName}提示短期内会浮现的趋势与${keyword}有关`,
    self: `在“自我”位置，${cardName}反映你面对问题时的内在姿态是${keyword}`,
    environment: `在“环境”位置，${cardName}显示外部人事与氛围带来的${keyword}影响`,
    hopesFears: `在“希望/恐惧”位置，${cardName}暴露内心深处对${keyword}的渴望或担忧`,
    outcome: `在“结局”位置，${cardName}指向当前能量最可能汇聚成的${keyword}结果`,
    unknown: `${cardName}在这个位置上提示你关注${keyword}的能量`,
  };

  return `${roleLead[role]}：${response}`;
}

function cardSummary(card: CelticCrossReport['cards'][number] | undefined): string {
  if (!card) return '牌面信息不足';
  const orientationText = card.orientation === 'upright' ? '正位' : '逆位';
  const keyword = card.keywords[0] ?? card.cardNameZh;
  return `${card.positionName}的${card.cardNameZh}（${orientationText}）带来${keyword}`;
}

function buildCelticOverview(cards: CelticCrossReport['cards'], domain: QuestionDomain): string {
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

  return `${domainContext[domain]}：${cardSummary(cards[0])}，${cardSummary(cards[1])}，而${cardSummary(cards[9])}。${reversedTone}。`;
}

function combinePair(
  title: string,
  first: CelticCrossReport['cards'][number] | undefined,
  second: CelticCrossReport['cards'][number] | undefined,
  focus: string
): string {
  if (!first && !second) return `${title}：牌面信息不足，暂时无法形成稳定判断。`;
  if (!second) return `${title}：${cardSummary(first)}，${focus}。`;
  return `${title}：${cardSummary(first)}，同时${cardSummary(second)}。这说明${focus}。`;
}

export function buildCelticCrossReport({
  drawnCards,
  question = '',
}: BuildCelticCrossReportInput): CelticCrossReport {
  const domain = detectQuestionDomain(question);
  const singleReports = drawnCards.slice(0, 10).map(drawn => buildSingleCardReport({ drawn, question }));

  const cards: CelticCrossReport['cards'] = singleReports.map((singleReport, index) => {
    const drawn = drawnCards[index];
    const positionName = drawn?.position || `Position ${index + 1}`;
    const positionRole = getCelticCrossPositionRole(positionName, index);

    return {
      positionName,
      positionRole,
      cardNameZh: singleReport.card.nameZh,
      cardNameEn: singleReport.card.nameEn,
      orientation: singleReport.orientation,
      keywords: singleReport.keywords,
      shortReading: singleReport.sections.essence,
      positionReading: buildCelticPositionReading(positionRole, singleReport),
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
    overview: buildCelticOverview(cards, domain),
    cards,
    sections: {
      coreConflict: combinePair('核心冲突', present, challenge, '当前真正要处理的是现状能量与交叉能量之间的互动，而不是只看表面事件'),
      deepCause: combinePair('深层原因', foundation, past, '问题的根并非突然出现，而是由深层基础与过去经验共同累积而成'),
      consciousDirection: combinePair('意识方向', conscious, nearFuture, '你的目标感会影响近期趋势，越能看清想要去的方向，越能提前调整节奏'),
      selfAndEnvironment: combinePair('自我与环境', self, environment, '个人态度与外部条件正在互相牵动，单靠内在意愿或外界变化都不足以完成转化'),
      emotionalTension: hopesFears
        ? `情绪张力：${cardSummary(hopesFears)}。这张牌提示你，内心最强烈的期待与最深的担忧可能来自同一个核心需求，需要被诚实看见。`
        : '情绪张力：牌面信息不足，暂时无法判断希望与恐惧的核心。',
      futureTrend: outcome
        ? `未来趋势：${cardSummary(outcome)}。如果维持当前能量路径，结局会更接近这张牌所代表的方向：${outcome.positionReading}`
        : '未来趋势：缺少结果牌，无法形成完整趋势判断。',
      finalAdvice: outcomeReport
        ? `最终建议：先回应现状中的真实矛盾，再把行动落到结果牌给出的方向上。${outcomeReport.sections.actionAdvice}`
        : '最终建议：请先补足牌面信息，再做进一步判断。',
      quote: outcomeReport?.sections.quote ?? presentReport?.sections.quote ?? '真正的答案不是预言，而是你看清结构之后做出的选择。',
    },
  };
}