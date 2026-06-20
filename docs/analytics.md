# Analytics

UW Flow sends product analytics to **PostHog Cloud** and nothing else. PostHog
is the single destination: it stores the events and powers dashboards, funnels,
and retention.

There is no custom ingestion endpoint and no second store — every tracked event
is a single `posthog.capture(...)`.

## Client architecture

Everything lives under [`src/lib/analytics/`](../src/lib/analytics):

| File         | Responsibility                                               |
|--------------|--------------------------------------------------------------|
| `types.ts`   | Event taxonomy (`EventName`) and `props` types.              |
| `index.ts`   | `initAnalytics()` + `track()` — a thin, never-throws wrapper over `posthog.capture`. |

That's the whole library. PostHog itself handles the parts we used to hand-roll:

- **Identity & sessions** — PostHog assigns an anonymous `distinct_id` and tracks
  sessions automatically. (Call `posthog.identify(userId)` later if/when we want
  to tie events to a logged-in user.)
- **Delivery** — PostHog batches events and flushes them, including on tab hide /
  unload, so we don't manage a buffer or `sendBeacon`.
- **Pageviews** — captured automatically on SPA navigation via
  `capture_pageview: 'history_change'`, plus `$pageleave` on exit. We do **not**
  emit our own `page_view` events.
- **Do-Not-Track** — `respect_dnt: true` makes PostHog a no-op when the browser
  sends a DNT signal.

`autocapture` is disabled: we send deliberate, semantic events (below) rather
than raw DOM clicks, so the event stream stays intentional.

## Usage

```ts
import { initAnalytics, track } from 'lib/analytics';

initAnalytics();                          // once, near the app root (App.tsx)
track('course_view', { course_code });    // anywhere
```

- `track()` is fire-and-forget and never throws; safe to call in handlers/effects.
- It no-ops until `initAnalytics()` runs **and** a PostHog key is configured, so
  local dev without a key behaves identically to production.

### Adding a new event

1. Add its snake_case name (≤ 64 chars) to the `EventName` union in
   [`types.ts`](../src/lib/analytics/types.ts).
2. Add a row to the taxonomy table below.
3. Call `track('your_event', { ...flat_props })` at the interaction site.

`props` must be a **flat** object of `string | number | boolean` (no nested
objects/arrays). Never put PII in props (no emails, passwords, or names) — use
ids, codes, and booleans.

## Event taxonomy

(Plus PostHog's automatic `$pageview` / `$pageleave`.)

| Event           | When                                   | Key props                                | Instrumented in |
|-----------------|----------------------------------------|------------------------------------------|-----------------|
| `course_view`   | Course page mounts                     | `course_code`                            | `pages/coursePage/CoursePage.tsx` |
| `course_search` | Debounced explore search settles       | `query`, `results_count`, `code_search`  | `pages/explorePage/ExplorePage.tsx` |
| `review_view`   | Course reviews load                    | `course_id`, `review_count`              | `pages/coursePage/CourseReviews.tsx` |
| `profile_view`  | Professor profile page mounts          | `prof_code`                              | `pages/profPage/ProfPage.tsx` |

## Environment variables

Set these for the deploy (see [`.env.sample`](../.env.sample)). Both are
build-time `REACT_APP_*` vars inlined by CRA.

| Variable                 | Required | Default                    | Purpose |
|--------------------------|----------|----------------------------|---------|
| `REACT_APP_POSTHOG_KEY`  | No       | _(unset → analytics off)_  | Public PostHog project API key. When unset, `track()` is a no-op (expected in local dev). |
| `REACT_APP_POSTHOG_HOST` | No       | `https://us.i.posthog.com` | PostHog ingestion host (use `https://eu.i.posthog.com` for EU). |

The PostHog key is public by design — a key shipped in client JS can't be secret.
