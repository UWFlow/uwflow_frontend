---
name: create-component
description: How to create or modify a React UI component in the uwflow frontend — file layout, TypeScript conventions, and the Tailwind-first styling rules (use the tailwind.config.js design tokens; do not add new styled-components).
---

# Creating a Component

Follow this when adding a new React component or changing existing UI.

## 1. File layout & conventions

- Put components under `src/components/<feature>/ComponentName.tsx` (PascalCase
  filename = component name).
- Write a functional component with hooks and a `default export`.
- Type props with a TypeScript `interface` / `type`; avoid `any`.
- Icons come from `react-feather` (e.g. `import { GitHub } from 'react-feather'`).
  In-app navigation uses `Link` from `react-router-dom`.

```tsx
import React from 'react';

interface Props {
  label: string;
}

const MyThing = ({ label }: Props) => <div className="...">{label}</div>;

export default MyThing;
```

## 2. Styling: Tailwind, not styled-components

**Use Tailwind utility classes for all new and modified UI. Do NOT add new
`styled-components`.** The many existing styled-components files may remain;
migrate them to Tailwind opportunistically when you touch the file
(`src/components/navigation/Footer.tsx` is an example migration: its old
`styles/Footer.tsx` was deleted and the styles became utility classes).

Always use the named design tokens defined in `tailwind.config.js` instead of
arbitrary `[Npx]` values:

| Kind | Tokens |
|---|---|
| Colors | `primary`, `primaryDark`, `primaryExtraDark`, `dark1`–`dark3`, `light1`–`light4`, `accent`, `red`, … — mirror `src/constants/GlobalTheme.tsx`, keep the two in sync |
| Font size | `text-xs` 12 / `text-sm` 14 / `text-md` 16 / `text-lg` 18 / `text-xl` 20 / `text-2xl` 28 / `text-3xl` 32 / `text-4xl` 40 (px) |
| Font family | `font-inter`, `font-anderson` |
| Font weight | `font-light` 300 / `font-regular` 400 / `font-semibold` 600 / `font-extrabold` 800 |
| Radius | `rounded-card` (4px) for cards/chips |
| Spacing | `p-page` (32px) plus the standard Tailwind scale (`p-4` = 16px, `gap-2` = 8px, …) |
| Breakpoints | `mobileLarge` 600, `tablet` 800, `tabletDown` (max 800), `desktop` 1200 |

If a value you need isn't in the scale, snap to the nearest token or add a new
named token to `tailwind.config.js` (and document it) — don't reach for
arbitrary values. One-off structural dimensions (a fixed illustration width, a
7px progress dot) may stay as `[Npx]`.

Notes:

- Tailwind's preflight is disabled (the app ships its own reset in
  `public/index.css`), so set any resets you rely on explicitly.
- For a one-off responsive rule with no named breakpoint, an arbitrary variant
  such as `max-[500px]:flex-col` is acceptable.

## 3. Before committing

Run `bun run lint-nofix` and confirm it exits clean — this is required by CI.
