/**
 * Public analytics API.
 *
 * Usage:
 *   import { initAnalytics, track } from 'lib/analytics';
 *   initAnalytics();                       // once, near app root
 *   track('course_view', { course_code }); // anywhere
 *
 * Route-level events (session_start / page_view / page_dwell) are wired by the
 * `usePageTracking` hook mounted near the router.
 *
 * See docs/analytics.md for the event taxonomy, the ingestion contract, and the
 * environment variables (PostHog key/host) a deployer must set.
 */

export { analytics, initAnalytics, track } from './client';
export { usePageTracking } from './usePageTracking';
export { getAnonymousId } from './ids';
export type { AnalyticsEvent, EventName, EventProps, PropValue } from './types';
