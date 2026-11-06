# Storybook 9.1 → 10.6 batch

Packages: `storybook`, `@storybook/addon-docs`, `@storybook/addon-links`, `@storybook/react-vite`, `eslint-plugin-storybook` (all `^9.0.x` in `package.json:59-61,85,93`; installed `storybook` 9.1.21 per `node_modules/storybook/package.json:3`).

Sources: npm registry metadata (`npm view <pkg>@10.6.x`, https://registry.npmjs.org/), Storybook `MIGRATION.md` section "From version 9.x to 10.0.0" (https://github.com/storybookjs/storybook/blob/next/MIGRATION.md), and `npm audit` against the repo lockfile. `latest` dist-tag is 10.6.6 (`npm view storybook dist-tags`); `next` is 11.0.0-beta.0 (do not use).

## Compatibility (primary sources)

| Question | Answer | Source |
|---|---|---|
| Vite | `@storybook/react-vite@10.6.0` peer `vite: ^5 \|\| ^6 \|\| ^7 \|\| ^8`. **Vite 6 is supported; no Vite upgrade needed.** (SB 11 will require Vite ≥ 6.3.0, MIGRATION.md "Vite: requires Vite 6.3 or higher"; confirm the lockfile's Vite is ≥ 6.3 to be ready.) | `npm view @storybook/react-vite@10.6.0 peerDependencies` |
| Node | **20.19+ or 22.12+** (needed for `require(esm)`). Repo CI pins `node-version: 20` (`.github/workflows/test_and_deploy.yml:20,52,75,112,166,228`) → floating "20" resolves to latest 20.x (≥ 20.19), but pin explicitly to `20.19`/`22` to be safe. Local node is 22.23.4. No `engines` field is published on the packages. | MIGRATION.md 9→10 "Node.js 20.19+ or 22.12+ required" |
| ESM-only | `storybook` and all 10.6 packages are `"type": "module"`. `.storybook/main.*` and presets are loaded as ESM; no `require`/`__dirname`; local addons must use `import.meta.resolve`. | MIGRATION.md "main.* must be valid ESM", "Local addons must be fully resolved"; `npm view ... type` |
| eslint-plugin-storybook | peer `eslint: >=8` (ESLint 9 OK; 10 not excluded). Deps `@typescript-eslint/utils ^8.60.0` / `types ^8.60.0` (repo uses typescript-eslint `^8` → compatible; no peer on typescript-eslint). | `npm view eslint-plugin-storybook@10.6.6 peerDependencies dependencies` |
| addon-docs / addon-links | peer `storybook ^10.6.0` (versions must be bumped in lockstep with `storybook`). | `npm view @storybook/addon-docs@10.6.0 peerDependencies` |
| Chromatic | Storybook 10 itself has no chromatic constraint; the Chromatic CLI floor (v18.13.1) appears only in the SB 11 notes. Repo has `chromatic ^17.5.0` (installed 17.8.0) and `chromaui/action@latest` (`test_and_deploy.yml:61-65`). | MIGRATION.md SB11 "preview-stats.json" (not applicable to 10) |

## Security (npm audit on current lockfile)

- `storybook` moderate: range `9.1.0-alpha.0 – 10.1.0-beta.6`, via `@vitest/mocker` → GHSA-82fw-gwwq-j7x9 (path traversal/arbitrary file read, mock redirect) and GHSA-qxg6-89mg-rqv8 (code injection via mock registration). **Resolved by 10.6.x**: its dependencies no longer include `@vitest/mocker` (only `@vitest/spy`/`@vitest/expect` 3.2.4, `npm view storybook@10.6.0 dependencies`), and 10.6 is outside the vulnerable range.
- `@storybook/react-vite` moderate: via `@joshwooding/vite-plugin-react-docgen-typescript` → `glob`. **Likely NOT fully resolved**: `@storybook/react-vite@10.6.6` still depends on `@joshwooding/vite-plugin-react-docgen-typescript ^0.7.0`, which is inside the flagged range (`0.5.0 – 0.9.0`). Re-run `npm audit` after upgrade to confirm; may need an `overrides` for `glob`. (Inference from ranges, not verified post-install.)
- `eslint-plugin-storybook` moderate: via `@typescript-eslint/utils` → `@typescript-eslint/typescript-estree` (>=6.16). The 10.6.6 plugin depends on `@typescript-eslint/utils ^8.60.0`; whether this clears depends on the resolved typescript-estree/minimatch chain — verify post-upgrade. The audit also attributes the same chain to `eslint-plugin-testing-library`, which is outside this batch, so it may persist.

## Repo-confirmed impacts

1. **`tsconfig.json:22` `"moduleResolution": "node"`** — SB10 removed `typesVersions`; MIGRATION.md requires `bundler`/`node16`/`nodenext` for TS projects. `tsc` in `npm run build` (`package.json:8`) will fail to resolve `@storybook/react-vite`/`storybook/*` types imported in `.storybook/*.ts` and stories. **Fix:** set `"moduleResolution": "bundler"` (module is `esnext`, `tsconfig.json:21`, compatible). Check the rest of the app still type-checks (this change can affect other packages' types).
2. **`.storybook/main.ts`** — already ESM syntax (`import`, `export default`, lines 1-3, 24); no `require`/`__dirname`, no local addons (line 9 uses package names only), no `core.builder`. **No change required.** Line 20-21 `reactDocgen: 'react-docgen-typescript'` remains supported in 10.x (react-vite still ships the docgen plugin). Imports from `vite` (line 1) require Vite to stay installed (it is).
3. **`.storybook/preview.ts`** — imports `Preview` from `@storybook/react-vite` (line 2); fine in 10. `tags: ['autodocs']` (line 24) fine (only undocumented `dev-only/docs-only/test-only` tags were removed; none used).
4. **Stories** — 32 `*.stories.tsx`; imports are only `@storybook/react-vite` (`Meta`) and `storybook/actions` (`actions`), both valid in 10 (the latter is the core entry already in 9). No `@storybook/addon-*` / `@storybook/test` / `@storybook/testing-library` imports found.
5. **ESLint** (`eslint.config.mjs:33`) uses `plugin:storybook/recommended` via FlatCompat plus explicit `storybook/*` rules (`:139-143`, `:169-173`). Rule names currently configured (`use-storybook-expect`, `prefer-pascal-case`, `default-exports`, `use-storybook-testing-library`, `story-exports`) must still exist in the 10.6 plugin or ESLint errors "Definition for rule not found". I did not verify the 10.6 rule list — **check `lint` after upgrade**. Flat-config: plugin 10.x publishes flat configs (`storybook.configs['flat/recommended']`); the FlatCompat route is legacy and worked in 9, so keep unless it fails.
6. **Chromatic** — `viewports` set via `parameters.chromatic.viewports` (e.g. `ContactPage.stories.tsx:26-30`); that's a Chromatic parameter, not the Storybook viewport addon, so SB 10's viewport changes (core `storybook/viewport`; `defaultViewport` removal is SB 11) do not affect it. `MOBILE_VIEWPORT`/`DESKTOP_VIEWPORT` constants are exported from `preview.ts:7-8` and imported by stories — unaffected. Chromatic runs on `npx chromatic` (`package.json:24`) and `chromaui/action@latest`; expect a one-time baseline diff risk from SB's new rendering/CSS (docs/autodocs pages, if captured) — review the first build before accepting. No a11y addon is installed, and no viewport/a11y addon config exists in `.storybook/`.
7. **`.storybook/preview-head.html`** — `window.global = window` shim and `/reset.css` link; not affected by documented changes (cannot confirm no visual regression without a build).
8. **Scripts** — `storybook dev -p 6006` / `storybook build` (`package.json:19-20`); SB10 `storybook dev` blocks remote iframe embedding and restricts iframe messaging (MIGRATION.md 9→10), only an issue if Storybook is embedded elsewhere (not found in repo).

Not affected (grepped, none present): `@storybook/addon-essentials`/`addon-actions` imports, CJS config, custom presets, `managerEntries`, webpack.

## How to upgrade

Run `npx storybook@latest upgrade` (bumps all five packages in lockstep and runs automigrations), then manually apply item 1 (tsconfig), update CI Node to ≥ 20.19, and run `npm run lint`, `npm run build`, `npm run build-storybook`, `npm run chromatic`. Bump all five packages to the same `^10.6.x`.

## Verdict: **GO**, independent of the Vite toolchain batch

Vite 6 is supported by `@storybook/react-vite@10.6` (peer `^5 || ^6 || ^7 || ^8`), so it need not wait for Vite 7/8. Do it as one batch; ensure CI Node ≥ 20.19 and the `moduleResolution` change. Resolves the `storybook` advisory; the `@storybook/react-vite`(glob) and eslint-plugin chains need post-upgrade audit verification. If Vite is later upgraded, stay ≥ 6.3 for SB 11 readiness.
