# UW Flow 2.0 Frontend

[![CircleCI](https://circleci.com/gh/UWFlow/uwflow_frontend.svg?style=svg)](https://circleci.com/gh/UWFlow/uwflow_frontend.svg?style=svg)

## ⚙️ Frontend Setup ⚙

1. `bun install` to install dependencies
2. `bun run start` to run the server locally at [localhost:3000](localhost:3000)

## 🎬 Building for Production 🎬

1. `bun run lint` to check that there are no linter errors, otherwise the site will not compile
2. `bun run build` to create a new production build in the `build` folder

## 🌐 Interacting with the Backend 🌐

Clone the [backend repository](https://github.com/UWFlow/uwflow) and follow its [README](https://github.com/UWFlow/uwflow/blob/main/README.md)

### Vercel preview backend

The frontend accepts `REACT_APP_BACKEND_PATH` as a public build-time setting.
In Vercel **Settings → Environment Variables**, add it for **Preview** and select
which Git branch the value applies to:

| Preview backend | `REACT_APP_BACKEND_PATH` |
| --- | --- |
| Production | `/prod` |
| Shared staging | `/staging` |

You can set a default for all Preview branches and override it for individual
branches. See [Vercel's environment variable documentation](https://vercel.com/docs/environment-variables).
Leave `REACT_APP_BACKEND_ENDPOINT` and `REACT_APP_GRAPHQL_ENDPOINT` unset, since
these existing explicit overrides take precedence over the path selection.
Redeploy the branch after changing the value; existing deployments retain their
build-time configuration.

Both choices use same-origin requests on the preview domain. `vercel.json`
proxies `/prod/api/...` and `/prod/graphql` to `https://uwflow.com`, and
`/staging/api/...` and `/staging/graphql` to `https://jerryzhou.ca/staging`.
Production-backed previews read and write live production data.

Leave the variable unset for the production site served behind its existing
`/api` and `/graphql` reverse proxy. Vercel previews default to production when
unset. Local development continues to use localhost endpoints.

## 📚 Documentation 📚

- [Code style guide](docs/style-guide.md)
- [GraphQL and TypeScript code generation](docs/graphql.md)
- [Using and creating modals](docs/modals.md)
- [Creating new pages](docs/pages.md)
- [Explanation of client-side search](docs/search.md)
- [Analytics (PostHog)](docs/analytics.md)

#### Important External Docs

- [React](https://reactjs.org/)
- [Apollo Client](https://www.apollographql.com/docs/react/)
- [TypeScript](https://www.typescriptlang.org/index.html)
