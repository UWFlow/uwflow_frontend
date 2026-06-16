# Analytics

UW Flow's events-analytics pipeline. The frontend **dual-sends** every tracked
event to two destinations:

1. **Our own ingestion endpoint** (`POST /events` on the Go backend) — the raw
   store. The backend writes events to ClickHouse and archives them to S3.
2. **PostHog Cloud** (`posthog.capture`) — product dashboards, funnels, and
   retention.

PostHog is for analysis surfaces; our endpoint is the source of truth. The two
receive the same events so they can be reconciled.

## Client architecture

Everything lives under [`src/lib/analytics/`](../src/lib/analytics):

| File                 | Responsibility                                              |
|----------------------|-------------------------------------------------------------|
| `types.ts`           | Event taxonomy (`EventName`), `props`, and wire types.      |
| `ids.ts`             | `anonymous_id` + `session_id` management, uuid v4 generator.|
| `posthog.ts`         | Lazy-init PostHog dual-send (no-ops when no key).           |
| `client.ts`          | Buffer + batched flush to `/events`, DNT guard, singleton.  |
| `usePageTracking.ts` | Route-change hook: `session_start`, `page_view`, `page_dwell`.|
| `index.ts`           | Public API barrel.                                          |

### Identity

- `anonymous_id` — uuid v4 persisted in `localStorage`
  (`uwflow_analytics_anonymous_id`). Stable across sessions/tabs.
- `session_id` — uuid v4 in `sessionStorage` (`uwflow_analytics_session_id`),
  regenerated after **~30 minutes of inactivity**.

### Buffering & delivery

- `track(name, props?)` enqueues an event in an in-memory buffer.
- The buffer auto-flushes every **~5 s**, or immediately when it hits **10**
  events.
- On `visibilitychange → hidden`, `pagehide`, and `beforeunload`, the buffer is
  flushed via `navigator.sendBeacon` so in-flight events survive navigation.
- Normal flushes use a `keepalive` `fetch`. Failed sends are re-queued.
- Analytics is wrapped so it **can never throw into the React tree or block
  navigation**, and it becomes a silent no-op when `navigator.doNotTrack` is
  set.

## Ingestion contract

`POST <BACKEND_ENDPOINT>/events`, `Content-Type: application/json`. The backend
responds `202`; the body is ignored.

```json
{
  "events": [
    {
      "name": "course_view",
      "ts": 1718500000000,
      "anonymous_id": "uuid-v4",
      "session_id": "uuid-v4",
      "url": "/course/cs246",
      "referrer": "/explore",
      "props": { "course_code": "cs246" }
    }
  ]
}
```

- `name` — snake_case, ≤ 64 chars.
- `ts` — epoch millis (`Date.now()`).
- `url` — `location.pathname + location.search`.
- `referrer` — previous in-app path (falls back to `document.referrer`).
- `props` — flat object of `string | number | boolean` (nested values are
  coerced/stripped client-side).

### How the ingestion URL is resolved

The client appends `/events` to the **same `BACKEND_ENDPOINT` constant** every
other custom (non-GraphQL) backend call uses — see
[`src/constants/Api.tsx`](../src/constants/Api.tsx). No domain is hardcoded:

| Environment | `BACKEND_ENDPOINT` | POST target              |
|-------------|--------------------|--------------------------|
| development | `http://localhost:8081` | `http://localhost:8081/events` |
| production  | `/api` (same-origin, proxied — see `vercel.json` rewrites) | `/api/events` |
| override    | `REACT_APP_BACKEND_ENDPOINT` | `${REACT_APP_BACKEND_ENDPOINT}/events` |

## Event taxonomy (v1)

| Event           | When                                   | Key props                                | Instrumented in |
|-----------------|----------------------------------------|------------------------------------------|-----------------|
| `session_start` | Once per session (tracker mount)       | —                                        | `usePageTracking` |
| `page_view`     | Every route change                     | `path`                                   | `usePageTracking` |
| `page_dwell`    | On navigate-away + tab hide/unload     | `path`, `dwell_ms`                       | `usePageTracking` |
| `course_view`   | Course page mounts                     | `course_code`                            | `pages/coursePage/CoursePage.tsx` |
| `course_search` | Debounced explore search settles       | `query`, `results_count`, `code_search`  | `pages/explorePage/ExplorePage.tsx` |
| `review_view`   | Course reviews load                    | `course_id`, `review_count`              | `pages/coursePage/CourseReviews.tsx` |
| `profile_view`  | Professor profile page mounts          | `prof_code`                              | `pages/profPage/ProfPage.tsx` |

`page_dwell.dwell_ms` is the client-measured residence time per page; the
backend averages these to compute "average retention time".

## Environment variables

Set these for the deploy (see [`.env.sample`](../.env.sample)). All are
build-time `REACT_APP_*` vars inlined by CRA.

| Variable                  | Required | Default                     | Purpose |
|---------------------------|----------|-----------------------------|---------|
| `REACT_APP_POSTHOG_KEY`   | No       | _(unset → PostHog disabled)_ | Public PostHog project API key. When unset, only the `/events` ingestion runs (expected in local dev). |
| `REACT_APP_POSTHOG_HOST`  | No       | `https://us.i.posthog.com`  | PostHog ingestion host (use `https://eu.i.posthog.com` for EU). |
| `REACT_APP_BACKEND_ENDPOINT` | No    | `/api` (prod) / `localhost:8081` (dev) | Backend base; `/events` is appended for ingestion. |

The PostHog key is public by design (a key in client JS can't be secret). The
`/events` endpoint intentionally has **no** API key — it just accepts JSON.
