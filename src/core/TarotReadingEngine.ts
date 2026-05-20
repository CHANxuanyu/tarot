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

type BuildSingleCardReportInput = {
  drawn: DrawnCard;
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