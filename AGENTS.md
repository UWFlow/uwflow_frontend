# AGENTS.md

## Setup

- `yarn install` — install dependencies
- `yarn start` — run dev server at http://localhost:3000

## Backend (highly recommended)

The frontend is mostly useless without a running backend — there is no data to render, so most pages will be empty or broken. It is **highly recommended** to fork and run the backend before doing frontend development.

1. Fork and clone the backend from https://github.com/UWFlow/uwflow (the `uwflow` repo)
2. Reference the documentation in the backend README.md

All references to the uwflow repo refer to this backend repo. 

## Skills

This project keeps reusable skills under `.AGENTS/skills/`. Each subdirectory contains a `SKILL.md` describing when and how to use it.

Before starting any non-trivial task, list `.AGENTS/skills/` and read the `SKILL.md` of every skill whose description plausibly matches the task. Multiple skills may apply to one task — read all relevant ones before writing code or files. Treat each `SKILL.md` as authoritative for its domain.
