import type { DrawnCard } from './types';
import { getThemeAssetPath } from './ThemeLoader';

const CARD_WIDTH = 600;
const CARD_HEIGHT = 900;

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

export async function generateShareCard(
  drawnCards: DrawnCard[],
  lang: 'en' | 'zh',
  themeId: string,
  question?: string
): Promise<Blob | null> {
  const canvas = document.createElement('canvas');
  canvas.width = CARD_WIDTH;
  canvas.height = CARD_HEIGHT;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  ctx.fillStyle = '#1a0f2e';
  ctx.fillRect(0, 0, CARD_WIDTH, CARD_HEIGHT);

  const grad = ctx.createRadialGradient(300, 200, 0, 300, 450, 450);
  grad.addColorStop(0, '#2d1b4e');
  grad.addColorStop(1, '#1a0f2e');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, CARD_WIDTH, CARD_HEIGHT);

  ctx.strokeStyle = '#d4af37';
  ctx.lineWidth = 3;
  ctx.strokeRect(15, 15, CARD_WIDTH - 30, CARD_HEIGHT - 30);

  ctx.strokeStyle = 'rgba(212, 175, 55, 0.3)';
  ctx.lineWidth = 1;
  ctx.strokeRect(25, 25, CARD_WIDTH - 50, CARD_HEIGHT - 50);

  ctx.font = '700 28px Cinzel, serif';
  ctx.fillStyle = '#d4af37';
  ctx.textAlign = 'center';
  ctx.fillText(lang === 'zh' ? '神秘塔罗' : 'Mystic Tarot', CARD_WIDTH / 2, 70);

  ctx.font = 'italic 16px "Crimson Pro", serif';
  ctx.fillStyle = '#a89cc0';
  ctx.fillText(lang === 'zh' ? '揭示你的命运' : 'Unveil Your Destiny', CARD_WIDTH / 2, 100);

  if (question) {
    ctx.font = 'italic 14px "Crimson Pro", serif';
    ctx.fillStyle = '#f4e4bc';
    ctx.fillText(`"${question}"`, CARD_WIDTH / 2, 125);
  }

  const cardW = 130;
  const cardH = 208;
  const gap = 20;
  const totalW = drawnCards.length * cardW + (drawnCards.length - 1) * gap;
  const startX = (CARD_WIDTH - totalW) / 2;
  const cardY = question ? 155 : 150;

  for (let i = 0; i < drawnCards.length; i++) {
    const drawn = drawnCards[i];
    const x = startX + i * (cardW + gap);

    ctx.font = '600 12px Cinzel, serif';
    ctx.fillStyle = '#d4af37';
    ctx.textAlign = 'center';
    ctx.fillText(drawn.position.toUpperCase(), x + cardW / 2, cardY - 8);

    ctx.save();
    ctx.fillStyle = '#f4e4bc';
    ctx.strokeStyle = '#d4af37';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(x, cardY, cardW, cardH, 8);
    ctx.fill();
    ctx.stroke();

    try {
      const imgSrc = getThemeAssetPath(themeId, drawn.card.image);
      const img = await loadImage(imgSrc);
      if (drawn.reversed) {
        ctx.translate(x + cardW / 2, cardY + cardH / 2);
        ctx.rotate(Math.PI);
        ctx.drawImage(img, -cardW / 2, -cardH / 2, cardW, cardH);
      } else {
        ctx.drawImage(img, x, cardY, cardW, cardH);
      }
    } catch {
      ctx.font = '48px serif';
      ctx.fillStyle = '#6b3fa0';
      ctx.textAlign = 'center';
      ctx.fillText('✦', x + cardW / 2, cardY + cardH / 2 + 16);
    }
    ctx.restore();

    const nameY = cardY + cardH + 30;
    ctx.font = '600 14px Cinzel, serif';
    ctx.fillStyle = '#f0d060';
    ctx.textAlign = 'center';
    const name = lang === 'zh' ? drawn.card.nameZh : drawn.card.name;
    ctx.fillText(name, x + cardW / 2, nameY);

    ctx.font = 'italic 11px "Crimson Pro", serif';
    ctx.fillStyle = '#a89cc0';
    const orientation = drawn.reversed
      ? (lang === 'zh' ? '逆位' : 'Reversed')
      : (lang === 'zh' ? '正位' : 'Upright');
    ctx.fillText(orientation, x + cardW / 2, nameY + 18);
  }

  const keywords: string[] = [];
  for (const drawn of drawnCards) {
    const kw = drawn.reversed ? drawn.card.keywordsReversed : drawn.card.keywords;
    keywords.push(...kw.slice(0, 2));
  }

  const kwY = cardY + cardH + 70;
  ctx.font = 'italic 14px "Crimson Pro", serif';
  ctx.fillStyle = '#f4e4bc';
  ctx.textAlign = 'center';

  const kwText = keywords.join(' · ');
  const lines = wrapText(ctx, kwText, CARD_WIDTH - 80);
  lines.forEach((line, i) => {
    ctx.fillText(line, CARD_WIDTH / 2, kwY + i * 22);
  });

  ctx.font = '11px "Crimson Pro", serif';
  ctx.fillStyle = 'rgba(212, 175, 55, 0.5)';
  ctx.textAlign = 'center';
  ctx.fillText('mystic-tarot.app', CARD_WIDTH / 2, CARD_HEIGHT - 30);

  return new Promise(resolve => {
    canvas.toBlob(blob => resolve(blob), 'image/png');
  });
}

function wrapText(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] {
  const words = text.split(' ');
  const lines: string[] = [];
  let currentLine = '';

  for (const word of words) {
    const test = currentLine ? `${currentLine} ${word}` : word;
    if (ctx.measureText(test).width > maxWidth) {
      if (currentLine) lines.push(currentLine);
      currentLine = word;
    } else {
      currentLine = test;
    }
  }
  if (currentLine) lines.push(currentLine);
  return lines;
}
