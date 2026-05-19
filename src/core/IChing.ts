export interface Yao {
  value: 6 | 7 | 8 | 9;
  isYang: boolean;
  isChanging: boolean;
}

export interface HexagramData {
  number: number;
  name: string;
  nameZh: string;
  character: string;
  judgment: string;
  judgmentZh: string;
  image: string;
  imageZh: string;
  lines: string[];
  linesZh: string[];
}

export interface CastResult {
  yaos: Yao[];
  primaryHexagram: number;
  changedHexagram: number | null;
  changingLines: number[];
}

export function castCoin(): 6 | 7 | 8 | 9 {
  const coins = [
    Math.random() < 0.5 ? 3 : 2,
    Math.random() < 0.5 ? 3 : 2,
    Math.random() < 0.5 ? 3 : 2,
  ];
  return (coins[0] + coins[1] + coins[2]) as 6 | 7 | 8 | 9;
}

export function yaoFromValue(value: 6 | 7 | 8 | 9): Yao {
  return {
    value,
    isYang: value === 7 || value === 9,
    isChanging: value === 6 || value === 9,
  };
}

export function yaosToTrigramIndex(yaos: Yao[], start: number): number {
  let idx = 0;
  for (let i = 0; i < 3; i++) {
    if (yaos[start + i].isYang) {
      idx |= (1 << i);
    }
  }
  return idx;
}

const TRIGRAM_ORDER = [2, 0, 3, 4, 6, 7, 5, 1];

export function hexagramNumber(lower: number, upper: number): number {
  const row = TRIGRAM_ORDER[upper];
  const col = TRIGRAM_ORDER[lower];
  return KING_WEN_SEQUENCE[row][col];
}

const KING_WEN_SEQUENCE: number[][] = [
  [1, 34, 5, 26, 11, 9, 14, 43],
  [25, 51, 3, 27, 24, 42, 21, 17],
  [6, 40, 29, 4, 7, 59, 64, 47],
  [33, 62, 39, 52, 15, 53, 56, 31],
  [12, 16, 8, 23, 2, 20, 35, 45],
  [44, 32, 48, 18, 46, 57, 50, 28],
  [13, 55, 63, 22, 36, 37, 30, 49],
  [10, 54, 60, 41, 19, 61, 38, 58],
];

export function computeHexagram(yaos: Yao[]): CastResult {
  const lowerTrigram = yaosToTrigramIndex(yaos, 0);
  const upperTrigram = yaosToTrigramIndex(yaos, 3);
  const primaryHexagram = hexagramNumber(lowerTrigram, upperTrigram);

  const changingLines: number[] = [];
  yaos.forEach((y, i) => {
    if (y.isChanging) changingLines.push(i);
  });

  let changedHexagram: number | null = null;
  if (changingLines.length > 0) {
    const changedYaos = yaos.map(y => ({
      ...y,
      isYang: y.isChanging ? !y.isYang : y.isYang,
    }));
    const changedLower = yaosToTrigramIndex(changedYaos, 0);
    const changedUpper = yaosToTrigramIndex(changedYaos, 3);
    changedHexagram = hexagramNumber(changedLower, changedUpper);
  }

  return { yaos, primaryHexagram, changedHexagram, changingLines };
}

export function getCoinResults(value: 6 | 7 | 8 | 9): boolean[] {
  switch (value) {
    case 6: return [false, false, false];
    case 7: return [true, true, false];
    case 8: return [false, false, true];
    case 9: return [true, true, true];
  }
}
