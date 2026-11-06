# Research: TypeScript 5.9 → 7.0

Date: 2026-11-06. Repo: `typescript@^5.4.4` (installed 5.9.3), `@typescript-eslint/{parser,eslint-plugin}@^8.0.0`, vite 6, vitest 3, storybook 9.1 (`reactDocgen: 'react-docgen-typescript'`), `vite-tsconfig-paths@5.1.4`, `build` = `tsc && vite build`.

## Verdict: NO-GO for 7.0 as the `typescript` package. GO for TS 6.0.x (+ optional 7 side-by-side for `tsc` only).

## 1. What TS 7 is on npm
- `typescript@7.0.2` is `latest` (published 2026-07-08); `7.1.0-beta` is `beta`, `7.1.0-dev.*` is `next`. Source: https://registry.npmjs.org/typescript
- The `typescript` 7.0.2 package has **no JS compiler API**. It has `bin: {tsc}`, no `main`, and `exports["."]` points to `./lib/version.cjs`. Native binaries are optional `@typescript/typescript-<os>-<arch>` deps. The only programmatic entry points are `./unstable/*`. Source: https://registry.npmjs.org/typescript/7.0.2
- By contrast, 6.0.3 has `main: ./lib/typescript.js` plus the `tsserver` bin. Source: https://registry.npmjs.org/typescript/6.0.3
- Microsoft's wording: "TypeScript 7.0 … does not ship with an API. We expect TypeScript 7.1 to ship with a new (and different) API". Source: https://devblogs.microsoft.com/typescript/announcing-typescript-7-0/#running-side-by-side-with-typescript-6.0
- Microsoft's documented workaround is a side-by-side install, because tools like typescript-eslint import `typescript` as a peer dependency. Same source:
  ```json
  "@typescript/native": "npm:typescript@^7.0.2",
  "typescript": "npm:@typescript/typescript6@^6.0.2"
  ```
  This gives `tsc` = 7.0 and `tsc6` plus the 6.0 API under the `typescript` name.
- `@typescript/native-preview` was the old nightly channel. Nightlies now move to `typescript@next`. Same source.

## 2. typescript-eslint
- Latest is 8.72.1 (2026-10-26). `@typescript-eslint/parser`, `typescript-estree` and `eslint-plugin` all declare `peerDependencies.typescript: ">=4.8.4 <6.1.0"`. Sources: https://registry.npmjs.org/@typescript-eslint/parser/latest, https://registry.npmjs.org/@typescript-eslint/typescript-estree/latest, https://registry.npmjs.org/@typescript-eslint/eslint-plugin/latest
- The official support window is also `<6.1.0`: https://typescript-eslint.io/users/dependency-versions/
- **TS 7 is unsupported.** Maintainers said "typescript-eslint isn't compatible with TS 7 at this time, because there is no TS 7 API" and closed the report as not planned (https://github.com/typescript-eslint/typescript-eslint/issues/12518). The tracking issue is #10940 (open). Its last maintainer status update says WIP TS 7.1 support is in PR #12803, which is in internal review (https://github.com/typescript-eslint/typescript-eslint/issues/10940).
- TS 6.0.x is inside the range, so 8.72.1 with `typescript@6.0.3` is fully supported. The earlier "TypeScript 6 Support" issue #12123 is closed.
- This repo's ESLint config uses no type-aware linting (`eslint.config.mjs:52-60` has `parserOptions` with only `ecmaFeatures`). It still needs `require('typescript')` to parse files, so it breaks with the 7.0 package.

## 3. Which tool breaks first on a plain `typescript@7` swap
1. **`npm run lint` (typescript-eslint)** breaks first, and it is the hard blocker. It needs the JS API, which 7.0 doesn't ship (sections 1 and 2).
2. **Storybook `react-docgen-typescript`** (`.storybook/main.ts:21-23`) also needs the TS API. `react-docgen-typescript@2.4.0` declares peer `typescript >= 4.3.x`, so the range check passes. It would fail at runtime against 7.0, which is not verified here and is inferred from the missing API. Workaround: switch `reactDocgen` to `'react-docgen'`, or keep the `typescript` name aliased to TS 6.
3. **`vite-tsconfig-paths@5.1.4`** uses `tsconfck@3.1.6`, which declares an optional peer `typescript ^5.0.0` (installed from `node_modules`). Latest `tsconfck` is still 3.1.6 with the same peer; `vite-tsconfig-paths@6.1.1` depends on `tsconfck ^3.0.3`. It parses tsconfig itself, so I expect no runtime break, but the peer range may produce npm ERESOLVE or warnings on 6/7. This repo has no `paths` or `baseUrl` (`tsconfig.json`), so the plugin is effectively a no-op and could be removed if it causes problems.
4. **vite/vitest** transpile with esbuild and don't use the TS compiler API, so nothing is expected to break. `tsc` in `npm run build` works with 7.0, subject to the tsconfig fix below.

## 4. Is TS 6 a required hop?
- Microsoft recommends it: "We encourage developers to adopt TypeScript 6.0 to make the transition to TypeScript 7.0 easier". TS 7 "provides hard errors in the face of any flags and constructs deprecated in TypeScript 6.0". Source: https://devblogs.microsoft.com/typescript/announcing-typescript-7-0/#updates-since-5.x-and-new-behaviors-from-6.0
- TS 6.0 is "API compatible with TypeScript 5.9" and, unlike 7, is where the deprecations can be silenced with `"ignoreDeprecations": "6.0"`. Source: https://devblogs.microsoft.com/typescript/announcing-typescript-6-0/#breaking-changes-and-deprecations-in-typescript-6.0
- In practice TS 6 is the only version that keeps lint and Storybook docgen working today. It is also the vehicle for the 7.0 `tsc` side-by-side setup.

## 5. Confirmed-affecting changes for this repo's `tsconfig.json`
| Setting | Status | Fix |
|---|---|---|
| `"moduleResolution": "node"` (node10) | **Affected**: deprecated in 6.0, hard error in 7.0 (7.0 post, "deprecations that have turned into hard errors") | `"moduleResolution": "bundler"`. This fits a Vite app, and `module: esnext` is already compatible. 6.0 also allows bundler with `module: commonjs` (6.0 post). |
| `esModuleInterop: true`, `allowSyntheticDefaultImports: true` | Not affected. Only `false` is an error in 7.0. | Optional: remove, since both are now always on. |
| `types: [vite/client, vitest/globals, vite-plugin-svgr/client]` | Not affected. It is already an explicit list, which is the 6.0/7.0 default behaviour. | None |
| `strict: true`, `target: esnext`, `module: esnext` | Not affected | None |
| `lib: [dom, dom.iterable, esnext]` | Not affected. `dom.iterable` is now an empty alias in 6.0, still valid (6.0 post). | Optional: drop `dom.iterable`. |
| `baseUrl`, `target: es5`, `downlevelIteration`, `rootDir` | Not present | None. `noEmit` is set, so the `rootDir` default is irrelevant. |
| `noUncheckedSideEffectImports` default `true` | Possible. Side-effect imports such as `import './x.css'` or SVGs are checked for resolution. | Not verified. `vite/client` normally types CSS modules, so confirm by running `tsc`. If it fails, set `"noUncheckedSideEffectImports": false`. |

The minimal change to reach a clean TS 6.0 and 7.0 `tsc` is one line: `"moduleResolution": "bundler"`. This is not verified by running `tsc`, since I did not run `npm install`.

## 6. Recommended path
1. **Now (TS 6):** set `typescript` to `~6.0.3` and `moduleResolution` to `bundler`. Keep `@typescript-eslint/*` at `^8.72.1` or newer, which covers `<6.1.0`. Run `tsc`, lint, vitest and build-storybook. Expect a possible peer warning from `tsconfck` (`^5.0.0`).
2. **Optional (TS 7 for speed):** alias as in section 1 (`typescript` → `@typescript/typescript6`, plus `@typescript/native` → `typescript@^7.0.2`). Then `npx tsc` runs 7.0 and ESLint and docgen keep the 6.0 API. Caveat: `@typescript/typescript6` only exposes the `tsc6` binary, so `npm run build` still calls `tsc`, which resolves to the 7.0 package. I did not install anything to verify this.
3. **Full TS 7:** wait for TS 7.1 (beta out 2026-10-20) plus a typescript-eslint release that merges the 7.1 API support (PR #12803 or similar). The `typescript-estree` peer range must include 7.x. Re-check Storybook's docgen at that point.

## Blocking conditions
- typescript-eslint peer range `>=4.8.4 <6.1.0` (8.72.1) excludes 7.x. It needs a release supporting the TS 7.1 API, tracked in #10940.
- `typescript@7.0.x` exposes no stable JS API, so any tool importing `typescript` breaks. This includes typescript-eslint and react-docgen-typescript.
- `moduleResolution: node` is a hard error in 7.0, but trivially fixable.

## Gaps
- I did not run `tsc` or lint, so the `noUncheckedSideEffectImports` risk and the runtime failure of docgen on 7.0 are inferred, not tested.
- I did not read the TS 6.0 post's `moduleResolution`, `esModuleInterop` and `baseUrl` sections directly (the fetch truncated). Those claims rely on the 7.0 post's list of hard errors (https://devblogs.microsoft.com/typescript/announcing-typescript-7-0/) and the 6.0 post's statement that deprecations can be silenced via `ignoreDeprecations: "6.0"`.
