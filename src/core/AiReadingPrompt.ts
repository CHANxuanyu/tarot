import type { AiReadingContext } from './AiReadingTypes';

const localeNames = {
  'zh-CN': 'Simplified Chinese',
  'en-US': 'English',
  'fr-FR': 'French',
  'es-ES': 'Spanish',
};

const spreadNames = {
  'single-card': 'Single Card',
  'three-card': 'Three-Card Spread',
  'celtic-cross': 'Celtic Cross',
};

export function buildAiReadingMessages(context: AiReadingContext) {
  const cardLines = context.drawnCards.map((drawn, index) => (
    `${index + 1}. ${drawn.position}: ${drawn.card.nameZh} / ${drawn.card.name} — ${drawn.reversed ? 'reversed' : 'upright'}`
  )).join('\n');

  return [
    {
      role: 'system',
      content: [
        'You are a careful tarot reading assistant.',
        'Write symbolic, reflective guidance based on the provided local tarot report.',
        'Frame the reading as a perspective for reflection, not as a prediction or instruction.',
        'Do not claim guaranteed accuracy, fate certainty, medical advice, legal advice, or financial certainty.',
        'If the question concerns money, income, investing, health, law, or other high-stakes decisions, avoid promises and give only cautious, practical, non-professional guidance.',
        'Never promise that the user will make money, win, recover, reconcile, or receive a guaranteed outcome.',
        `Respond in ${localeNames[context.locale]}.`,
        'Keep the tone grounded, professional, and useful.',
      ].join(' '),
    },
    {
      role: 'user',
      content: [
        `Spread: ${spreadNames[context.spreadId]}`,
        `Question: ${context.question || 'No specific question was provided.'}`,
        '',
        'Drawn cards:',
        cardLines,
        '',
        'Local structured report:',
        context.localReportText,
        '',
        'Create an AI enhanced reading with these sections:',
        '1. Summary',
        '2. Deeper Pattern',
        '3. Response to the Question',
        '4. Practical Advice',
        '5. Closing Insight',
      ].join('\n'),
    },
  ];
}