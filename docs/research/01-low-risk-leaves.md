# Batch 1: low-risk leaves

Primary sources: package READMEs/releases and npm registry metadata (`npm view <pkg>@<target>`), linked inline.

**Headline:** the Node 20 CI baseline (`node-version: 20` in every job of the CI workflow) blocks four of the seven upgrades.

| Package | Current → target | `engines.node` | Notes |
|---|---|---|---|
| globals | 16.5 → 17.14 | `>=18` | none |
| web-vitals | 5.3 → 6.2.3 | none | none |
| @types/node | 24 → 26 | n/a | match runtime major |
| start-server-and-test | 2.1 → 3.0.13 | `^22 \|\| >=24` | |
| @testing-library/jest-dom | 6.9 → 7.0 | `>=22` | peer `@testing-library/dom >=10 <11` (already met) |
| chromatic | 17.8 → 18.14.1 | `>=22` | skip 18.10 to 18.13.9 (bundled dotenv 8) |
| @babel/core | 7.29 → 8.1 | `^22.18 \|\| >=24.11` | ESM-only |

## Per package

- **globals 17** ([release](https://github.com/sindresorhus/globals/releases/tag/v17.0.0)): only breaking change is `audioWorklet` split out of `browser`. Repo uses `globals.browser` in `eslint.config.mjs`; nothing touches AudioWorklet globals. **Go.**
- **web-vitals 6** ([upgrade guide](https://github.com/GoogleChrome/web-vitals/blob/main/docs/upgrading-to-v6.md)): types become explicit exports (`import type`), `requestIdleCallback` capped at 1s, `includeProcessedEventEntries` default change (attribution build only). Repo: `src/reportWebVitals.ts` imports `MetricType`; change to `import type` if `tsc` complains. **Go**, target 6.2.3.
- **@types/node**: only reaches app code via `NodeJS.Timeout` in `CurrentLocation.tsx`. Types should match the runtime major. **Go once CI is on the new Node; pin to that major.**
- **start-server-and-test 3** ([release](https://github.com/bahmutov/start-server-and-test/releases/tag/v3.0.0)): Node 22+ only; CLI syntax unchanged (`ci:cypress-run`). **Go after the Node bump.**
- **jest-dom 7** ([release](https://github.com/testing-library/jest-dom/releases/tag/v7.0.0)): requires `@testing-library/dom` peer (already `^10.4`) and Node 22. `src/test/setupTests.ts` imports it twice (redundant). **Go after the Node bump.**
- **chromatic 18** ([release](https://github.com/chromaui/chromatic-cli/releases/tag/v18.0.0)): only the CLI output renderer changed. CI uses `chromaui/action`, unaffected; local `npm run chromatic` needs Node 22. **Go**, target 18.14.1.
- **@babel/core 8** ([migration](https://babeljs.io/docs/v8-migration)): declared but unused directly. `@vitejs/plugin-react@4`, `babel-plugin-polyfill-*`, `@svgr/*`, `workbox-build`, `react-docgen` all need Babel 7, so a root v8 would only add a dead copy and risk `ERESOLVE`. **No-go: keep `^7`** (or remove the unused declaration, separately). Revisit after plugin-react moves to 6.

## Recommended order

globals, web-vitals, then (after CI Node bump) @types/node, start-server-and-test, jest-dom, chromatic. Not verified (needs install): tsc/vitest results.
