/**
 * Analytics event taxonomy (v1).
 *
 * Event names are snake_case and <= 64 chars, matching the backend ingestion
 * contract (POST /events). `props` is always a flat object of primitive values
 * (string | number | boolean) — never nested objects/arrays — so it maps cleanly
 * onto ClickHouse columns and PostHog properties.
 */

/** Flat value type allowed inside an event's `props`. */
export type PropValue = string | number | boolean | null | undefined;

/** Flat props bag. Nested objects/arrays are intentionally disallowed. */
export type EventProps = Record<string, PropValue>;

/**
 * The v1 event taxonomy. Adding a new tracked event means adding it here so the
 * `track()` call site is type-checked against the known set of names.
 */
export type EventName =
  | 'session_start'
  | 'page_view'
  | 'page_dwell'
  | 'course_view'
  | 'course_search'
  | 'review_view'
  | 'profile_view';

/**
 * The wire shape of a single event in the `events` array of the POST body.
 * Mirrors the backend ingestion contract exactly.
 */
export type AnalyticsEvent = {
  name: EventName;
  /** epoch millis (Date.now()) */
  ts: number;
  /** uuid v4 persisted in localStorage */
  anonymous_id: string;
  /** uuid v4 in sessionStorage, regenerated after ~30 min idle */
  session_id: string;
  /** current path (location.pathname + search) */
  url: string;
  /** previous path / document.referrer */
  referrer: string;
  /** flat object of string/number/bool */
  props: EventProps;
};

/** The POST /events request body. */
export type IngestBody = {
  events: AnalyticsEvent[];
};
