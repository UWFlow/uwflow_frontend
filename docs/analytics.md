# Analytics

UW Flow sends product analytics to **PostHog Cloud** and nothing else. PostHog
is the single destination: it stores the events and powers dashboards, funnels,
and retention.

PostHog's automatic pageview/session capture is the backbone of our analytics —
there is no custom ingestion endpoint and no second store. On top of that we emit
a handful of explicit `track()` events for key product actions (e.g.
`swap_schedule_upload_attempt` when a user submits a schedule on the Swap page).

## Client architecture

Everything lives under [`src/lib/analytics/`](../src/lib/analytics):

| File         | Responsibility                                               |
|--------------|--------------------------------------------------------------|
| `index.ts`   | `initAnalytics()` — initialize PostHog once, near the app root. `track(event, props?)` — emit a custom event (no-ops until init'd). Never throws. |

PostHog itself handles everything we used to hand-roll:

- **Pageviews & sessions** — captured automatically on SPA navigation via
  `capture_pageview: 'history_change'`, plus `$pageleave` on exit. We do **not**
  emit our own `page_view` or `*_view` events.
- **Identity & sessions** — PostHog assigns an anonymous `distinct_id` and tracks
  sessions automatically. (Call `posthog.identify(userId)` later if/when we want
  to tie events to a logged-in user.)
- **Delivery** — PostHog batches events and flushes them, including on tab hide /
  unload, so we don't manage a buffer or `sendBeacon`.
- **Do-Not-Track** — `respect_dnt: true` makes PostHog a no-op when the browser
  sends a DNT signal.

`autocapture` is disabled: we don't want raw DOM clicks in the stream, only
PostHog's pageview/session signals.

## Usage

```ts
import { initAnalytics } from 'lib/analytics';

initAnalytics(); // once, near the app root (App.tsx)
```

`initAnalytics()` no-ops until a PostHog key is configured, so local dev without
a key behaves identically to production.

## Environment variables

Set these for the deploy (see [`.env.sample`](../.env.sample)). Both are
build-time `REACT_APP_*` vars inlined by CRA.

| Variable                 | Required | Default                    | Purpose |
|--------------------------|----------|----------------------------|---------|
| `REACT_APP_POSTHOG_KEY`  | No       | _(unset → analytics off)_  | Public PostHog project API key. When unset, analytics is a no-op (expected in local dev). |
| `REACT_APP_POSTHOG_HOST` | No       | `https://us.i.posthog.com` | PostHog ingestion host (use `https://eu.i.posthog.com` for EU). |

The PostHog key is public by design — a key shipped in client JS can't be secret.
</content>
</invoke>
