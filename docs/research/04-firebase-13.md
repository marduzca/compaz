# Research 04: firebase 12.19.0 → 13.2.0

Date: 2026-11-06. Sources are primary only: npm registry metadata, firebase-js-sdk GitHub releases/CHANGELOG, GitHub Advisory DB. Repo claims are verified by grep.

## TL;DR

- **The upgrade does NOT fix the `@grpc/grpc-js` advisories.** `firebase@13.2.0` → `@firebase/firestore@4.19.1` still pins `@grpc/grpc-js: ~1.9.0`, and the advisories need ≥1.13.6.
  - npm registry: https://registry.npmjs.org/@firebase/firestore/4.19.1 (`dependencies`; `npm view @firebase/firestore@4.19.1 dependencies`).
  - The 12.19.0 line pins the same `~1.9.0` (`@firebase/firestore@4.17.2`). Installed today: `@grpc/grpc-js@1.9.16` (`npm ls`).
- **The upgrade has a hard Node cost.** `firebase@13.2.0` and `@firebase/firestore@4.19.1` declare `engines.node >=24.12.0`. 12.19.0 / 4.17.2 declared `>=20.0.0`. CI runs Node 20 (`.github/workflows/test_and_deploy.yml:20,52,75,112,166,228`).
- **None of the 13.0.0 breaking changes touch us.** They are all in `@firebase/ai`.
- **react-firebase-hooks is not used in `src/` and is compatible anyway.**
- **Verdict: NO-GO as a security fix** (see the end).

## 1. Advisories: what `npm audit` says and what 13.2 resolves

`npm audit --json` run read-only in the repo:

| Package | Advisory | Affected | Patched |
|---|---|---|---|
| `@grpc/grpc-js` | GHSA-m9gg-hp2v-232j: `getAuthContext` returns unauthorized certs as authorized | <1.13.6; ≥1.14.0 <1.14.5 | 1.13.6, 1.14.5 |
| `@grpc/grpc-js` | GHSA-f596-whhp-79r4: server transmits method-handler error messages to the client | <1.13.6 | 1.13.6 |
| `@firebase/firestore`, `firebase` | Transitive only, via `@grpc/grpc-js` | n/a | n/a |

Advisory source: https://github.com/advisories/GHSA-m9gg-hp2v-232j. The second GHSA ID and its range come from the `npm audit` output; I did not fetch its page.

- The `firebase` and `@firebase/firestore` findings are transitive. They clear only when `@grpc/grpc-js` is ≥1.13.6.
- The audit's suggested fix, `firebase@9.14.0` (semver-major), is a bogus downgrade. Do not follow it.
- `@grpc/grpc-js` latest is 1.14.7 (npm registry). The `~1.9.0` pin in firebase 13.2 blocks it from being picked up naturally.
- **Practical exposure is nil for this app.**
  - Both advisories concern the gRPC **server** side (`getAuthContext` with server credentials; a server sending error messages to clients).
  - This is a Vite SPA, and the browser build of Firestore uses WebChannel/fetch, not `@grpc/grpc-js`.
  - The only Firestore call is a client `setDoc` (`src/app/components/providers/firebase/FirebaseProvider.tsx:3,71`).
  - These are likely not exploitable here. That is my inference from the advisory text and the code, not a Firebase statement.
- **Real options for clearing the audit:**
  - (a) An npm `overrides` entry for `@grpc/grpc-js` ≥1.13.6 (or 1.14.5+) under `firebase`. This works on 12.19 or 13.x. It is unverified: I did not install or test that firestore 4.x runs on grpc-js 1.13/1.14 in Node.
  - (b) Wait for Firebase to bump the pin. I found no such release as of 13.2.0 / firestore 4.19.1 (checked the registry version list and `packages/firestore/CHANGELOG.md`).
  - (c) Accept the risk and document it.

## 2. What changed in 13.0.0 → 13.2.0

Source: https://github.com/firebase/firebase-js-sdk/releases/tag/firebase%4013.0.0, `.../firebase%4013.1.0`, `.../firebase%4013.2.0`; firestore changelog https://github.com/firebase/firebase-js-sdk/blob/main/packages/firestore/CHANGELOG.md.

- **13.0.0 Major changes are all `@firebase/ai@3.0.0`.**
  - `TemplateGenerativeModel.generateContent` signature change.
  - `VertexAIBackend` removed (use `AgentPlatformBackend`).
  - `Part` refactored into a discriminated union.
- **Firestore in 13.x is additive only:**
  - 4.18.0: BSON types, `UpdateData<T>` typing relaxed, `Temporal` declaration.
  - 4.19.0: Pipeline DML stages.
  - 4.19.1: Pipeline Search GA.
- **13.2.0 adds `@firebase/crashlytics@0.1.0` (new preview dependency).**
- **Auth fixes** in `@firebase/auth` 1.13.7–1.13.9 are irrelevant to us.
- **No Node engine change is mentioned in any release note I read.** The `>=24.12.0` bump is visible only in the registry metadata. See §4.
- No official "upgrade guide" for 13 was found. The release notes are the only primary source.

## 3. Repo impact: confirmed items only

Usage grep (all of `src`, `cypress`, `vite.config.mts`, `package.json`, `firebase.json`):

- The only SDK imports are `src/app/components/providers/firebase/FirebaseProvider.tsx:2` (`initializeApp`, `FirebaseOptions`) and `:3` (`doc`, `getFirestore`, `setDoc`).
- Usage is `initializeApp` at `:49`, `getFirestore` at `:55`, and `setDoc(doc(...))` at `:71`.
- None of these APIs is touched by the 13.x notes. **No code change required.**
- Specs mock our own `useFirebase` via `vi.spyOn` (e.g. `ContactFormContainer.spec.tsx:15`, `NavigationPage.spec.tsx:19`). Storybook uses `FirebaseContext.Provider` (`NavigationPage.stories.tsx:16`). Neither imports the SDK, so there is no test-mock impact.
- No `firebase/*` imports appear in `cypress/`.
- **Confirmed breaking changes affecting us: none, other than the Node engine (§4).**
- `firestore.rules` and `firebase.json` are server/hosting config. They are not coupled to the SDK major version.

## 4. Node and browser support, bundle and PWA

- **Node.** `firebase@13.2.0` and `@firebase/firestore@4.19.1` have `engines.node >=24.12.0`. `@firebase/app@0.16.5` is also `>=24.12.0` (registry).
  - CI is on Node 20 and local dev is on 20 per your brief, so `npm ci` would emit `EBADENGINE` warnings.
  - `.npmrc` only sets `legacy-peer-deps=true`, so there is no `engine-strict`. Install would warn and not fail.
  - Vite 6, vitest 3 and jsdom run on whatever Node you use. The SDK is bundled for the browser, so the runtime Node engine is not enforced for the browser bundle.
  - Policy decision: moving CI to Node 24 is unnecessary for function, but the declared support would be violated.
- **Browser.** I found no browser support change in the release notes read. The registry does not carry a browser-support field.
- **Bundle/PWA.** Workbox precaches `**/*.{js,css,html}` with a 5 MB per-file cap (`vite.config.mts:15-18`). Only `firebase/app` and `firebase/firestore` are imported, so tree-shaking excludes AI/crashlytics.
  - Published unpacked size of `@firebase/firestore` is 60.8 MB (4.17.2) vs 64.6 MB (4.19.1), a +6% increase (registry `dist.unpackedSize`). This is package size, not bundle size.
  - Firestore adds only features we don't import (Pipelines/BSON). Measure the real delta with `vite build` before merging.
  - I did not build, so there is no measured bundle change.

## 5. react-firebase-hooks 5.1.1

- npm registry `peerDependencies`: `firebase: ">= 9.0.0"`, `react: ">= 16.8.0"`. Firebase 13 and React 19 satisfy this.
- Peer ranges are open-ended, so there is no declared conflict. Runtime compatibility with 13 is untested by the author. I did not verify that.
- **It is not imported anywhere in `src/` or `cypress/`.** Only `package.json:41` references it, so it is a dead dependency. Removing it is a cleanup, independent of this upgrade.
- `.npmrc` `legacy-peer-deps=true` would mask any peer problem anyway.

## 6. Go / No-go

**NO-GO to upgrade *for the audit finding*.** 13.2.0 leaves `@grpc/grpc-js@~1.9.0` and the advisories persist. Taking it also raises the declared Node floor to 24.12 while CI is on 20.

**Recommended instead:**
1. Clear the audit with `overrides: { "@grpc/grpc-js": "^1.14.5" }`, or document the finding as not applicable to a browser-only client (§1). Run tests and a manual contact-form smoke test either way.
2. Remove the unused `react-firebase-hooks` dependency.
3. Revisit firebase 13 when a Firebase release lifts the grpc pin, or when CI moves to Node 24. The code needs zero changes, so the upgrade is low risk functionally.

**Conditional GO** for 13.2 as a plain version bump, if you want it for its own sake and accept moving CI to Node 24.
