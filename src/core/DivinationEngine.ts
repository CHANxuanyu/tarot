import type { CardData, DrawnCard } from './types';

export function shuffleDeck(cards: CardData[]): CardData[] {
  const deck = [...cards];
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
}

export function drawCards(
  deck: CardData[],
  count: number,
  positions: string[]
): DrawnCard[] {
  return deck.slice(0, count).map((card, i) => ({
    card,
    reversed: Math.random() < 0.3,
    position: positions[i] || `Position ${i + 1}`,
  }));
}
