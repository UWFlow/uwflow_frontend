@README.md

## Pre-commit requirement

Before every commit, run `yarn lint-nofix` and confirm it exits clean. This is required by CI/CD — commits that fail it will not pass the pipeline.

## Skills

This project keeps reusable skills under `.AGENTS/skills/`. Each subdirectory contains a `SKILL.md` describing when and how to use it.

Before starting any non-trivial task, list `.AGENTS/skills/` and read the `SKILL.md` of every skill whose description plausibly matches the task. Multiple skills may apply to one task — read all relevant ones before writing code or files. Treat each `SKILL.md` as authoritative for its domain.
