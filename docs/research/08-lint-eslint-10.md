# 08 – Lint batch: ESLint 9 → 10

Researched 2026-11-06. Sources are npm registry metadata (`https://registry.npmjs.org/<pkg>/latest`, abbreviated "npm:<pkg>"), ESLint docs, upstream repos and changelogs. Repo facts come from `eslint.config.mjs`, `package.json`, `.npmrc` and `npx eslint --print-config` (read-only, no install).

## TL;DR

- **The airbnb blocker is bigger than airbnb.** `eslint-plugin-react@7.37.5` (peer `^9.7`), `eslint-plugin-jsx-a11y@6.10.2` (peer `^…||^9`) and `eslint-plugin-import@2.32.0` (peer `…||^9`) do not declare ESLint 10 support. Replacing airbnb does not by itself allow `legacy-peer-deps` to be dropped. All three have ESLint 10 PRs open or merged but unreleased.
- Everything else in the batch is ready for ESLint 10: `@typescript-eslint` 8.72.1, `eslint-plugin-react-hooks` 7.1.1, `@eslint/compat` 2.1.1, jest-dom, testing-library, storybook and prettier.
- `eslint-plugin-react-hooks` does not need the 6.x hop. 7.1.0 is the first release with ESLint 10 support, and jumping 5.2 → 7.1.1 is fine.
- The `@typescript-eslint` audit findings are all one transitive issue (`minimatch`). No `@typescript-eslint` release fixes it, so a `minimatch` override is the only fix.
- **Recommendation:** wait for the `react`, `jsx-a11y` and `import` ESLint 10 releases, and do the airbnb vendoring (Option A) now. See the end of this document.

## 1. What the repo actually relies on

`eslint.config.mjs:1-30`: the config uses `FlatCompat` + `fixupConfigRules` with `compat.extends('plugin:react/recommended', 'airbnb', 'prettier', 'eslint-config-prettier', 'plugin:@typescript-eslint/recommended', 'plugin:react-hooks/recommended', 'plugin:jsx-a11y/recommended', 'plugin:import/warnings', 'plugin:storybook/recommended')`. It also sets `files: ['**/*.ts','**/*.tsx']` on each. A flat block then registers `react` and `@typescript-eslint` via `fixupPluginRules`, plus `jest-dom`, `testing-library` and `prettier`.

`npx eslint --print-config src/app/featureFlag/FeatureFlag.tsx` (run today) gives 770 known rules, **269 enabled**:

| Source | Enabled rules |
|---|---|
| core | 136 |
| react | 55 |
| jsx-a11y | 28 |
| import | 23 |
| @typescript-eslint | 19 |
| storybook | 6 |
| react-hooks | 1 |
| prettier | 1 |

Details:

- airbnb (`eslint-config-airbnb@19.0.4` plus `airbnb-base@15`) is the source of most of the core, react, import and a11y rules. It pulls in four plugins at runtime: `eslint-plugin-import`, `eslint-plugin-react`, `eslint-plugin-jsx-a11y` and `eslint-plugin-react-hooks`.
- `eslint-config-prettier` is applied after airbnb and turns off the formatting rules.
- Rules the repo overrides: `import/no-extraneous-dependencies`, `import/extensions`, `import/no-unresolved`, a set of `react/*` rules, and `jsx-a11y/label-has-associated-control`. Several others are turned off, e.g. `jsx-a11y/click-events-have-key-events`.
- `jest-dom` and `testing-library` are registered as plugins but **no rules from them are enabled**: no `configs` are applied. The `jest/expect-expect` override at `eslint.config.mjs:138-143` references a plugin that is never loaded. `eslint-plugin-jest` is a devDependency but is not imported anywhere in the config. Both are cleanup candidates.
- `package.json` also has legacy `eslintConfig` and `eslintIgnore` keys. Flat config ignores them. The `import/no-anonymous-default-export` override in `eslintConfig` is dead.
- **Existing anomaly (verified by `--print-config`):** `react-hooks/rules-of-hooks` resolves to **off** (`[0]`) and `exhaustive-deps` to `warn`. Plugin 5.2.0's `recommended` sets `rules-of-hooks` to error, so something later in the chain overrides it to off. I did not trace what. After the upgrade, `rules-of-hooks` will probably come back on as error. Treat any new hits as pre-existing bugs, not regressions.

## 2. ESLint 10 / @eslint/* changes that matter

Source: <https://eslint.org/docs/latest/use/migrate-to-10.0.0>.

| Change | Effect on this repo |
|---|---|
| Node ≥ 20.19 / 22.13 / 24 (npm:eslint engines `^20.19.0 \|\| ^22.13.0 \|\| >=24`) | CI uses `node-version: 20` in `.github/workflows/test_and_deploy.yml:20,52,…`. That resolves to the latest 20.x, so it is OK. Pin `>=20.19` in the docs and in `engines` if desired. Local node is 22.23, OK. |
| `eslint:recommended` adds `no-unassigned-vars`, `no-useless-assignment`, `preserve-caught-error` | Only matters if `js.configs.recommended` rules reach the output. Today it is passed to `FlatCompat` only as `recommendedConfig`/`allConfig`. airbnb enables its own core rules. Expect few or no new hits. Verify by running the lint. |
| Old eslintrc config removed | The repo already uses flat config. `FlatCompat` from `@eslint/eslintrc` is still supported. |
| JSX references are tracked (fixes false-positive `no-unused-vars` for components) | New reports can appear in `.tsx`. |
| `eslint-env` comments become errors | Grep `src` for `eslint-env` before upgrading. |
| `context.getFilename/getSourceCode/getCwd/parserOptions` and `SourceCode.getTokenOrCommentBefore`, `isSpaceBetweenTokens` etc. removed | This is what breaks old plugins (react, import, jsx-a11y). See §3. |
| `@eslint/js` 10 gives configs a `name`. Users of `FlatCompat` should upgrade `@eslint/eslintrc` to latest (same page) | Bump `@eslint/eslintrc` (3.3.7 is latest, npm:@eslint/eslintrc). It is not in the requested batch, but it should be added. |
| `jiti` ≥ 2.2 if TS config | The config is `.mjs`, so this does not apply. |

Versions (npm):

- `eslint` 10.14.0. Its only peer is optional `jiti`.
- `@eslint/js` 10.0.1, peer `eslint ^10.0.0`.
- `@eslint/compat` 2.1.1, peer `^8.40 || 9 || 10`.
- Both `@eslint/js` and `@eslint/compat` need Node ≥ 20.19.

**`@eslint/compat` is the bridge.** Its README says it wraps plugins "intended for use with ESLint v8.x or v9.x to allow them to work as-is in ESLint v9.x and v10.x", but "all plugins are not guaranteed to work… can't fix everything" (<https://github.com/eslint/rewrite/blob/main/packages/compat/README.md>). The changelog (compat 2.1.1, 2026-09-01) shows active maintenance of the shimmed context (`markVariableAsUsed`) (<https://github.com/eslint/rewrite/blob/main/packages/compat/CHANGELOG.md>). The repo already wraps every airbnb plugin through `fixupConfigRules`/`fixupPluginRules`. The installed react (8 files) and import (5 files) rule trees still call removed `context.*`/`sourceCode.*` APIs (my `grep` of `node_modules/eslint-plugin-*/lib`, which returned 8, 5 and 0 files for react, import and jsx-a11y). `fixupConfigRules` is why the same code still works on 9. It is the likeliest reason it could keep working on 10, but this is **unverified**: it needs a scratch install and run.

## 3. Plugin compatibility matrix (ESLint 10)

Peer ranges are from `https://registry.npmjs.org/<pkg>/latest`, fetched 2026-11-06.

| Package (repo range → latest) | ESLint peer | ESLint 10? | Notes |
|---|---|---|---|
| `eslint-config-airbnb` 19.0.4 (published 2021-12-25) | `^7.32 \|\| ^8.2` | **No**, abandoned | Also pins `eslint-plugin-react-hooks ^4.3`, so it conflicts with hooks 5, 6 and 7 too. Source of `legacy-peer-deps`. |
| `eslint-config-airbnb-base` 15.0.0 | `^7.32 \|\| ^8.2` | **No** | Same. |
| `eslint-config-airbnb-typescript` | not a dependency in this repo | n/a | |
| `eslint-plugin-import` 2.32.0 (2025-06-20) | `…\|\| ^8 \|\| ^9` | **No release** | The ESLint 10 PR (#3230) is closed/merged and "Eslint 10 support release" (#3292) is closed, but latest on npm is still 2.32.0 with no `^10`. `main` is active (<https://github.com/import-js/eslint-plugin-import/pull/3230>, <https://github.com/import-js/eslint-plugin-import/issues/3292>). Watch for 2.33. |
| `eslint-plugin-react` 7.37.5 (2025-04-03) | `…\|\| ^9.7` | **No release** | Issue #3977 "ESLint v10 compatibility" is open. PRs #3979 and #4022 ("complete ESLint 10 compatibility") are open (<https://github.com/jsx-eslint/eslint-plugin-react/issues/3977>, <https://github.com/jsx-eslint/eslint-plugin-react/pull/4022>). Commits to `master` continue on 2026-10-22. Runtime failures on v10 are reported (#3970 `sourceCode.getAllComments is not a function`). |
| `eslint-plugin-jsx-a11y` 6.10.2 (2024-10-26) | `…\|\| ^9` | **No release** | Issue #1075 and PRs #1079/#1081 "ESLint 10 support" are open (<https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/issues/1075>). Static check: no removed `context.*` APIs found in its `lib` in the installed copy. It may run fine on 10 despite the peer. |
| `eslint-plugin-react-hooks` 5.2.0 → **7.1.1** | `…\|\| ^9 \|\| ^10` | **Yes (7.1.0+)** | 7.1.0 "Add ESLint v10 support" (<https://github.com/facebook/react/blob/main/packages/eslint-plugin-react-hooks/CHANGELOG.md>). 6.1.1 peer stops at `^9` (npm). |
| `eslint-plugin-jest` 29.17.0 | `^8.57 \|\| ^9 \|\| ^10` | **Yes** | Node ≥ 20.12. Currently unused in the config. |
| `eslint-plugin-jest-dom` 5.10.1 | `…\|\| ^9 \|\| ^10` | **Yes** | |
| `eslint-plugin-testing-library` 7.16.2 | `^8.57 \|\| ^9 \|\| ^10` | **Yes** | |
| `eslint-plugin-storybook` 10.6.6 / **9.1.21** (`v9` tag) | `>=8` | **Yes** | Latest 10.x also peers `storybook ^10.x`. The repo is on Storybook 9, so stay on the 9.x line (`^9.1.20` peers `storybook ^9.1.20`). Move to 10.x together with the Storybook 10 upgrade (see `03-storybook-10.md`). |
| `eslint-config-prettier` 10.1.8 | `>=7.0.0` | **Yes** | |
| `eslint-plugin-prettier` 5.5.7 | `>=8.0.0` (+ prettier ≥3, optional `@types/eslint`) | **Yes** | |
| `@typescript-eslint/*` 8.72.1 (already locked) | `^8.57 \|\| ^9 \|\| ^10`, `typescript >=4.8.4 <6.1.0` | **Yes** | TS 5.9 is in range. Note this caps TypeScript below 6.1, which matters for `09-typescript-7.md`. |

## 4. `eslint-plugin-react-hooks` 5.2 → 7.1.1

- Peer ranges: 5.2.0 and 6.1.1 stop at `^9`. 7.1.1 has `^10` (npm). **6 is not a needed hop.** 6.x and 7.x differ only in preset layout, and both are breaking for the `compat.extends` usage below.
- Preset change (CHANGELOG, link above):
  - 6.1.0: the flat config becomes `recommended`. The legacy one moves to `recommended-legacy`.
  - 7.0.0: "all compiler rules are enabled by default" in `recommended`. `recommended-latest` adds the experimental ones.
- **`compat.extends('plugin:react-hooks/recommended')` will break.** In ≥6.1, `recommended` is flat-shaped. Replace it with `reactHooks.configs.flat.recommended`, or use `recommended-legacy` to keep the 5.x rules only (README: <https://github.com/facebook/react/blob/main/packages/eslint-plugin-react-hooks/README.md>).
- New rules in `recommended` (README rule list; the severity-`Recommended` ones match the 7.1.1 build source on unpkg): `config`, `error-boundaries`, `gating`, `globals`, `immutability`, `preserve-manual-memoization`, `purity`, `refs`, `set-state-in-effect`, `set-state-in-render`, `static-components`, `use-memo`, all `error`. `unsupported-syntax` and `incompatible-library` are `warn`.
- **`--max-warnings=0` consequence:** `unsupported-syntax` and `incompatible-library` warnings will fail `npm run lint`. The likeliest hits are `incompatible-library` (e.g. libraries returning unmemoizable functions, such as `downshift`, `react-hook-form`-style APIs, MUI or `useVirtualizer`; the repo uses `downshift`) and `set-state-in-effect`. The repo has about 13 files with `useEffect` and 26 files with a state setter call; these are candidates. I could not run the new rules without installing, so the actual violation count is **unknown**. This is the step that needs a scratch-branch run.
- Cheapest mitigation: enable the compiler rules as `warn`→`off` incrementally, or pin the config to `recommended-legacy` (just `rules-of-hooks` + `exhaustive-deps`) and adopt the compiler rules in a follow-up.

## 5. `@typescript-eslint` audit findings

`npm audit --json` (reads the lockfile only) reports `@typescript-eslint/{eslint-plugin,parser,type-utils,typescript-estree,utils}`, `eslint-plugin-jest`, `eslint-plugin-storybook` and `eslint-plugin-testing-library` as moderate, **all through one path**: `@typescript-eslint/typescript-estree → minimatch`.

- Advisory: GHSA-g3hv-75wg-m249, "minimatch has potential denial of service via globparts amplification". Vulnerable `>= 7.0.0, < 11.0.1`, **first patched 11.0.1** (<https://api.github.com/advisories/GHSA-g3hv-75wg-m249>).
- Lockfile: `@typescript-eslint/*` is **already at the latest 8.72.1**, and `typescript-estree@8.72.1` depends on `minimatch ^10.2.2` (locked at 10.2.6), so it is still vulnerable. npm's latest `typescript-estree` is also 8.72.1 with `minimatch ^10.2.2`.
- So **no `@typescript-eslint` release fixes it**, and the audit's `fixAvailable` suggestions (e.g. downgrading to 6.15.0) are wrong and must be ignored. Fixes are either:
  - an `overrides: { "@typescript-eslint/typescript-estree": { "minimatch": "^11.0.1" } }` entry in `package.json`, or
  - waiting for upstream to bump.
- It is a dev-only tool and an exploit needs attacker-controlled glob patterns, so the risk is low. It is not a reason to upgrade ESLint.
- Separate non-lint findings in the same audit (`firebase`/`@grpc/grpc-js`, `vitest`/`tinypool`, `glob`, `i18next-http-backend`, …) are out of scope for this batch.

## 6. Replacement options for airbnb

### Option A. Vendor the airbnb rules into the repo (recommended)

Drop `eslint-config-airbnb` and `eslint-config-airbnb-base` from `devDependencies`. Copy the rule objects (they are plain data in `eslint-config-airbnb/rules/*.js` and `airbnb-base/rules/*.js`) into a local `eslint/airbnb-rules.mjs` or inline them in the flat config. This is a one-time snapshot of what is currently resolved. Register `react`, `react-hooks`, `jsx-a11y` and `import` directly with `plugins: {}` instead of via `compat.extends`.

- **Rule diff: 0** by construction. You can verify it by diffing `eslint --print-config` JSON before and after.
- **a11y:** unchanged. All 28 enabled `jsx-a11y/*` rules (plus the repo's overrides) stay.
- **Pros:** no behaviour change, and the config becomes native flat. It removes `FlatCompat`, `@eslint/eslintrc` and the `compat.extends` path, which are an ongoing risk.
- **Cons:** the team owns a frozen ~270-rule list with no upstream updates. Core rules removed in future ESLint versions must be pruned by hand. `eslint-plugin-react-hooks` conflicts: `airbnb` pins hooks `^4.3`, but vendoring ends that conflict.
- **`legacy-peer-deps`:** the airbnb peer conflict disappears. The `react`, `jsx-a11y` and `import` peer ranges (`^9`) remain, so it **cannot be dropped** until those three publish ESLint 10 peers. Alternatively use `overrides` to force an `eslint` peer for those three. Not validated, and the plugin README/issue #4027 only hints at it.

### Option B. Recommended presets only (flat `eslint-plugin-react` + `jsx-a11y` + `import`)

Use `js.configs.recommended`, `react.configs.flat.recommended` and `react.configs.flat['jsx-runtime']`, `jsxA11y.flatConfigs.recommended`, `reactHooks.configs.flat.recommended`, `typescript-eslint` `recommended`, and `import-x` (or `import` flat `recommended`) with `eslint-config-prettier`.

- **Static rule-diff estimate:** about 269 → about 130–150 enabled rules. Losses: roughly 80 core style/best-practice rules from airbnb-base (`no-param-reassign`, `no-restricted-syntax`, `no-plusplus`, `no-nested-ternary`, `prefer-destructuring`, …), about 30 of airbnb's react rules (`react/jsx-no-bind`, `react/no-array-index-key`, `react/sort-comp`, `react/function-component-definition`, `react/jsx-props-no-spreading`), and `import/order` / `no-cycle` / `prefer-default-export`. Gains: the TS-aware `@typescript-eslint` recommended set, and the hooks compiler rules (see §4). This estimate is not computed: I did not run a scratch install.
- **a11y:** `jsx-a11y/recommended` is a subset of airbnb's a11y set, with a few rules airbnb enables on top (`anchor-is-valid` options, `label-has-associated-control`, etc.). This is mostly kept. The repo's `label-has-associated-control` override should stay.
- **Pros:** simplest and most upstream-supported. No frozen rule snapshot.
- **Cons:** big loss of code-style enforcement, and the repo will lose rules developers rely on. It needs a codebase sweep.
- **`legacy-peer-deps`:** same as A, still blocked by `react`, `jsx-a11y` and `import` peers.

### Option C. Maintained flat airbnb fork (`eslint-config-airbnb-extended` 3.3.0) or `neostandard` 0.14.1

- `eslint-config-airbnb-extended`: peer `eslint ^9.0.0` only (npm). It **does not support ESLint 10**, and earlier versions peer-pin `eslint-plugin-react-hooks 5.x`. It stays on ESLint 9. It fixes the airbnb problem but not the batch.
- `neostandard`: peer `eslint ^9.22 || ^10` but engines `node ^22.13 || >=24` (npm), which breaks CI on Node 20. Its focus is `@stylistic` formatting, which conflicts with prettier, and it has no airbnb rules.
- **Rule diff:** large for neostandard (different philosophy), small for airbnb-extended.
- **`legacy-peer-deps`:** can be dropped for airbnb-extended only while on ESLint 9.
- **Not viable for this batch.**

## 7. Can `legacy-peer-deps` be dropped?

After A or B, the peers that block resolution on ESLint 10 are:

- `eslint-plugin-react@7.37.5`: `^9.7`.
- `eslint-plugin-jsx-a11y@6.10.2`: `^9`.
- `eslint-plugin-import@2.32.0`: `^9`.

Everything else resolves cleanly, per §3. I did **not** verify the other non-ESLint peer conflicts in the repo (for example Storybook, vite-plugin-pwa and React 19 peers), so `legacy-peer-deps` may be needed for other reasons. Test with a scratch `npm install --no-legacy-peer-deps`.

**Answer:** not yet. It can be dropped when those three ship ESLint 10 peers (the import and react fixes are merged or in review), or with `overrides` as a stopgap.

## 8. Recommendation and the decision the owner must make

**Recommendation:** do not move to ESLint 10 yet. Do **Option A** now, on ESLint 9 (a zero-diff, verifiable change that removes airbnb, `FlatCompat` and the hooks `^4.3` pin). That reduces the later upgrade to a version bump. Also adopt `eslint-plugin-react-hooks` 7.1.1, which still supports ESLint 9. Upgrade to ESLint 10 once `eslint-plugin-react`, `jsx-a11y` and `import` publish ESLint 10 peers; then `legacy-peer-deps` can go as well.

**Decision for the owner:** choose among:

1. A now, then ESLint 10 later (recommended).
2. Upgrade to ESLint 10 now with `legacy-peer-deps` or `overrides` kept and `@eslint/compat` shimming react/import. This is possible but unsupported by the plugins.
3. B, accepting a rule loss of roughly half.

Second decision: for react-hooks 7, enable the compiler rules now (and fix the violations or tolerate warnings) or pin `recommended-legacy`.

## Gaps

- Nothing was installed or run on ESLint 10. The compat shim claim, the compiler-rule violation count and the exact rule diff for Option B are **estimates**.
- I did not trace why `react-hooks/rules-of-hooks` currently resolves to off.
- Upstream PR/issue states and dates come from the GitHub search API at research time and can change.
