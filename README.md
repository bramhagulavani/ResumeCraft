# ResumeCraft

ResumeCraft is a starter Next.js application (App Router) for building a resume/CV builder UI and dashboard.

**Status — What’s done so far**
- **Project initialized**: Bootstrapped with `create-next-app` (App Router + TypeScript ready).
- **App structure**: `app/` directory with top-level pages and sub-pages: `builder`, `dashboard`, and `templates`.
- **Layout components**: Basic layout components exist under `components/layout/` (for example `Sidebar.tsx` and `Topbar.tsx`).
- **Styling**: Global styles in `app/globals.css`; PostCSS and Tailwind are present in the project config.
- **Tooling**: TypeScript, ESLint, and Tailwind CSS are installed as dev dependencies.
- **Package scripts**: Standard Next.js scripts (`dev`, `build`, `start`, `lint`) are configured in `package.json`.

**Project structure (high level)**
- `app/` — application routes and layouts
- `app/builder` — resume builder page
- `app/dashboard` — dashboard page
- `app/templates` — templates page
- `components/layout/Sidebar.tsx` — sidebar layout component
- `components/layout/Topbar.tsx` — topbar / header component
- `public/` — static assets
- `app/globals.css` — global stylesheet

**Dependencies (from package.json)**
- `next` 16.x, `react` 19.x, `react-dom` 19.x
- Dev deps include `typescript`, `eslint`, `tailwindcss`, and related PostCSS tooling

## Commands you ran (from terminal history)
- `npx create-next-app@latest .` — created/initialized the project in this folder (seen in terminal history).

## Useful scripts (available in `package.json`)
- `npm run dev` — start development server (hot-reload)
- `npm run build` — build production assets
- `npm run start` — start the production server after build
- `npm run lint` — run ESLint

## Run locally
1. Install dependencies:

```bash
npm install
```

2. Start dev server:

```bash
npm run dev
# open http://localhost:3000
```

## Next steps (suggested)
- Implement form UI and state for the builder page.
- Wire templates to preview/export resume output.
- Add tests and CI (optional).

If you want, I can commit this README update and run the dev server locally next.
