import type { DrawnCard } from './types';

const STORAGE_KEY = 'mystic-tarot-history';

export interface ReadingRecord {
  id: string;
  timestamp: number;
  cards: Array<{
    cardId: number;
    cardName: string;
    cardNameZh: string;
    position: string;
    reversed: boolean;
  }>;
}

export function saveReading(drawnCards: DrawnCard[]): ReadingRecord {
  const record: ReadingRecord = {
    id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
    timestamp: Date.now(),
    cards: drawnCards.map(d => ({
      cardId: d.card.id,
      cardName: d.card.name,
      cardNameZh: d.card.nameZh,
      position: d.position,
      reversed: d.reversed,
    })),
  };

  const history = getHistory();
  history.unshift(record);
  if (history.length > 50) history.length = 50;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  return record;
}

export function getHistory(): ReadingRecord[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function clearHistory(): void {
  localStorage.removeItem(STORAGE_KEY);
}
