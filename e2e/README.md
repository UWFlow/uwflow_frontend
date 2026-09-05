# Website E2E: watch it before automating it

This suite exercises the **real frontend, Go email auth API, Hasura permissions,
and PostgreSQL writes**. No application response is mocked. It covers email
signup, login/logout, posting a course review, editing it, and common validation
and cancellation paths. It is intentionally opt-in; no CI workflow is added.

## Start here

Use Node 20+ and the repository's Bun version. Start your existing **local**
backend (Postgres, Hasura, Go API) according to `../../uwflow/README.md`. It must
have its migrations/metadata applied and course data including `cs135`.
The suite does not start Docker, restore a database, or stop other worktrees.

From this frontend worktree:

```sh
bun install --frozen-lockfile
bun run e2e:install
bun run e2e:build
bun run e2e:check
bun run e2e:walkthrough
```

The walkthrough opens Chromium and the Playwright Inspector. Press **Resume**
to reach the next checkpoint, or **Step over** to inspect individual actions.
It pauses at the filled signup form, welcome page, logged-out page, logged-in
page, review before posting, saved review, edit before saving, and saved edit.
You can inspect the real page at each pause. Resume after the final checkpoint
to let cleanup finish. Debug mode has no test timeout.

For continuous playback instead of pauses:

```sh
bun run e2e:watch
```

For a clickable list of tests, source, network requests, and DOM snapshots:

```sh
bun run e2e:ui
```

The same flow functions drive these modes and unattended runs. See
[Playwright Inspector](https://playwright.dev/docs/debug) and
[UI mode](https://playwright.dev/docs/test-ui-mode).

## Manual review checklist

| Checkpoint   | What you should see / try                                                     |
| ------------ | ----------------------------------------------------------------------------- |
| Signup       | Correct name/email fields, masked passwords, successful welcome redirect      |
| Logout       | Login control returns and remains after refresh                               |
| Login        | Same account restored; refresh keeps it logged in                             |
| New review   | Post disabled until useful/easy/like are selected; anonymous selected         |
| Saved review | Exact submitted comment remains after refresh                                 |
| Edit         | Original comment prefilled; edited text replaces it after refresh             |
| Finished     | Same review ID, exactly one review; disposable account/history/review removed |

The test generates its own credentials. Do not replace them with your personal
login. UI mode reruns and retries each get fresh accounts. If you want to click
through entirely by hand, run `bun run e2e:serve` and open
`http://localhost:3100`; manually created accounts are outside fixture cleanup.
Stop that server before running Playwright, which owns port 3100 itself.

## Coverage and fixtures

| File                  | Coverage                                                                                                                       |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `walkthrough.spec.js` | UI signup → logout → UI login → post → edit; welcome redirect, session persistence, saved text, stable review ID, no duplicate |
| `auth.spec.js`        | Independent login/logout; wrong password; required names and mismatched passwords; duplicate email                             |
| `reviews.spec.js`     | Logged-out auth gate; required review ratings; persisted post; cancelling an edit                                              |

Every account uses a random `uwflow-e2e-<UUID>@example.invalid` address. Isolated
tests seed accounts through the real registration API; the walkthrough creates
its account entirely through the website. There is no shared storage state or
test-order dependency. API cleanup runs in fixture teardown, including failures,
and verifies that the user, reviews, and course-history rows are gone.

Reviewing requires a course-history row, which users normally get by uploading
a transcript. The suite explicitly seeds **only that prerequisite** with Hasura
admin access, using term 1261. It does not claim to test transcript upload.
The browser never receives the admin secret. Review writes go through the UI
under the real user's JWT; persistence checks query using that same JWT.

Tests currently use desktop Chromium, email/password auth, anonymous course
reviews, and the lowest useful/easy ratings. OAuth, email delivery/password reset,
professor reviews, uploads, search, scheduling, favorites, mobile layouts, and
other browsers are outside this first suite's scope.

The existing slider, like-radio, and profile-menu controls lack accessible
names. Their few structural selectors are centralized in `support/flows.js`;
the remaining selectors use visible text, placeholders, or button roles.
There are no fixed sleeps in assertions; `slowMo` is only for watch mode.

## Configuration

Copy `.env.e2e.example` to `.env.e2e.local` if needed. Defaults are API port 8081,
Hasura port 8080, and course `cs135`. `E2E_BACKEND_ENV` names the backend env file
containing `HASURA_GRAPHQL_ADMIN_SECRET` (default `../uwflow/.env`). Alternatively
set `E2E_HASURA_ADMIN_SECRET` directly. Never use a `REACT_APP_*` name for it.
Point this at the env file belonging to the backend actually running locally.

The frontend is built specifically for same-origin `/api` and `/graphql` and
served on `http://localhost:3100` with local proxies. Rebuild after app changes;
this is a production build, not a hot-reloading dev server. Existing frontend
servers/builds in other worktrees are not reused. Browser requests to third-party
analytics/social/image services are blocked; application traffic is real.

Only HTTP loopback backend URLs are accepted. Do not point those ports at a
production SSH tunnel. Use a development database. Cleanup never resets tables;
it can delete only this run's generated accounts. Force-killing the runner or
losing the backend during teardown can leave test data; `test-account` report
attachments identify the exact account for manual removal.

## When you are ready for an unattended runner

```sh
bun run e2e:list              # Discover tests without opening a browser
bun run e2e:harness           # Terminal-only cleanup/error-handling checks
bun run e2e                  # All tests, headless; no automatic retries
bun run e2e -- auth.spec.js   # Run one feature independently
bun run e2e:report           # Open the last HTML report
```

All runs retain videos and traces, including passing runs, under ignored
`test-results/` and `playwright-report/`. The report has named walkthrough steps
and links to those artifacts. They contain test credentials and local page data;
review before sharing. The admin secret is only used in Node fixture requests,
which are not browser trace requests.

Before adding CI, provision an isolated backend/database, install Chromium
(`bunx playwright install --with-deps chromium` on Linux), build, preflight, run,
and retain these artifact directories. No production credentials are needed.

## Validation status

Browser execution is deliberately left to the human reviewer, per this
workspace's terminal-only visual-check instructions. Test discovery, application
lint/typecheck/build, and the Node harness checks can be run without browser UI.
Passing these is **not** evidence that the browser journeys pass; run the
walkthrough against the local backend before enabling CI.

Initial terminal validation passed: frontend lint, TypeScript, production build,
seven Node harness checks, discovery of seven browser scenarios, JavaScript
syntax checks, and HTTP checks for the SPA course route and unavailable-backend
proxy response. The initial live preflight stopped at
`http://127.0.0.1:8080/v1/graphql` with `ECONNREFUSED` (Docker was stopped).
No website E2E pass or visual approval is claimed.
