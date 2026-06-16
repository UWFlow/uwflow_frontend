/**
 * Analytics event taxonomy.
 *
 * Event names are snake_case and <= 64 chars. `props` is always a flat object
 * of primitive values (string | number | boolean) — never nested objects or
 * arrays — so each maps cleanly onto a PostHog event property.
 */

/** Flat value type allowed inside an event's `props`. */
export type PropValue = string | number | boolean | null | undefined;

/** Flat props bag. Nested objects/arrays are intentionally disallowed. */
export type EventProps = Record<string, PropValue>;

/**
 * The set of semantic events we send to PostHog. Adding a tracked event means
 * adding its name here so every `track()` call site is type-checked against the
 * known set.
 *
 * Pageviews/pageleaves are NOT listed here — PostHog captures those itself
 * (`$pageview` / `$pageleave`); this union is only the deliberate product
 * events the app emits via `track()`.
 */
export type EventName =
  | 'course_view'
  | 'course_search'
  | 'review_view'
  | 'profile_view';
