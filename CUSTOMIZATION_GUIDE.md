# Customization Guide

This guide explains how to adapt Tarot Oracles for your own tarot brand, artwork set, language package, or static website template.

The project is intentionally local-first. Most content can be changed by editing static JSON, TypeScript data files, and CSS.

## Replace Tarot Card Artwork

Card metadata is loaded from:

```txt
public/themes/classic-mystic/cards.json
```

Each card contains fields similar to:

```json
{
  "id": 0,
  "name": "The Fool",
  "nameZh": "愚者",
  "image": "assets/cards/00-fool.png"
}
```

To replace artwork:

1. Put your new card images under a public theme asset folder, for example:

   ```txt
   public/themes/classic-mystic/assets/cards/
   ```

2. Update the `image` value in `public/themes/classic-mystic/cards.json`.

3. Keep image paths relative to the theme folder because the app resolves them through `ThemeLoader`.

Recommended image guidelines:

- Use consistent aspect ratio across all cards.
- Portrait tarot cards work best around a `2:3` or `5:8` ratio.
- Use optimized images for static deployment.
- Avoid very large source files because they increase page load time.

## Modify Tarot Meaning Data

The structured Major Arcana reading data lives in:

```txt
src/data/majorArcanaMeanings.ts
```

The report engine reads this file through:

```txt
src/core/TarotReadingEngine.ts
```

This data powers:

- Card identity
- Archetype
- Element
- Astrology association
- Mythic associations
- Upright and reversed keywords
- Symbol tags
- Essence text
- Question-domain responses
- Hidden reminders
- Action advice
- Quotes

When editing meanings:

- Keep the existing object structure intact.
- Preserve both upright and reversed fields.
- Avoid absolute claims about health, law, finance, or guaranteed outcomes.
- Keep readings reflective and symbolic.
- Run `npm run build` after edits to catch TypeScript errors.

## Modify Theme Colors and Backgrounds

Most visual styling is centralized in:

```txt
src/styles.css
```

Start with the CSS variables near the top of the file:

```css
:root {
  --bg-deep: ...;
  --bg-primary: ...;
  --gold: ...;
  --gold-bright: ...;
}
```

Common safe customizations:

- Background colors
- Gold accent colors
- Border opacity
- Font stacks
- Card shadows
- Panel backgrounds
- Responsive spacing

Shared image assets are under:

```txt
public/assets/images/
```

Theme metadata is under:

```txt
public/themes/classic-mystic/theme.json
```

Avoid changing class names unless you also update the related React components.

## Add a New Language

The current supported locales are:

- `zh-CN`
- `en-US`
- `fr-FR`
- `es-ES`

To add another locale:

1. Create a new locale file:

   ```txt
   src/i18n/locales/<locale>.ts
   ```

2. Copy the shape from `src/i18n/locales/en-US.ts`.

3. Add the locale type in:

   ```txt
   src/i18n/index.ts
   ```

4. Add the locale label in `LOCALE_LABELS`.

5. Add the translation map entry in `translations`.

6. Add the locale to the selector in:

   ```txt
   src/components/NavBar.tsx
   ```

7. If report content should be localized, update relevant locale-aware fields in:

   ```txt
   src/data/majorArcanaMeanings.ts
   src/core/TarotReadingEngine.ts
   ```

Fallback behavior is:

- Chinese falls back to the key.
- Non-Chinese locales fall back to English, then the key.

This is intentional so non-Chinese pages do not accidentally show Chinese UI copy.

## Modify Zodiac Icons

Zodiac coin icons are handled as a sprite sheet:

```txt
public/assets/images/zodiac/zodiac-baroque-coin-sheet.png
```

The sprite is used by:

```txt
src/components/MoonPhasePanel.tsx
src/components/TodayGuidance.tsx
src/pages/ZodiacCalendarPage.tsx
```

The current layout assumes a `4 x 3` sprite sheet. Positions are defined in each zodiac-related component with `background-position` values.

If you replace the sprite:

- Keep the same `4 x 3` layout, or update the sprite position arrays.
- Keep each icon centered in its cell.
- Use transparent or dark-compatible backgrounds.
- Run `npm run build`.
- Check Home and Astro Calendar after replacement.

## Extend New Tarot Spreads

Spread definitions are stored in:

```txt
public/themes/classic-mystic/spreads.json
```

The existing supported spreads are:

- Single card
- Three-card spread
- Celtic Cross

To add a new spread safely:

1. Add the spread definition to `spreads.json`.

2. Update the `SpreadId` type in:

   ```txt
   src/core/types.ts
   ```

3. Update the draw/start UI where spreads are selected.

4. Add a local report builder in:

   ```txt
   src/core/TarotReadingEngine.ts
   ```

5. Add a result component under:

   ```txt
   src/components/
   ```

6. Route the new spread in:

   ```txt
   src/components/ResultStage.tsx
   ```

7. Add i18n labels for all fixed UI text.

8. Run:

   ```bash
   npm run build
   ```

Do not add a spread only to `spreads.json` without adding a matching report and result UI. That would create an incomplete user flow.

## Optional BYOK AI Enhanced Reading

The default project does not require AI. Local structured readings are generated in the browser from local tarot data and remain fully available with no API key.

The optional AI Enhanced Reading panel is implemented in:

```txt
src/components/AiReadingPanel.tsx
src/core/AiReadingClient.ts
src/core/AiReadingPrompt.ts
src/core/AiReadingStorage.ts
src/core/AiReadingTypes.ts
```

Users can manually enable the panel on a result page and enter:

- an OpenAI-compatible provider base URL
- a model name
- their own API key

The API key is stored only in the user's browser `localStorage`. It is not committed to the repository, not bundled into the app, not added to copied report text, and not saved into reading history.

Important browser-side BYOK limitations:

- This is not a secure backend proxy.
- Requests are sent directly from the user's browser to the configured provider.
- Do not use sensitive organization-level keys.
- Some providers may block direct browser requests because of CORS policy.
- If the request fails, the local structured report still works.

To customize the AI behavior:

- Edit default settings in `src/core/AiReadingStorage.ts`.
- Edit prompt boundaries in `src/core/AiReadingPrompt.ts`.
- Edit UI copy in `src/i18n/locales/`.

Keep the prompt cautious and reflective. Do not present AI output as a guaranteed outcome, professional advice, or a replacement for the local reading engine.

## Files to Avoid Editing Casually

These files are central to the reading flow:

```txt
src/store/DivinationContext.tsx
src/core/DivinationEngine.ts
src/core/ThemeLoader.ts
src/components/ShuffleStage.tsx
src/components/SpreadStage.tsx
src/components/ResultStage.tsx
```

Only modify them when changing the flow intentionally.

These files are central to report generation:

```txt
src/core/TarotReadingEngine.ts
src/data/majorArcanaMeanings.ts
```

Small text/data edits are fine, but structural changes should be tested carefully.

These files are central to i18n:

```txt
src/i18n/index.ts
src/i18n/I18nContext.tsx
src/i18n/locales/
```

When adding UI text, add translation keys instead of hardcoding strings in components.

## Static-Only Design Notes

Tarot Oracles does not require:

- A backend server
- A database
- A shared API key
- An AI API for the default local reading experience
- Runtime translation services

The app runs from static files. Reading reports are generated locally in the browser from structured data and deterministic templates. Optional BYOK AI readings can be enabled by users in their own browser, but they are not required for the template to run.