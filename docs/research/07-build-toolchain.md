# Build toolchain batch: vite 8 / vitest 5 / plugin-react 6 / vite-plugin-pwa 2 / svgr 5 / tsconfig-paths 6 / jsdom 31

Date of research: 2026-11-06. Only primary sources were used: the npm registry (`https://registry.npmjs.org/<pkg>/<version>`, abbreviated "npm:<pkg>@<ver>"), the official migration guides, GitHub releases/changelogs and GitHub advisories. Nothing was installed. `npm audit` was run read-only against the existing lockfile.

Repo baseline: `vite` 6.4.5, `vitest` 3.2.7 (with `tinypool` 1.1.1), `jsdom` 26.1.0, `@storybook/react-vite` 9.1.21 (`package-lock.json`). Local Node is 22.23.4. CI pins `node-version: 20` in all 6 jobs (`.github/workflows/test_and_deploy.yml:20,52,75,112,166,228`). There is no `engines` field in `package.json` and no `.nvmrc`.

## 1. Headline findings

1. **The full batch as specified cannot ship on this repo's CI Node 20.** Vitest 5 needs Node `^22.12 || ^24 || >=26` (npm:vitest@5.1.0 `engines`; https://vitest.dev/guide/migration/ "Vitest 5.0 requires Vite >= 6.4.0 and Node.js >= 22.12.0"). jsdom 31 needs `^22.22.2 || ^24.15.0 || >=26` (npm:jsdom@31.0.0 `engines`; https://github.com/jsdom/jsdom/releases/tag/v30.0.0).
2. **Every vitest-related security advisory is fixed by Vitest 4.1.12, which still supports Node 20.** Vitest 5 is not required for security. Details in section 2.
3. **vite-plugin-pwa 2.0 does NOT fix the workbox-build advisory chain.** It still depends on `workbox-build ^7.4.1`, which is already the latest workbox-build. See section 2.
4. **Vite 8 forces a Storybook bump to 10.2.19 or later.** The installed 9.1.21 peers `vite ^5 || ^6 || ^7` only. The Storybook 10 work is already covered in `docs/research/03-storybook-10.md`.
5. **Jumping straight to Vite 8 is fine.** There is no need to land Vite 7 first. See section 3.

## 2. Security: which upgrade resolves which advisory

Audit output (`npm audit --json` on the current lockfile) flags the following. Advisory data is from the GitHub advisory API.

| Advisory | Package and vulnerable range | First patched | Fixed by |
|---|---|---|---|
| GHSA-5gmw-xhrv-c9v3 (CRITICAL, tinypool prototype pollution to RCE via worker options) https://github.com/advisories/GHSA-5gmw-xhrv-c9v3 | `tinypool <= 2.1.0` | 2.1.1 | **Vitest 4.x**. Vitest 4 removed tinypool entirely (https://v4.vitest.dev/guide/migration "Pool Rework": "we've completely removed Tinypool"). `npm:vitest@4.1.12` dependencies contain no `tinypool`; neither does 5.1.0. The repo currently resolves `tinypool` 1.1.1 via vitest 3.2.7 (`npm ls`). |
| GHSA-85c8-ppgw-ccpr (CRITICAL, tinypool `run()` options RCE) https://github.com/advisories/GHSA-85c8-ppgw-ccpr | `tinypool < 2.1.2` | 2.1.2 | Same as above: **Vitest 4.x** removes the dependency. |
| GHSA-82fw-gwwq-j7x9 (MEDIUM, `@vitest/mocker` redirect-mock path traversal) https://github.com/advisories/GHSA-82fw-gwwq-j7x9 | `vitest` and `@vitest/mocker` `>= 2.1.0, < 4.1.11` and `>= 5.0.0-beta.1, < 5.0.0-rc.2` | 4.1.11 / 5.0.0-rc.2 | **Vitest >= 4.1.11** (or >= 5.0.0-rc.2) |
| GHSA-qxg6-89mg-rqv8 (MEDIUM, code injection via manual mock registration) https://github.com/advisories/GHSA-qxg6-89mg-rqv8 | `@vitest/mocker >= 2.1.0-beta.7, < 4.1.12` and `>= 5.0.0-beta.1, < 5.0.3` | 4.1.12 / 5.0.3 | **Vitest >= 4.1.12** (or >= 5.0.3) |
| `vitest` CRITICAL (audit rollup of the above) | `0.0.95 - 4.1.10` | n/a | **Vitest 4.1.12 resolves it.** The audit's "fix: vitest 5.1.0" is just `fixAvailable` pointing at the latest major. 4.1.12 sits outside the flagged range, and its `@vitest/mocker` is `4.1.12` (npm:vitest@4.1.12). |
| `vite-plugin-pwa` moderate, via `workbox-build` (`glob` GHSA-3g3m-2fjr-6pw4 https://github.com/advisories/GHSA-3g3m-2fjr-6pw4, plus `@rollup/plugin-node-resolve` via `deepmerge`, low) | `workbox-build >=6.0.0-alpha.0`; `glob 9.0.0 - 14.0.1`, patched in 14.0.2 | glob 14.0.2 | **NOT resolved by vite-plugin-pwa 2.0.** npm:vite-plugin-pwa@2.0.0 depends on and peers `workbox-build ^7.4.1`. npm:workbox-build@7.4.1 is the `latest` dist-tag (published 2026-05-04) and depends on `glob ^11.0.1`, in the vulnerable range. The audit shows `fixAvailable: true` for this entry, but I could not verify a concrete fix without installing. Options: (a) accept it. The chain is dev/build-time only and the advisory concerns `AbortSignal` cancellation in `glob`, which workbox-build does not use (inference, not verified). (b) Add an npm `overrides` for `glob` at `^14.0.2` and verify `npm run build` still generates the SW. Workbox 7.4.1 calls glob v11 APIs and I did not check v14 compatibility. Do not claim this advisory as resolved by the batch. |
| `glob` via `@storybook/react-vite` / docgen (`glob@10.5.0`) | moderate | n/a | Out of batch. See `docs/research/03-storybook-10.md`. |

Other audit entries (`firebase`, `@grpc/grpc-js`) are out of scope for this batch.

Note on `vite` and `esbuild`: the audit has no `vite` or `esbuild` entries for the installed vite 6.4.5. Vite 8 is therefore not needed for security.

## 3. Coupling graph (peer ranges and engines from npm)

| Package | Version | Node engine | `vite` peer | Other peers |
|---|---|---|---|---|
| vite | 8.3.6 | `^20.19.0 \|\| >=22.12.0` (npm:vite@8.3.6) | n/a | `@types/node ^20.19 \|\| >=22.12` (optional) |
| vitest | 4.1.12 | `^20 \|\| ^22 \|\| >=24` (npm:vitest@4.1.12) | `^6 \|\| ^7 \|\| ^8` | `jsdom *` (optional) |
| vitest | 5.1.0 | **`^22.12 \|\| ^24 \|\| >=26`** (npm:vitest@5.1.0) | `^6.4 \|\| ^7 \|\| ^8` | `jsdom *` (optional) |
| @vitejs/plugin-react | 4.7.0 | any | `^4.2 .. ^7` (**no Vite 8**) | none |
| @vitejs/plugin-react | 5.2.0 | `^20.19 \|\| >=22.12` | `^4.2 \|\| .. \|\| ^7 \|\| ^8` | none |
| @vitejs/plugin-react | 6.2.1 | `^20.19 \|\| >=22.12` | **`^8` only** | optional `@rolldown/plugin-babel`, `babel-plugin-react-compiler` |
| vite-plugin-pwa | 1.3.0 | `>=16` | `^3.1 .. ^8` | `workbox-build/-window ^7.4.1` |
| vite-plugin-pwa | 2.0.0 | **`>=20.19.0`** | `^3.1 .. ^8` | same; `@vite-pwa/assets-generator ^1 \|\| ^2` (optional) |
| vite-plugin-svgr | 5.2.0 | none | `>=3.0.0` | none |
| vite-tsconfig-paths | 6.1.1 | none | `*` | none |
| jsdom | 28 / 29 / 30 / 31 | `^20.19 \|\| ^22.12 \|\| >=24` / `^20.19 \|\| ^22.13 \|\| >=24` / `^22.22.2 \|\| ^24.15 \|\| >=26` / same as 30 | n/a | n/a |
| @storybook/react-vite | 9.1.21 | none | `^5 \|\| ^6 \|\| ^7` | `storybook ^9.1.21` |
| @storybook/react-vite | 10.0.0 – 10.2.18 | none | `^5 \|\| ^6 \|\| ^7` | |
| @storybook/react-vite | **>= 10.2.19** (10.6.6 latest) | none | `^5 \|\| ^6 \|\| ^7 \|\| ^8` | `storybook ^10.6.6` |

Sources: npm registry, e.g. https://registry.npmjs.org/vitest/5.1.0, https://registry.npmjs.org/jsdom/31.0.0, https://registry.npmjs.org/@vitejs/plugin-react/5.2.0, https://registry.npmjs.org/vite-plugin-pwa/2.0.0, https://registry.npmjs.org/@storybook/react-vite.

Conclusions:
- **Vite 8 requires:** `@vitejs/plugin-react` >= 5.2.0 (5.x or 6.x); Storybook >= 10.2.19; Node >= 20.19. `vite-plugin-pwa` (1.3 or 2.0), `vite-plugin-svgr` (any) and `vite-tsconfig-paths` (any) all already accept Vite 8. Vitest 3.2 is not in the table. I did not check its Vite 8 peer range and it is not needed on the recommended path.
- **No intermediate Vite 7 hop is needed.** The Vite 8 guide only says to read the v7 guide first (https://vite.dev/guide/migration, "Migration from v6"). The Vite 7 items (https://v7.vite.dev/guide/migration) are: Node 20.19+/22.12+, default `build.target` bump, Sass legacy API removal, `splitVendorChunkPlugin` removal and `transformIndexHtml` hook-level `enforce`/`transform` removal. None apply here: there is no sass/less/scss file in `src`, and `vite.config.mts:9-36` contains none of these options.
- **No intermediate Vitest 4 hop is needed for a direct jump, but Vitest 4 is the recommended stopping point on Node 20.** Vitest 4's breaking changes are a subset of what you must handle anyway (section 5).
- **vite-plugin-pwa 2.0 is only a peer-range bump.** Its release notes list one change: "allow `@vite-pwa/assets-generator ^2.0.0` as a peer dependency" (https://github.com/vite-pwa/vite-plugin-pwa/releases/tag/v2.0.0). The repo does not use the assets generator. The only practical cost is the Node >= 20.19 engine.
- **vite-plugin-svgr 5.x:** the v5.0.0 break is "drop vite 2 support" (https://github.com/pd4d10/vite-plugin-svgr/releases/tag/v5.0.0). 5.2.0's source uses `transformWithOxc` when `this.meta.rolldownVersion` is set and falls back to `transformWithEsbuild` otherwise (https://github.com/pd4d10/vite-plugin-svgr/blob/v5.2.0/src/index.ts). 4.5.0 detects `viteModule.transformWithOxc` (https://github.com/pd4d10/vite-plugin-svgr/blob/v4.5.0/src/index.ts), so it probably also works on Vite 8, but 5.x is the version that officially supports Oxc, so upgrade it with Vite 8. The `./client` types export is kept (npm:vite-plugin-svgr@5.2.0 `exports`).
- **vite-tsconfig-paths 6.x:** "No intentional breaking changes" (https://github.com/aleclarson/vite-tsconfig-paths/releases/tag/v6.0.0). **This repo does not need the plugin at all.** `tsconfig.json:1-31` has no `paths` and no `baseUrl`, and `grep` finds no non-relative `src/` or `app/` imports. The plugin is a no-op and can be removed (`vite.config.mts:4,12`). Vite 8 also has a built-in `resolve.tsconfigPaths` option, default `false` (https://vite.dev/config/shared-options#resolve-tsconfigpaths), if aliases are ever added.
- **jsdom:** Vitest 5 and jsdom 30+ both need Node >= 22.x. jsdom 28 (Node `^20.19`) is the highest that stays Node-20 compatible. jsdom 31 additionally needs `@napi-rs/canvas` instead of `canvas` if canvas is used (the repo does not use it) and has a new CSS/selector engine and parsing changes (https://github.com/jsdom/jsdom/releases/tag/v31.0.0).

## 4. Repo findings (confirmed only)

### Confirmed breaking: Vitest 4 constructor mocks (fix needed)

- `src/app/components/hooks/useMapFitBounds/useMapFitBounds.spec.ts:12-19` defines `Map: vi.fn().mockImplementation(() => ({...}))`. `:20-22` defines `LatLngBounds: vi.fn().mockImplementation(() => ({ extend: vi.fn() }))`. Both are arrow functions that get called with `new`: the spec at `:45,57,67,107,118` calls `new google.maps.Map()`, and the code under test at `src/app/components/hooks/useMapFitBounds/useMapFitBounds.ts:40` calls `new window.google.maps.LatLngBounds()`.
- Vitest 4: "all mocks called with a `new` keyword construct the instance ... if you provide an arrow function, you will get `<anonymous> is not a constructor`" (https://v4.vitest.dev/guide/migration "`spyOn` and `fn` Support Constructors").
- Also `src/app/components/organisms/map/currentLocationMarker/CurrentLocation.spec.tsx:19` (`Map: vi.fn()` with no implementation) is used at `:89` as `new google.maps.Map()`. A plain `vi.fn()` is constructible, so this one should be fine.
- **Fix:** replace the two arrows with `function` implementations. For example `vi.fn().mockImplementation(function () { return { fitBounds: fitBoundsMock, panBy: panByMock, setZoom: setZoomMock }; })`, and the same for `LatLngBounds`. A `function` returning an object is valid as a constructor.

### Confirmed repo facts that mean no change is needed

- **`vite.config.mts:27-31`** (`globals`, `environment: 'jsdom'`, `setupFiles`) uses only options that are not in either migration guide's removed or renamed lists. No `poolOptions`, `workspace`, `projects`, `coverage`, `reporters` or `deps.*` options are set. No `@vitest/coverage-*` package is installed. `npm run test:coverage` (`package.json:13`) would need one. Coverage is not part of CI.
- **Vitest 4 default `exclude` simplification** (https://v4.vitest.dev/guide/migration "Simplified exclude"): `cypress/` is no longer excluded. `cypress/e2e/*.cy.ts` does not match the default include `*.{test,spec}.*`, and there are no `.spec`/`.test` files under `cypress/`, so nothing changes.
- **Vitest 5 breaking items checked against `src`, none hit:**
  - No `vi.mock`/`vi.hoisted` is nested inside a function or `describe`. All `vi.mock(` calls are at column 0.
  - No `bench`, `sequential`, `toThrow('')`, un-awaited `resolves`/`rejects`, or `restoreAllMocks`/`restoreMocks` usage.
  - Fake timers are only used in `useTimeOfTheDay.spec.ts:10,20,30,40`, with `Date` only. The new `Temporal` mocking only matters if `Temporal` exists globally.
  - `clearMocks` now defaults to `true` (https://vitest.dev/guide/migration/ "clearMocks is Enabled by Default"). The suites already call `vi.clearAllMocks()` in hooks (9 specs). Module-level `mockReturnValue` implementations (`CurrentLocation.spec.tsx:32-34`) are preserved because only history is cleared. I found no assertion on calls recorded outside a test body.
- **`src/test/setupTests.ts:1-15`** only does `vi.fn()` stubs on `window.matchMedia` and imports jest-dom. It needs no change. Line 4 (`@testing-library/jest-dom`) duplicates line 3 (`.../vitest`) and is harmless.

### Items to check by running the suite (not confirmed breakages)

- Vitest 5 and jsdom: "Assignments to properties on `globalThis` or `window` in jsdom ... are now propagated to the underlying DOM implementation" (https://vitest.dev/guide/migration/). The suites assign to window or global in these places: `FeatureFlags.spec.ts:6-9` (`Object.defineProperty(window, 'location', ...)`), `useMapFitBounds.spec.ts:28` (`global.window.google`), `CurrentLocation.spec.tsx:44` (`navigator.geolocation`). Run `npm run only-test` after the Vitest 5 and jsdom 31 step. I could not verify these from docs.
- Vitest 4: `vi.fn().getMockName()` default changed to `vi.fn()` (snapshots containing mock names). I did not grep snapshots, so check for `__snapshots__`/`toMatchSnapshot` on test run.
- `vite.config.mts:1` has `/// <reference types="vitest" />` and imports `defineConfig` from `vite`. `tsc` in `npm run build` has `include: ["src"]` (`tsconfig.json:28-30`), so the config file is not type-checked in the build. I did not verify whether the `test` key still type-checks in editors on Vitest 5. The safe form is `import { defineConfig } from 'vitest/config'`.

### Vite 8 (Rolldown/Oxc) effects on this repo

- `vite.config.mts:9-36` sets none of the options the migration guide says are removed or renamed. It has no `esbuild`, `optimizeDeps.esbuildOptions`, `build.rollupOptions`, `manualChunks`, `build.commonjsOptions`, `css` or `resolve.alias` options. **No config change is required for Vite 8.**
- **Behavior change that does apply:** `build.target` is not set (`vite.config.mts:24-26`), so the default `baseline-widely-available` moves from Chrome 107 / Safari 16.0 to Chrome 111 / Safari 16.4 / Firefox 114 (https://vite.dev/guide/migration "Default Browser Target Change"). `package.json:95-105` browserslist is not read by Vite. For a public mobile PWA, decide whether to pin `build.target`, e.g. `'safari16'` (assumption; not verified here against Vite 8's accepted target names), if iOS < 16.4 matters.
- **Minifier change:** minification moves from esbuild to Oxc, and CSS minification to Lightning CSS (https://vite.dev/guide/migration "JavaScript Minification by Oxc"). Smoke-test the production build in a browser. `GENERATE_SOURCEMAP=false` in `package.json:8` is a CRA leftover with no effect on Vite.
- **CJS default-import interop change** (https://vite.dev/guide/migration "Consistent CommonJS Interop"): the app imports CJS-ish packages such as `dijkstrajs` (`package.json:32`) and `history`. Verify them with `vite build` and in the app. The temporary escape hatch is `legacy.inconsistentCjsInterop: true`. Treat this as a risk to verify. I did not find a concrete breakage.
- **`@vitejs/plugin-react` 6 (or 5.2):** v6 removed all Babel support (https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/CHANGELOG.md, 6.0.0-beta.0 "Remove Babel Related Features"). `react()` is called with no options (`vite.config.mts:11`), so there is nothing to migrate. `@babel/core` (`package.json:55`) is not imported anywhere in `src` or config. I did not determine whether another package needs it as a peer, so leave it.
- **`?react` SVG imports:** 47 files use `*.svg?react` (e.g. `MobileHeader.tsx:5-10`, `Combobox.tsx:4-6`) via `svgrPlugin()` (`vite.config.mts:13`), with the default `include` `**/*.svg?react`. `tsconfig.json:12` references `vite-plugin-svgr/client`, which remains exported in 5.2.0. No svgr options are passed, so there is no migration. Confirm that the SVG components render (Storybook + the test run).

### Build output and PWA service worker

- Config: `VitePWA({ registerType: 'autoUpdate', filename: 'service-worker.js', workbox: { globPatterns: [...], maximumFileSizeToCacheInBytes: 5242880 }, devOptions: { enabled: false } })` (`vite.config.mts:14-22`). This is the default `generateSW` strategy. `build.outDir` is `build` (`vite.config.mts:24-26`).
- Hosting depends on the SW file name: `firebase.json:9` sets `Cache-Control: no-cache` for `service-worker.js`, and `firebase.json:18` sets `"public": "build"`. **The file name and output directory must not change.**
- Baseline from the existing `build/` directory (built 2026-11-06): `service-worker.js` (2726 B), `workbox-9c191d2f.js` (15 KB), `registerSW.js` (registers `/service-worker.js` with scope `/`), `manifest.webmanifest`, `index.html`, `assets/`, and a precache list in `service-worker.js` (`precacheAndRoute([{url:"reset.css",revision:...},...`).
- The client side: `NotificationContainer.tsx:79` posts `{type:'SKIP_WAITING'}`. Nothing in `src` dispatches `EventType.UPDATE_AVAILABILITY` (`Notification.tsx:17`), so that update-prompt path is dead code, left over from CRA. Under `autoUpdate`, the plugin-generated SW handles updates itself. This predates the batch.

**Verification after upgrading** (run `npm run build` before and after and diff):

1. `build/service-worker.js`, a `build/workbox-*.js` chunk, `build/registerSW.js` and `build/manifest.webmanifest` exist. The build log prints `PWA v<x>`, `mode generateSW`, and `precache N entries (X KiB)`. Compare N and KiB with the baseline. `maximumFileSizeToCacheInBytes` (5 MB) should not be exceeded by any new Vite 8 chunk, otherwise workbox warns.
2. `grep -o 'precacheAndRoute(\[[^]]*' build/service-worker.js` lists index.html, `assets/*.js`, `assets/*.css`, svg/png/gif, `reset.css` and `registerSW.js`. Each asset listed must exist on disk.
3. `npm run start:pwa` (`npx serve build`), then in Chrome DevTools > Application: the SW is "activated and running", the manifest parses, and offline reload works.
4. Check that `firebase.json:9` still matches the SW file name.
5. Run `npm audit` and confirm that the `vite-plugin-pwa` and `workbox-build` entries are still there (expected, see section 2).

## 5. Required changes per step

- **Vitest 4.1.12 (on Vite 6.4, Node 20):** fix `useMapFitBounds.spec.ts:12,20` as above. Nothing else is confirmed. Vitest 4's `vite ^6 || ^7 || ^8` peer is satisfied by the installed Vite 6.4.5.
- **Vitest 5.1.0:** needs Node >= 22.12 in CI and a local Node >= 22.12 (the local 22.23.4 is fine). Needs Vite >= 6.4.0 (installed 6.4.5 is fine). Run the full suite and check the three "verify" items above. `@types/node` has the optional peer `^22 || >=24` (`package.json:67` uses `^24`, fine).
- **jsdom:** 28 is the maximum for Node 20.19+. 30/31 need Node >= 22.22.2. CI `node-version: 22` resolves to the latest 22.x in the setup-node manifest, which satisfies this (inference, not verified). The local 22.23.4 is >= 22.22.2.

## 6. Ordered plan and go/no-go

**Verdict: GO, but split. NO-GO for the batch as a single PR, because of Node 20 CI and Storybook.**

1. **PR 1 (security priority, safe on the current Node 20 CI):**
   - `vitest ^3.0.4` to `^4.1.12` (`package.json:50`; use `^4.1.12` so the floor is the patched version).
   - Fix the two arrow-function mocks in `useMapFitBounds.spec.ts`.
   - Vite stays at 6.4.x. Optionally `jsdom` 26 to 28 (Node `^20.19`).
   - Result: tinypool is removed from the tree (clears both CRITICAL advisories), and both `@vitest/mocker` advisories are patched. Run `npm run lint && npm run only-test && npm run build`, then `npm audit` to confirm the vitest, tinypool and mocker entries are gone.
2. **PR 2 (Node + Storybook prerequisites):**
   - CI to Node 22 for all 6 jobs (or at minimum 20.19+).
   - Storybook 9 to 10.6.x, with `tsconfig.json:22` `moduleResolution` set to `bundler` (per `docs/research/03-storybook-10.md`). This keeps Storybook's Vite peer ready for 8 (>= 10.2.19).
3. **PR 3 (Vite 8 group):**
   - `vite` to `^8.3`, `@vitejs/plugin-react` to `^6.2` (or `^5.2` as a lower-risk stepping stone), `vite-plugin-pwa` to `^2.0` (cosmetic bump; Node >= 20.19), `vite-plugin-svgr` to `^5.2`.
   - Remove `vite-tsconfig-paths` (unused: no `paths` in `tsconfig.json`) rather than upgrading it; if you prefer to keep it, `^6.1` is a drop-in.
   - Decide on `build.target`. Run the PWA verification checklist and the CJS-interop smoke test.
4. **PR 4 (Vitest 5 and jsdom 30/31):**
   - `vitest ^5.1`, `jsdom ^31`. Requires Node 22 CI from PR 2. Run the three "verify" items.
   - This is purely a version freshness step. All security value was already captured in PR 1.

If the team wants one single upgrade PR anyway, PRs 2, 3 and 4 can be merged into one, but PR 1 should still go out first for the CRITICAL fix.

## 7. Gaps and uncertainties

- I did not install anything or run the build or tests, so all repo impacts are from static reading. The "verify" items are risks, not confirmed breakages.
- The GitHub Actions `node-version: 20` resolves to the newest 20.x available in the runner's manifest. I did not verify that this is >= 20.19 today. Node 20 is EOL, so move CI to 22 anyway.
- I could not verify a concrete npm remediation for the `workbox-build`/`glob` audit entry (section 2). Treat it as an open item.
- Vitest 5 and jsdom 31 changelog items about DOM global propagation and the new CSS engine could only be matched to the repo by reading specs, not by running them.
