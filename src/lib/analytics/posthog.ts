/**
 * PostHog Cloud dual-send.
 *
 * PostHog is our product-analytics surface (dashboards / funnels / retention).
 * It is loaded lazily on the first tracked event so it has zero cost on routes
 * where nothing is ever tracked, and it no-ops cleanly when no project key is
 * configured (e.g. local dev) so the app behaves identically with or without it.
 *
 * Configuration (build-time, inlined by CRA's DefinePlugin):
 *   REACT_APP_POSTHOG_KEY  — public PostHog project API key (safe in client JS)
 *   REACT_APP_POSTHOG_HOST — PostHog ingestion host (defaults to US cloud)
 */

import type { PostHog } from 'posthog-js';

import type { EventName, EventProps } from './types';

const POSTHOG_KEY = process.env.REACT_APP_POSTHOG_KEY;
const POSTHOG_HOST =
  process.env.REACT_APP_POSTHOG_HOST || 'https://us.i.posthog.com';

let instance: PostHog | null = null;
let loadPromise: Promise<PostHog | null> | null = null;
/** Anonymous id to identify once PostHog finishes loading. */
let pendingIdentity: string | null = null;

/** Whether a PostHog key is configured at all. */
export const isPostHogEnabled = (): boolean => Boolean(POSTHOG_KEY);

/**
 * Kick off the (one-time) lazy import + init of posthog-js. Returns the live
 * instance once ready, or null if PostHog is disabled / failed to load. Safe to
 * call repeatedly — the import only happens once.
 */
const ensurePostHog = (): Promise<PostHog | null> => {
  if (!POSTHOG_KEY) {
    return Promise.resolve(null);
  }
  if (instance) {
    return Promise.resolve(instance);
  }
  if (loadPromise) {
    return loadPromise;
  }

  loadPromise = import('posthog-js')
    .then(({ default: posthog }) => {
      posthog.init(POSTHOG_KEY, {
        api_host: POSTHOG_HOST,
        // We drive all capture() calls explicitly from track(); disable the
        // library's own autocapture/pageview so the two stores stay aligned.
        autocapture: false,
        capture_pageview: false,
        capture_pageleave: true,
        // We manage the anonymous id ourselves; respect DNT at the lib level too.
        respect_dnt: true,
        persistence: 'localStorage',
      });
      instance = posthog;
      if (pendingIdentity) {
        try {
          posthog.identify(pendingIdentity);
        } catch {
          // ignore
        }
        pendingIdentity = null;
      }
      return posthog;
    })
    .catch(() => {
      // Network/script failure must never surface to the app.
      return null;
    });

  return loadPromise;
};

/**
 * Associate subsequent PostHog events with our anonymous_id so PostHog's person
 * profiles line up with our raw store. If PostHog hasn't loaded yet, the id is
 * applied as soon as it does.
 */
export const identifyPostHog = (anonymousId: string): void => {
  if (!POSTHOG_KEY) {
    return;
  }
  if (instance) {
    try {
      instance.identify(anonymousId);
    } catch {
      // ignore
    }
    return;
  }
  pendingIdentity = anonymousId;
  // Trigger the lazy load so identity is applied promptly.
  void ensurePostHog();
};

/** Forward a tracked event to PostHog Cloud. Never throws. */
export const capturePostHog = (name: EventName, props: EventProps): void => {
  if (!POSTHOG_KEY) {
    return;
  }
  void ensurePostHog().then((ph) => {
    if (!ph) {
      return;
    }
    try {
      ph.capture(name, props);
    } catch {
      // ignore
    }
  });
};
