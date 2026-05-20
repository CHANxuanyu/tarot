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

type BuildSingleCardReportInput = {
  drawn: DrawnCard;
  question?: string;
};

type BuildThreeCardReportInput = {
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