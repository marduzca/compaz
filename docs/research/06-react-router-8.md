# react-router 7.18 → 8.5 (Declarative mode)

Sources (primary only):
- [Upgrade guide v7→v8](https://reactrouter.com/upgrading/v7)
- [CHANGELOG v8.0.0](https://github.com/remix-run/react-router/blob/main/packages/react-router/CHANGELOG.md) (release page links to it: https://github.com/remix-run/react-router/releases/tag/react-router%408.0.0)
- npm metadata for `react-router@8.5.0` (`npm view`): `engines.node >=22.22.0`; peers `react`/`react-dom >=19.2.7`, `@types/react`/`@types/react-dom >=19.2.0`; deps `cookie-es`, `@remix-run/route-pattern`.

We use Declarative mode only (`BrowserRouter`, `Routes`, `Route`, `Link`, `useLocation`, `useNavigate`, `MemoryRouter`, `Router`). No data router, loaders, `meta`, `useMatches`, framework mode, or `react-router-dom`.

## Confirmed blockers / required changes

1. **Node ≥ 22.22** (upgrade guide "Minimum Versions"; CHANGELOG v8.0.0 "Update minimum Node version to 22.22.0").
   Our CI pins `node-version: 20` in 6 jobs: `.github/workflows/test_and_deploy.yml:20,52,75,112,166,228`. Fix: bump all to `22.22` or newer, and the local Node and the Cypress/Storybook jobs too. Note: package.json has no `engines` field.
2. **React ≥ 19.2.7 / react-dom ≥ 19.2.7** (same sources). `package.json:39-40` has `^19.0.0`. This is satisfied only if the lockfile resolves ≥ 19.2.7, so run `npm i react@^19.2.7 react-dom@^19.2.7` first. `@types/react` `^19.0.10` (`package.json:68-69`) → raise to `^19.2.0` (peer ≥ 19.2.0).
3. **ESM-only package** (CHANGELOG v8.0.0, "Switch the published packages to ESM-only"). We are Vite/vitest (ESM), and the `react-router` imports are all ESM named imports, so no change is expected. Verify that vitest does not hit a CJS `require` path. This is unconfirmed until the tests run.

## Checked and NOT affecting us
- `react-router-dom` removal: no usage. `grep` finds only `'react-router'` imports (`src/index.tsx:5`, `src/app/App.tsx:2`, and others). `react-router-dom` is not in package.json.
- `v8_middleware`, `v8_passThroughRequests`, `v8_trailingSlashAwareDataRequests`, `v8_splitRouteModules`, `v8_viteEnvironmentApi`: these are Framework/Data-only. There is no `createBrowserRouter`, no `loader`/`action`, and no `@react-router/dev`.
- `meta`/`useMatches` `data`→`loaderData`: unused.
- Vite 7 requirement: Framework mode only. We use Vite `^6.0.0` (`package.json:46`) with no react-router Vite plugin (`vite.config.mts` has no react-router reference), so there is no constraint.
- `firebase.json:20-25`: the SPA rewrite `** → /index.html` is unaffected. `.data` URLs exist only in Framework mode.
- PWA (`vite.config.mts:6,14-17`, VitePWA/workbox): no router coupling and no change. Check only that the workbox navigation fallback still serves `index.html`, which is unchanged by the router.
- TypeScript: the package is built with TS 6, with "runtime/public API unchanged". Our TS 5.9 is not an stated minimum, but check `tsc` against the new `.d.ts` files. Unverified until run.

## Specs / stories (hands-on checks, not confirmed breaks)
- `MemoryRouter` in specs: `NavigationPage.spec.tsx:5,143`, `MenuContainer.spec.tsx:4`, `TripSelectorContainer.spec.tsx:5`. Stories: `MobileHeader/Menu/MenuLink/AboutPage/TripSelector/NavigationPage .stories.tsx`. The upgrade guide lists no Declarative API change, so no edits are expected.
- `Router` with `history`'s `createMemoryHistory` in `MobileHeader.spec.tsx:3-4,16,34` and `MenuContainer.spec.tsx:4`. The guide and v8.0.0 changelog list no change to `<Router location navigator>`. This is the highest-risk spot because it relies on the `history@5` object shape (`package.json:88`) as a `navigator`. Run these specs first after the bump. Fallback: switch to `MemoryRouter` plus `initialEntries` and assert on a `useLocation` probe.
- No stories decorators outside the per-story `MemoryRouter` usage (no `.storybook` references to react-router found).

## Go / no-go

**GO, conditional on the toolchain bump.** There are no source code changes from the confirmed breaking changes. The cost is infrastructure: Node 20 → ≥22.22 in CI and locally, React ≥ 19.2.7, and `@types/react` ≥ 19.2. Suggested order: (1) bump Node/React/types and run the suite on react-router 7.x; (2) bump `react-router` to `^8.5.0`; (3) run vitest (watch the `Router`/`history` specs), `tsc`, lint, Storybook build, and a PWA build smoke test.
