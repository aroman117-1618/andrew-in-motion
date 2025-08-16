# Andrew in Motion (Next.js Edition)

This repository contains the refreshed **Andrew in Motion** site, rebuilt from the ground up using **Next.js 14** with the App Router, React Server Components and Turbopack.  The goal of this refactor is to preserve all of the existing copy, links and structure of the original Vite/React site while introducing a biophilic, interactive background, improved accessibility and strong performance.

## Getting Started

### Prerequisites

- **pnpm** is recommended for package management.  If you don't have it installed, run:

  ```sh
  npm install -g pnpm
  ```

- Node >= 18

### Install dependencies

```sh
pnpm install
```

### Development server

To start a local development server with hot reloading, run:

```sh
pnpm dev
```

Then open <http://localhost:3000> in your browser.

### Build for production

Generate an optimized production build:

```sh
pnpm build
```

Start the production server with:

```sh
pnpm start
```

### Testing link integrity

The script `scripts/link-check.js` reads `site-map.json` and verifies that each route returns a **200/OK** status.  With the production server running on port 3000, execute:

```sh
pnpm run test:links
```

### Deployment on Netlify

Netlify will automatically detect the **Next.js** project and use the included `netlify.toml` to invoke the build.  Set the following environment variables in Netlify:

- `NETLIFY_AUTH_TOKEN` – your Netlify API token
- `NETLIFY_SITE_ID` – the ID of your Netlify site

Then deploy via the Netlify CLI or CI pipeline.  The published output is the `.next` directory.

## Technical Highlights

- **Next 14 App Router:** All pages reside under the `app/` directory and leverage React Server Components for improved streaming and caching.
- **Interactive WebGL Background:** `components/DriftBackground.tsx` implements a lightweight WebGL2 shader to create a continuous, drifting backdrop.  Pointer movement disturbs the field and tapping generates a damped ripple.  If WebGL is unavailable or the user prefers reduced motion, a CSS radial gradient fallback is used instead.
- **Animations:** Section headers and content reveal using `framer-motion` with IntersectionObserver support.  Animations are paused when the tab is hidden and respect the `prefers-reduced-motion` media query.
- **Accessibility:** Skip links, semantic landmarks and keyboard‑reachable navigation are baked in.  All interactive elements provide appropriate focus states.
- **Performance:** Turbopack compilation, Image optimization via the `next/image` component, and deferred script loading keep the initial JS footprint under **100 KB gzipped**.

## Rollback

A backup tag (`pre-redesign-20250816`) marks the state of the repository prior to the redesign.  To revert to the previous version simply check out that tag and redeploy:

```sh
git checkout pre-redesign-20250816
```

## License

This project is distributed under the terms of the MIT license.