/**
 * PostHog analytics — the single entry point the rest of the app uses.
 *
 *   import { initAnalytics, track } from 'lib/analytics';
 *   initAnalytics();                        // once, near the app root
 *   track('course_view', { course_code }); // anywhere
 *
 * Events go ONLY to PostHog Cloud. PostHog handles identity, sessions, event
 * batching, delivery on tab-hide/unload, Do-Not-Track, and SPA pageviews for
 * us, so there is no custom transport here — `track()` is a thin wrapper over
 * `posthog.capture` that can never throw into the React tree.
 *
 * Pageviews/pageleaves are captured automatically by PostHog (see `init`); only
 * semantic product events are sent explicitly through `track()`.
 *
 * Configuration (build-time, inlined by CRA's DefinePlugin):
 *   REACT_APP_POSTHOG_KEY  — public PostHog project API key (safe in client JS).
 *                            When unset, analytics is a no-op (local dev).
 *   REACT_APP_POSTHOG_HOST — ingestion host (defaults to US cloud).
 */

import posthog from 'posthog-js';

import type { EventName, EventProps } from './types';

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
      // We send deliberate, semantic events via track(); no DOM autocapture.
      autocapture: false,
      // Honour the browser Do-Not-Track signal.
      respect_dnt: true,
    });
    enabled = true;
  } catch {
    // Analytics must never break the app.
  }
};

/**
 * Track a semantic product event. No-ops until `initAnalytics()` has run with a
 * configured key. Never throws.
 */
export const track = (name: EventName, props?: EventProps): void => {
  if (!enabled) {
    return;
  }

  try {
    posthog.capture(name, props);
  } catch {
    // Swallow — analytics must never break the app.
  }
};

export type { EventName, EventProps, PropValue } from './types';
