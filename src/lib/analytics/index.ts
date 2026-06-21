/**
 * PostHog analytics — the single entry point the rest of the app uses.
 *
 *   import { initAnalytics } from 'lib/analytics';
 *   initAnalytics();  // once, near the app root
 *
 * We don't emit any custom events: PostHog captures pageviews/pageleaves and
 * sessions automatically, and that's the whole of our analytics. PostHog also
 * handles identity, batching, delivery on tab-hide/unload, and Do-Not-Track.
 *
 * Configuration (build-time, inlined by CRA's DefinePlugin):
 *   REACT_APP_POSTHOG_KEY  — public PostHog project API key (safe in client JS).
 *                            When unset, analytics is a no-op (local dev).
 *   REACT_APP_POSTHOG_HOST — ingestion host (defaults to US cloud).
 */

import posthog from 'posthog-js';

const POSTHOG_KEY = process.env.REACT_APP_POSTHOG_KEY;
const POSTHOG_HOST =
  process.env.REACT_APP_POSTHOG_HOST || 'https://us.i.posthog.com';

let enabled = false;

/**
 * Initialize PostHog once, near the app root. No-ops when no project key is
 * configured (e.g. local dev) so the app behaves identically with or without
 * it. Safe to call repeatedly.
 */
export const initAnalytics = (): void => {
  if (enabled || !POSTHOG_KEY) {
    return;
  }

  try {
    posthog.init(POSTHOG_KEY, {
      api_host: POSTHOG_HOST,
      // PostHog captures pageviews on History API changes (SPA navigation) and
      // pageleaves itself, so we don't hand-roll route tracking.
      capture_pageview: 'history_change',
      capture_pageleave: true,
      // No DOM autocapture — pageviews/sessions are the only analytics we want.
      autocapture: false,
      // Honour the browser Do-Not-Track signal.
      respect_dnt: true,
    });
    enabled = true;
  } catch {
    // Analytics must never break the app.
  }
};
