# Mystic Tarot — Theme Creation Guide

## Overview

Themes are self-contained folders in `public/themes/<theme-id>/`. Switching themes requires **zero code changes** — only JSON files and image assets.

## Theme Structure

```
public/themes/<your-theme-id>/
├── theme.json        # Colors, fonts, metadata
├── cards.json        # 22 card definitions (names, keywords, image paths)
├── copy.json         # All UI text in supported languages
├── spreads.json      # Spread layout definitions
└── assets/
    ├── back.svg      # Card back design (200×320px)
    └── cards/        # 22 card face images
        ├── 00-fool.svg
        ├── 01-magician.svg
        ├── ...
        └── 21-world.svg
```

## File Specifications

### theme.json

```json
{
  "id": "your-theme-id",
  "name": "Display Name",
  "colors": {
    "bg": "#1a0f2e",
    "bgSecondary": "#2d1b4e",
    "gold": "#d4af37",
    "goldLight": "#f0d060",
    "parchment": "#f4e4bc",
    "purple": "#6b3fa0",
    "purpleLight": "#9b6fd0",
    "text": "#f4e4bc",
    "textMuted": "#a89cc0",
    "cardBack": "#2d1b4e",
    "cardBorder": "#d4af37",
    "shadow": "rgba(212, 175, 55, 0.3)"
  },
  "fonts": {
    "display": "'Cinzel', serif",
    "body": "'Crimson Pro', serif"
  },
  "cardBack": "assets/back.svg"
}
```

| Color Key | Usage |
|-----------|-------|
| `bg` | Main page background |
| `bgSecondary` | Cards, panels, secondary areas |
| `gold` | Primary accent (titles, borders, buttons) |
| `goldLight` | Hover states, highlights |
| `parchment` | Card face background |
| `purple` | Secondary accent |
| `text` | Body text |
| `textMuted` | Subtitles, hints |
| `cardBack` | Card back background |
| `cardBorder` | Card border color |
| `shadow` | Box shadow / glow color |

### cards.json

```json
{
  "deck": "my-deck-name",
  "cards": [
    {
      "id": 0,
      "name": "The Fool",
      "nameZh": "愚者",
      "keywords": ["beginnings", "innocence", "spontaneity"],
      "keywordsReversed": ["recklessness", "fear", "holding back"],
      "image": "assets/cards/00-fool.svg"
    }
  ]
}
```

**Rules:**
- Must have exactly 22 cards (ids 0–21)
- `image` path is relative to the theme folder
- `keywords` and `keywordsReversed` must each have 3 items
- Names can be completely re-themed (e.g., "The Hacker" instead of "The Magician")

### copy.json

Contains all UI text in both English and Chinese. Key template variables:
- `{name}` — card name
- `{position}` — spread position label (Past/Present/Future)
- `{keyword1}`, `{keyword2}`, `{keyword3}` — keywords from cards.json

### spreads.json

```json
{
  "spreads": [
    {
      "id": "three-card",
      "name": "Three Card Spread",
      "nameZh": "三张牌阵",
      "positions": 3,
      "layout": [
        { "label": "Past", "labelZh": "过去", "x": 0, "y": 0 },
        { "label": "Present", "labelZh": "现在", "x": 1, "y": 0 },
        { "label": "Future", "labelZh": "未来", "x": 2, "y": 0 }
      ]
    }
  ]
}
```

## Card Image Specs

- Format: SVG preferred (scales perfectly), PNG/JPG also supported
- Size: 200×320px (5:8 aspect ratio)
- Card back: Same dimensions

## Quick Start: Create a New Theme

1. Copy an existing theme folder:
   ```bash
   cp -r public/themes/classic-mystic public/themes/my-theme
   ```

2. Edit `theme.json` — change `id`, `name`, and colors

3. Replace card images in `assets/cards/`

4. Update `cards.json` with your card names and keywords

5. Update `copy.json` with your UI text and interpretation templates

6. Switch to your theme in the app's theme selector

## Tips

- **Font loading**: If using custom fonts, add them via Google Fonts import in your theme's CSS or use system fonts for zero-latency loading
- **Color contrast**: Ensure text colors have sufficient contrast against background
- **SVG optimization**: Use SVGO to minimize SVG file sizes
- **Testing**: Switch between themes to verify all text fits and colors work in both dark/light modes
