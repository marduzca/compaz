# Research 10: cypress 15.21 → 16.2

Sources (primary): [Migration guide 16.0](https://docs.cypress.io/app/references/migration-guide), npm registry metadata for `cypress@16.2.0` (https://registry.npmjs.org/cypress/16.2.0) and `start-server-and-test` (https://registry.npmjs.org/start-server-and-test/latest). Note: I read the migration guide in full up to the cookie-queries section only (the page was truncated). The remaining items (`Cypress.env`, `cy.end`, `cy.exec`, `viewport*`, `experimentalSourceRewriting`, CoffeeScript, CT minimums) were taken from its summary table and verified by grep as absent.

## Confirmed breaking change affecting us

### 1. Node 20 dropped (BLOCKER)
- Docs: "Cypress 16 requires Node.js 22.x, 24.x, or 26.x and above... Node.js 20 and Node.js 25 are no longer supported" (https://docs.cypress.io/app/references/migration-guide#Nodejs-20-and-25-no-longer-supported).
- npm: `cypress@16.2.0` engines `node: ^22.0.0 || ^24.0.0 || >=26.0.0` (https://registry.npmjs.org/cypress/16.2.0).
- Repo: `.github/workflows/test_and_deploy.yml` has `node-version: 20` at lines 20, 52, 75, 112, 166, 228. Cypress runs at lines 92/95 (`cypress install`, `npm run ci:cypress-run`), 178/181 and 240/243.
- No `.nvmrc`, `.node-version` or `engines` field in the repo.
- Fix: set `node-version: 24` (or 22) in the Cypress jobs. For consistency, set it in all jobs, since the build and unit-test jobs share the `node_modules` cache.
  - `@types/node` is already `^24` (package.json:67), so Node 24 fits.
  - Check the Vite 6, vitest and firebase tooling on Node 24 in the same PR.

### 2. start-server-and-test (no change needed, but note the version)
- package.json:92 pins `^2.0.3` (lockfile 2.1.5), not v3. Script: package.json:23 `start-server-and-test start http://localhost:3000 cypress:ci`.
- The latest published version is 3.0.13, with engines `^22 || >=24`. The Node 22+ minimum matches Cypress 16.
- v2 has no Node-engine conflict with Cypress 16 as far as I can tell. Upgrading it to v3 is optional, and it needs Node 22+ anyway. If you bump it, do it in a separate PR.
- Verified only from npm engines. I did not read the v3 changelog.

## Checked and NOT affected (grep-confirmed, no matches)
- `Cypress.env` / `cy.env` / `Cypress.config(` / `cy.exec` / `cy.end` / `.end()`: none in `cypress/` or `cypress.config.ts`.
- `cy.getCookie*`, `cy.intercept`, `httpVersion`, `Cypress.isBrowser`: none.
- `experimental*`, `execTimeout`, `allowCypressEnv`: none in `cypress.config.ts:1-19`.
- `.coffee` files: none.
- Component testing: not used, so the Angular/Vite/Next minimums are irrelevant.
- `blockHosts`/`viewportWidth`/`viewportHeight` appear only as static config (`cypress.config.ts:5-6,17`). The breaking change covers only setting them via `Cypress.config()` during test execution.
- `CYPRESS_BASE_URL` is used in the workflow (lines 181, 243). It is a built-in config override, not `Cypress.env`, so it still works (`CYPRESS_*` populate env only for non-config keys).
- `cypress-io/github-action` is not used. The workflow calls the npm scripts directly.
- Browser: no browser is specified, so the default is Electron, which is only "deprecated" in 16 (https://docs.cypress.io/app/references/migration-guide, table). If the runner uses Electron, the native-network change does not apply. If Chrome is picked, see risk below.
- `cypress/tsconfig.json`: `types: ["cypress"]` with ES5 target. Nothing in the guide requires a change. I did not verify the TS minimum for 16.2 (npm lists it as a peer or optional dependency; I did not check it). The repo uses TS 5.9.

## Behaviour changes to watch (flag only; no code change unless CI fails)
- `keystrokeDelay` default 10 → 0 (https://docs.cypress.io/app/references/migration-guide#Default-keystrokeDelay-changed-from-10-to-0). `.type()` is used in `cypress/page_objects/contact.ts:2`, `tripSelector.ts:10-11` and `page.ts:18` (`delay: keypressDelay`, optional, so `undefined` means the default). If the date/time inputs or the contact form turn out flaky, add `{ delay: 10 }` per call. Do not set `forceHttp1` or `visibilityStrategy: 'legacy'`, as both are deprecated escape hatches.
- Modern visibility algorithm is the default: it drops ancestor `overflow` clipping, transform-based hiding and fixed/sticky coverage detection. The app is a map UI with overlays and drawers, so visibility assertions are the most likely source of failures (https://docs.cypress.io/app/references/migration-guide#experimentalFastVisibility-replaced-by-visibilityStrategy).
- Browser memory management is on by default for Chromium browsers. Nothing to do.
- Dev and prod smoke jobs (lines 181, 243) run against live URLs, so failures there would occur after deploy.

## Risk assessment (CI-only validation)
- Certain failure if Node stays at 20 (engine check, and the Cypress binary install fails). With Node 24 this is resolved.
- Medium-low risk of e2e failures from the visibility and keystroke changes (6 specs, page objects). They are quick to fix, but each fix costs a CI round-trip. Dev and prod jobs run only after merge/deploy, so run the PR's e2e job first.
- Wider risk: moving CI to Node 24 affects the build, lint and vitest jobs, not just Cypress.

## Go / No-go
**GO, conditional.** Bump `cypress` to `^16.2.0` and set `node-version` to 24 (22 works too) in `.github/workflows/test_and_deploy.yml`, in the same PR. No config or spec changes are required by the confirmed breaking changes. Leave `start-server-and-test` as is. If CI fails, check `keystrokeDelay` first (add `{delay: 10}`), then the visibility assertions.
