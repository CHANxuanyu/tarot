import type { DrawnCard, CopyLang } from './types';

export interface InterpretationData {
  interpretations: Record<string, {
    upright: { past: string[]; present: string[]; future: string[] };
    reversed: { past: string[]; present: string[]; future: string[] };
  }>;
}

let cachedEn: InterpretationData | null = null;
let cachedZh: InterpretationData | null = null;

async function loadInterpretations(themeId: string, lang: 'en' | 'zh'): Promise<InterpretationData | null> {
  const cached = lang === 'zh' ? cachedZh : cachedEn;
  if (cached) return cached;

  const suffix = lang === 'zh' ? '-zh' : '';
  try {
    const resp = await fetch(`/themes/${themeId}/interpretations${suffix}.json`);
    if (!resp.ok) return null;
    const data = await resp.json();
    if (lang === 'zh') cachedZh = data;
    else cachedEn = data;
    return data;
  } catch {
    return null;
  }
}

function positionKey(position: string): 'past' | 'present' | 'future' {
  const lower = position.toLowerCase();
  if (lower.includes('past') || lower.includes('过去')) return 'past';
  if (lower.includes('future') || lower.includes('未来')) return 'future';
  return 'present';
}

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export async function interpretRich(
  drawn: DrawnCard,
  lang: 'en' | 'zh',
  themeId: string
): Promise<string | null> {
  const data = await loadInterpretations(themeId, lang);
  if (!data) return null;

  const cardData = data.interpretations[String(drawn.card.id)];
  if (!cardData) return null;

  const orientation = drawn.reversed ? cardData.reversed : cardData.upright;
  const pos = positionKey(drawn.position);
  const paragraphs = orientation[pos];

  if (!paragraphs || paragraphs.length === 0) return null;
  return pickRandom(paragraphs);
}

export function interpret(drawn: DrawnCard, copy: CopyLang, lang: 'en' | 'zh'): string {
  const { card, reversed, position } = drawn;
  const template = reversed ? copy.interpretation.reversed : copy.interpretation.upright;
  const keywords = reversed ? card.keywordsReversed : card.keywords;
  const name = lang === 'zh' ? card.nameZh : card.name;

  return template
    .replace('{name}', name)
    .replace('{position}', position)
    .replace('{keyword1}', keywords[0] || '')
    .replace('{keyword2}', keywords[1] || '')
    .replace('{keyword3}', keywords[2] || '');
}

export function clearInterpretationCache() {
  cachedEn = null;
  cachedZh = null;
}

const SYNTHESIS_EN: string[] = [
  "The journey from {past} through {present} points toward {future}. {pastCard} laid the foundation, {presentCard} defines your current crossroads, and {futureCard} illuminates what awaits if you stay this course.",
  "Your reading reveals a clear arc: the energy of {pastCard} has evolved into {presentCard}'s influence, and this momentum carries you toward {futureCard}. Trust the thread connecting these three.",
  "Looking at this spread as a whole — {past} shaped the ground you stand on, {present} is the challenge or gift of this moment, and {future} is the invitation ahead. The cards speak not of fate, but of possibility.",
  "{pastCard} whispers of what you've already learned. {presentCard} asks what you'll do with that wisdom now. And {futureCard} shows where courage — or fear — will lead you next.",
  "These three cards form a story: a beginning in {pastCard}, a turning point in {presentCard}, and a horizon defined by {futureCard}. The question is not what will happen, but who you choose to be within it.",
];

const SYNTHESIS_ZH: string[] = [
  "从{past}到{present}再到{future}，这是一条清晰的轨迹。{pastCard}奠定了基础，{presentCard}定义了你当下的十字路口，而{futureCard}则照亮了前方的道路。",
  "你的牌面揭示了一个完整的弧线：{pastCard}的能量已经演化为{presentCard}的影响，这股势能正将你推向{futureCard}。相信连接这三者的那根线。",
  "纵观整个牌阵——{past}塑造了你脚下的土地，{present}是此刻的挑战或馈赠，{future}则是前方的邀请。牌面诉说的不是命运，而是可能性。",
  "{pastCard}低语着你已经学到的东西。{presentCard}追问你将如何运用那份智慧。而{futureCard}指向勇气——或恐惧——将把你引向何方。",
  "这三张牌组成一个故事：始于{pastCard}，转折于{presentCard}，远眺于{futureCard}。问题不在于会发生什么，而在于你选择成为谁。",
];

export function generateSynthesis(drawnCards: DrawnCard[], lang: 'en' | 'zh'): string {
  if (drawnCards.length < 3) return '';

  const templates = lang === 'zh' ? SYNTHESIS_ZH : SYNTHESIS_EN;
  const template = pickRandom(templates);

  const getName = (d: DrawnCard) => lang === 'zh' ? d.card.nameZh : d.card.name;
  const getKeyword = (d: DrawnCard) => {
    const kw = d.reversed ? d.card.keywordsReversed : d.card.keywords;
    return kw[0] || '';
  };

  return template
    .replace('{past}', getKeyword(drawnCards[0]))
    .replace('{present}', getKeyword(drawnCards[1]))
    .replace('{future}', getKeyword(drawnCards[2]))
    .replace('{pastCard}', getName(drawnCards[0]))
    .replace('{presentCard}', getName(drawnCards[1]))
    .replace('{futureCard}', getName(drawnCards[2]));
}
