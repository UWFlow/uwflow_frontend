# AGENTS.md

## Setup

- `yarn install` — install dependencies
- `yarn start` — run dev server at http://localhost:3000

## Backend (highly recommended)

The frontend is mostly useless without a running backend — there is no data to
render, so most pages will be empty or broken. It is **highly recommended** to
fork and run the backend before doing frontend development.

1. Fork and clone the backend from https://github.com/UWFlow (the `uwflow` repo)
2. From the backend repo root, run the relevant `make` targets:

   - `make setup-contrib` — initialize the database from scratch using
     migrations and the UW API (one-time, for contributors)
   - `make start` — start backend services in dev mode (api, postgres, hasura,
     uw, email)
   - `make migrate` — apply Hasura migrations (requires the `hasura` CLI)
   - `make stop` — stop all running services
   - `make ps` — show status of all services
   - `make clean` — tear down containers/volumes and reset the environment
   - `make help` — list all available targets

   Once running, the backend exposes GraphQL at http://localhost:8080 and the
   API server at http://localhost:8081, which this frontend talks to.
