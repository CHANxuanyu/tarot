# Deployment Guide

Tarot Oracles is a static Vite application. It can be deployed anywhere that can serve the generated `dist/` folder.

## Build Command

Install dependencies:

```bash
npm install
```

Build the production site:

```bash
npm run build
```

The output directory is:

```txt
dist/
```

Preview locally:

```bash
npm run preview
```

## Vercel

Recommended settings:

```txt
Framework Preset: Vite
Build Command: npm run build
Output Directory: dist
Install Command: npm install
```

Steps:

1. Push the repository to GitHub, GitLab, or Bitbucket.
2. Import the repository in Vercel.
3. Keep the Vite defaults.
4. Deploy.

No environment variables are required for the default template. The local structured reading engine does not use a backend or AI API.

The optional BYOK AI Enhanced Reading feature also does not require deployment-time secrets. Users enter their own OpenAI-compatible API key in the browser if they choose to use it.

## Netlify

Recommended settings:

```txt
Build command: npm run build
Publish directory: dist
```

Steps:

1. Push the repository to your Git provider.
2. Create a new Netlify site from the repository.
3. Set the build command to `npm run build`.
4. Set the publish directory to `dist`.
5. Deploy.

Optional `netlify.toml`:

```toml
[build]
  command = \"npm run build\"
  publish = \"dist\"

[[redirects]]
  from = \"/*\"
  to = \"/index.html\"
  status = 200
```

The redirect is useful because the app uses client-side routing.

## GitHub Pages

GitHub Pages can host the built static files, but path configuration matters.

### Option A: Deploy from `dist/` with a GitHub Action

Use a workflow that:

1. Installs dependencies.
2. Runs `npm run build`.
3. Uploads `dist/` as the Pages artifact.

Example:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

### Option B: Repository subpath

If deploying to:

```txt
https://<user>.github.io/<repo>/
```

you may need to configure Vite `base` in:

```txt
vite.config.ts
```

Example:

```ts
export default defineConfig({
  base: '/<repo>/',
  plugins: [react()],
});
```

Only do this for subpath deployment. For custom domains or root deployments, `/` is usually correct.

## Static Asset Paths

Most app assets are stored under:

```txt
public/
```

Important folders:

```txt
public/assets/images/
public/themes/classic-mystic/
```

Vite copies `public/` assets into the build output. Files referenced with absolute paths like:

```txt
/assets/images/...
/themes/classic-mystic/...
```

work well on root-domain deployments.

For GitHub Pages subpath deployments, test asset loading carefully. If assets fail to load, configure `base` in `vite.config.ts` and prefer Vite-compatible asset path handling for future customizations.

## Client-Side Routing

The app uses React Router. Static hosts should serve `index.html` for unknown routes.

Vercel usually handles this automatically for Vite projects.

For Netlify, add the redirect shown above.

For other static servers, configure a fallback to:

```txt
/index.html
```

## No Backend Required

The default template does not need:

- Serverless functions
- API routes
- Database connections
- Authentication services
- AI API keys for the default local reading experience
- Secret environment variables

All tarot reading reports are generated locally from static data and browser-side TypeScript logic.

## Optional BYOK AI Deployment Notes

The AI Enhanced Reading panel is optional and disabled by default. It is designed for browser-side BYOK usage:

- The site owner does not provide a shared API key.
- No API key should be committed to the repository.
- No API key is required in Vercel, Netlify, GitHub Pages, or other hosting environment variables.
- Users may enter their own OpenAI-compatible API key in the browser.
- The key is stored only in the user's browser `localStorage`.
- Requests are sent directly from the browser to the configured provider.

Security and compatibility limitations:

- Browser-side BYOK is not a secure proxy.
- Do not use sensitive organization-level provider keys.
- Some providers may reject browser requests because of CORS policy.
- If AI generation fails or no key is provided, local structured readings continue to work normally.

If you need centralized secrets, usage metering, account-level access control, or provider-side key protection, you would need to add your own backend or serverless proxy. That is outside the default static template.

## Deployment Checklist

Before publishing:

1. Run:

   ```bash
   npm run build
   ```

2. Preview locally:

   ```bash
   npm run preview
   ```

3. Check these routes:

   ```txt
   /
   /reading
   /learn
   /calendar
   /about
   ```

4. Switch through all supported languages:

   ```txt
   zh-CN
   en-US
   fr-FR
   es-ES
   ```

5. Confirm card images and zodiac images load.

6. Confirm single-card, three-card, and Celtic Cross readings render.

7. Confirm copy and save actions work in the browser.

8. Optional: enable AI reading with a non-sensitive test key and confirm your chosen provider supports browser CORS.