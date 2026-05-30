@README.md

## Held-back dependencies

The following packages are intentionally pinned to their current major version and must not be upgraded without a dedicated migration:

| Package | Current | Target | Notes |
|---|---|---|---|
| `webpack` | 4.x | 5 | CRA-ejected config; requires significant migration |
| `react-router` / `react-router-dom` | 5.x | 7 | API redesign (no `<Switch>`, hooks-only) |
| `react-redux` | 7.x | 9 | Hooks-first API changes |
| `@sentry/react` | 8.x | 10 | SDK v8 → v10 breaking changes |
| `recharts` | 1.x | 3 | Component API overhaul |
| `styled-components` | 5.x | 6 | Breaking changes around `createGlobalStyle`, theming |
| `react-google-login` | 5.x | — | Package abandoned; needs replacement |
| FontAwesome (`@fortawesome/*`) | 5.x | 6/7 | Icon naming and tree-shaking changes |

## Pre-commit requirement

Before every commit, run `yarn lint-nofix` and confirm it exits clean. This is required by CI/CD — commits that fail it will not pass the pipeline.

## Skills

This project keeps reusable skills under `.AGENTS/skills/`. Each subdirectory contains a `SKILL.md` describing when and how to use it.

Before starting any non-trivial task, list `.AGENTS/skills/` and read the `SKILL.md` of every skill whose description plausibly matches the task. Multiple skills may apply to one task — read all relevant ones before writing code or files. Treat each `SKILL.md` as authoritative for its domain.
