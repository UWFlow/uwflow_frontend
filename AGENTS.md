@README.md

## Skills

This project keeps reusable skills under `.AGENTS/skills/`. Each subdirectory contains a `SKILL.md` describing when and how to use it.

Before starting any non-trivial task, list `.AGENTS/skills/` and read the `SKILL.md` of every skill whose description plausibly matches the task. Multiple skills may apply to one task — read all relevant ones before writing code or files. Treat each `SKILL.md` as authoritative for its domain.

## Modernization Notes

The frontend is in an old custom CRA/Webpack state and should be modernized in staged PRs rather than with a single all-latest dependency bump.

Package management:

- The project uses Bun via `packageManager: bun@1.3.14`.
- `bun.lock` is the source of truth for resolved frontend dependencies.
- Do not reintroduce `yarn.lock` or `package-lock.json`; use `bun install` and `bun run ...`.

Dependency audit context:

- `package.json` has 144 direct dependencies/devDependencies.
- Before the Bun migration, `yarn outdated` reported 129 outdated direct entries: 87 major upgrades and 42 minor/patch upgrades.
- Before the Bun migration, `yarn audit` reported 1,277 advisories: 72 critical, 541 high, 606 moderate, and 58 low.
- Local `node_modules` was inconsistent with `package.json` during the audit; do not trust it as source of truth.

Recommended modernization order:

1. Replace the old custom CRA/Webpack 4 stack with Vite, React plugin, and Tailwind before attempting broad package upgrades.
2. Upgrade React in stages, preferably React 18 first, then React Router/Apollo/GraphQL Codegen, then consider React 19.
3. Replace old Apollo split packages (`apollo-client`, `apollo-link-*`, `react-apollo`, `@apollo/react-*`) with `@apollo/client` and `graphql@16`.
4. Move GraphQL generation to modern Codegen with typed documents/client preset where practical.
5. Rebuild UI incrementally with Tailwind and modern component primitives; remove `styled-components` by route or feature area.

Packages to replace rather than simply bump:

- `react-google-login` -> `@react-oauth/google`
- `react-facebook-login` -> direct SDK/OAuth integration or a maintained auth abstraction
- `moment` -> `date-fns` or `dayjs`
- `react-table@7` -> `@tanstack/react-table`
- `react-feather` and FontAwesome split icon usage -> `lucide-react`
- `babel-eslint` -> `@babel/eslint-parser` if still needed
- `eslint-loader` -> `eslint-webpack-plugin` if Webpack remains, otherwise remove with Vite migration
