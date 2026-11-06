# compaz

PWA that finds optimal routes on La Paz's teleférico network. Vite + React 19 + TypeScript, Firebase hosting, i18n (`en`, `es`).

Mobile is the main target: design and verify every UI change for small touch screens first.

## Verify

- `npm test`: lint (`--max-warnings=0`), prettier, then vitest. Run before finishing any change.
- `npm run build`: runs `tsc`, so type errors surface here.
- Cypress, Chromatic and `npm run pre-commit` belong to CI and the human (they need secrets and a Chromatic token).
- Node 24 (`.nvmrc`, `engines`). `@types/node` stays on 24 to match the runtime; bump it together with Node.
- Lint uses plugin `recommended` presets (airbnb was dropped) on ESLint 10, with `@eslint-react`, `eslint-plugin-import-x` and `eslint-plugin-jsx-a11y-x` (the maintained forks) instead of the stale `eslint-plugin-react`, `-import` and `-jsx-a11y`. `react-hooks` 7 compiler rules are errors: fix hits in code (derive state instead of `setState` in effects), do not disable.
- `npm start` serves on port 3000 and opens a browser. The PWA service worker caches builds, so a stale UI after `start:pwa` means hard-reload or clear site data.

## Layout

- `src/app/components/{atoms,molecules,organisms,pages}`: atomic design. Providers (`NavigationProvider`, `FirebaseProvider`) and hooks live beside them.
- Each component folder holds `Foo.tsx` (presentational), `FooContainer.tsx` (state and logic, when present), `Foo.module.css`, `Foo.stories.tsx`, `Foo.spec.tsx`.
- `data/stations.json` and `data/lines.json` are the network graph, consumed by `FirebaseProvider`. Edit them only on explicit request, keeping `connectedStations`, `stationsPath` and `connectedLines` consistent.
- `cypress/page_objects` back the e2e journeys in `cypress/e2e`.

## Conventions

- Test behavior through React Testing Library; select by role first. New tests are named `SHOULD ... WHEN ...` (older ones use plain names). Mock providers with `vi.spyOn`.
- Every new presentational component ships with a story.
- Accessibility is a product value: UI meets WCAG AA, with semantic HTML and full keyboard and screen-reader support (`jsx-a11y` is enforced).
- Add every user-facing string to both `src/app/i18n/translation/en.json` and `es.json`.
- In-progress UI work goes behind a feature flag (`src/app/featureFlag`, enabled with `?flagName` in the URL, persisted in localStorage). The MUI migration (`replaceInputsWithMui`) is in progress: convert only the component you are touching.
- Keep secrets out of reach: `.env` holds API keys, so leave it unread and uncommitted.

## Gotchas

- `typescript` stays on `^6`, not 7: the 7.0 npm package has no JS API, and `typescript-eslint` (8.72.x) peers on `<6.1.0`, so lint and Storybook docgen break. Revisit when typescript-eslint supports the TS 7.1 API.

## Git

- Work on `main` with short imperative messages and no ticket prefix.
- `release:*` push and bump versions; the human runs them.

## Agent skills

### Issue tracker

GitHub Issues on `marduzca/compaz`, via `gh`. See `docs/agents/issue-tracker.md`.

### Domain docs

Single-context: `GLOSSARY.md` and `docs/adr/` at the repo root. See `docs/agents/domain.md`.
