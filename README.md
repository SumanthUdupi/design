# Design Portfolio (Next.js)

Minimal Next.js scaffold implementing the project's design system foundation: colors, typography, a Hero and About component.

Getting started

1. Install dependencies

```powershell
npm install
```

2. Run development server

```powershell
npm run dev
```

3. Run tests

```powershell
npm run test
```

Note: Tests use Jest and `babel-jest`. Install dev dependencies with `npm install` before running tests.

This scaffold provides a starting point. Follow the `plan/` markdown files for requirements and next implementation steps.

Self-hosting fonts (recommended)

1. Create a `public/fonts` folder in the project root.
2. Download or generate WOFF2 subset files for the fonts used (recommended subsets limited to Latin characters). Suggested filenames used by the app:
   - `Inter-400-subset.woff2` (Inter regular subset)
   - `Inter-600-subset.woff2` (Inter semibold subset)
   - `Fraunces-600-subset.woff2` (Fraunces semibold subset)
   - `Fraunces-700-subset.woff2` (Fraunces bold subset)

   You can create subset WOFF2 files using Google Fonts downloads or tools like `google-webfonts-helper`. Place the files into `public/fonts`.

3. The app now prefers local WOFF2 files when present and will automatically fall back to Google Fonts for developer convenience if the files are missing. This avoids build failures while allowing self-hosting in production.

Notes: Self-hosting improves privacy and performance (you control preload and caching). After placing fonts, consider verifying in a browser and using `font-display: swap` (already configured) so text remains visible during font load.
