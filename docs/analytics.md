# Analytics

UW Flow sends product analytics to **PostHog Cloud** and nothing else. PostHog
is the single destination: it stores the events and powers dashboards, funnels,
and retention.

Beyond PostHog's automatic pageview/session capture, we emit a small number of
custom product events (see [Custom events](#custom-events)). There is no custom
ingestion endpoint and no second store — everything goes to PostHog.

## Client architecture

Everything lives under [`src/lib/analytics/`](../src/lib/analytics):

| File         | Responsibility                                               |
|--------------|--------------------------------------------------------------|
| `index.ts`   | `initAnalytics()` (init once near the app root), `capture(event, props)` (emit a custom event), `identify(userId, props?, setOnceProps?)` (tie events to a user, optionally writing person properties). All never throw, no-op when no key is configured, and `capture`/`identify` fire on the side (deferred a macrotask) so they never block UI. |

PostHog itself handles everything we used to hand-roll:

- **Pageviews & sessions** — captured automatically on SPA navigation via
  `capture_pageview: 'history_change'`, plus `$pageleave` on exit. We do **not**
  emit our own `page_view` or `*_view` events.
- **Identity & sessions** — PostHog assigns an anonymous `distinct_id` and tracks
  sessions automatically. After login/signup we call `identify(user_id)` so events
  (and the preceding anonymous session) attach to the user's PostHog person.
- **Delivery** — PostHog batches events and flushes them, including on tab hide /
  unload, so we don't manage a buffer or `sendBeacon`.
- **Do-Not-Track** — `respect_dnt: true` makes PostHog a no-op when the browser
  sends a DNT signal.

`autocapture` is disabled: we don't want raw DOM clicks in the stream, only
PostHog's pageview/session signals.

## Custom events

We deliberately keep custom events few. Today there are four: three that make up
the signup funnel, and one for reviews.

### Signup attribution

Three events share the same attribution properties, so a funnel can be broken
down by any of them at every step:

| Property | Type | Notes |
|----------|------|-------|
| `source` | `AuthSource` | Which piece of UI opened the auth form — see `AUTH_SOURCES` in [`src/constants/Analytics.tsx`](../src/constants/Analytics.tsx). Keep it a closed union; free text fragments the breakdown. |
| `signup_page` | `string` | Route *pattern* the user was on, e.g. `/course/:courseCode`. Low cardinality — use this for breakdowns. |
| `signup_path` | `string` | Concrete pathname, e.g. `/course/cs135`. Use for drill-down. |
| `signup_referrer` | `string \| null` | `document.referrer` at the time the form appeared. |

These are snapshotted in a ref when `AuthForm` **mounts**, not when the event
fires. That matters: a successful signup redirects to `/welcome` before the
deferred `capture` runs, so reading `location` at capture time would report
`/welcome` as the origin of every signup.

For **external** attribution (which site or campaign sent the user) you don't
need any of this — PostHog already records `$referrer`, `$referring_domain`, and
`$initial_utm_*` person properties. `signup_referrer` only covers a user landing
directly on a page with the auth form.

#### `auth_prompt_shown`

Fired when `AuthForm` mounts. The funnel denominator — tells you which prompts
convert, not just which ones produce signups.

#### `signup_form_opened`

Fired when the user switches the form from login to signup. The modal opens on
login, so this is the clearest signup-intent signal available before the account
exists.

#### `account_created`

Fired once when a brand-new account is created (`is_new` from the auth
response), from `AuthForm`'s `onAuthSuccess`. Carries `method` (`'email' |
'google' | 'facebook'`) on top of the attribution properties above.

On signup we also write `initial_signup_method`, `initial_signup_source`, and
`initial_signup_page` as `$set_once` person properties, so first-touch
attribution survives later logins and can be used to segment cohorts long after
the event.

### `review_posted`

Fired when a user posts a review. Two shapes share one event so funnels and
totals stay simple — split on `review_type`.

| Property | Type | Notes |
|----------|------|-------|
| `review_type` | `'full' \| 'like'` | `'full'` = the rich review form; `'like'` = the thumbs up/down toggle. |
| `about_prof` | `boolean` | Whether the review includes a professor. Always `false` for likes. |
| `course_id` / `course_code` | `number` / `string` | The course reviewed. |
| `liked` | `0 \| 1` | Thumbs down / up. |

`review_type: 'full'` adds: `is_update` (editing vs first post), `prof_id`,
`course_useful`, `course_easy`, `prof_clear`, `prof_engaging` (null when no
prof), `has_course_comment`, `has_prof_comment`, `is_anonymous`.

Toggling a like **off** (clearing it) is a removal, not a post, so it emits no
event.

## Usage

```ts
import { initAnalytics, capture, identify } from 'lib/analytics';

initAnalytics(); // once, near the app root (App.tsx)
identify(userId); // after login/signup
// $set_once person props — first touch wins, later logins don't overwrite
identify(userId, undefined, { initial_signup_source: 'nav_profile' });
capture('review_posted', { review_type: 'like', liked: 1 /* … */ });
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
