/**
 * Analytics client — the single entry point the rest of the app uses.
 *
 * Responsibilities:
 *   1. Buffer tracked events in memory and flush them in batches to our own
 *      ingestion endpoint (POST <BACKEND_ENDPOINT>/events). This is the raw
 *      store (ClickHouse + S3 archival on the backend).
 *   2. Dual-send every event to PostHog Cloud for product dashboards.
 *
 * Design constraints (hard requirements):
 *   - Analytics must NEVER throw into the React tree or block navigation. Every
 *     public method is wrapped so a failure is swallowed (optionally logged).
 *   - Respect navigator.doNotTrack: when set, the client becomes a no-op.
 *   - On page unload / tab hide, flush via navigator.sendBeacon so in-flight
 *     events survive the navigation.
 *
 * The ingestion base URL is resolved through the SAME mechanism every other
 * custom (non-GraphQL) backend call uses: the `BACKEND_ENDPOINT` constant
 * (constants/Api.tsx), which is `/api` in production (proxied to the Go backend
 * — see vercel.json rewrites) and http://localhost:8081 in development, with a
 * REACT_APP_BACKEND_ENDPOINT override. We simply append `/events`.
 */

import { BACKEND_ENDPOINT } from 'constants/Api';

import { getAnonymousId, getSession } from './ids';
import { capturePostHog, identifyPostHog, isPostHogEnabled } from './posthog';
import type {
  AnalyticsEvent,
  EventName,
  EventProps,
  IngestBody,
} from './types';

/** Path appended to BACKEND_ENDPOINT for the ingestion endpoint. */
const EVENTS_ENDPOINT = '/events';

/** Flush when the buffer reaches this many events. */
const FLUSH_BATCH_SIZE = 10;
/** Periodic auto-flush interval. */
const FLUSH_INTERVAL_MS = 5000;
/** Cap the buffer so a long offline period can't grow it without bound. */
const MAX_BUFFER_SIZE = 100;

const ingestUrl = (): string => `${BACKEND_ENDPOINT}${EVENTS_ENDPOINT}`;

/**
 * Honour the user's Do-Not-Track preference. Checked once at module init; if the
 * user enabled DNT, the whole client becomes a silent no-op.
 */
const isDoNotTrack = (): boolean => {
  try {
    const nav = navigator as Navigator & {
      msDoNotTrack?: string;
    };
    const win = window as Window & { doNotTrack?: string };
    const dnt = nav.doNotTrack || win.doNotTrack || nav.msDoNotTrack;
    return dnt === '1' || dnt === 'yes';
  } catch {
    return false;
  }
};

class AnalyticsClient {
  private buffer: AnalyticsEvent[] = [];

  private timer: ReturnType<typeof setInterval> | null = null;

  private enabled = false;

  private initialized = false;

  /** Previous path, used as the `referrer` for the next event. */
  private lastPath: string;

  constructor() {
    this.lastPath = this.safeReferrer();
  }

  private safeReferrer(): string {
    try {
      return document.referrer || '';
    } catch {
      return '';
    }
  }

  private currentUrl(): string {
    try {
      return window.location.pathname + window.location.search;
    } catch {
      return '';
    }
  }

  /**
   * Initialize the client. Idempotent. Sets up the flush interval and the
   * unload/visibility listeners. No-ops (leaving the client disabled) when the
   * user has Do-Not-Track enabled.
   */
  init(): void {
    if (this.initialized) {
      return;
    }
    this.initialized = true;

    if (isDoNotTrack()) {
      // Stay disabled; every track() call will be a no-op.
      return;
    }

    this.enabled = true;

    try {
      // Identify PostHog with our stable anonymous id up front.
      if (isPostHogEnabled()) {
        identifyPostHog(getAnonymousId());
      }

      this.timer = setInterval(() => this.flush(), FLUSH_INTERVAL_MS);

      // Flush on tab hide / unload using sendBeacon so events survive nav.
      const flushBeacon = () => this.flush(true);
      document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'hidden') {
          flushBeacon();
        }
      });
      window.addEventListener('pagehide', flushBeacon);
      window.addEventListener('beforeunload', flushBeacon);
    } catch {
      // Setup failed; degrade gracefully but keep enabled so in-buffer flushes
      // via the interval/track path can still attempt to send.
    }
  }

  /**
   * Track an event. Enqueues into the in-memory buffer (flushing when full) and
   * dual-sends to PostHog. Never throws.
   */
  track(name: EventName, props: EventProps = {}): void {
    if (!this.enabled) {
      return;
    }
    try {
      const url = this.currentUrl();
      const { sessionId } = getSession();

      const event: AnalyticsEvent = {
        name,
        ts: Date.now(),
        anonymous_id: getAnonymousId(),
        session_id: sessionId,
        url,
        referrer: this.lastPath,
        props: this.sanitizeProps(props),
      };

      this.buffer.push(event);
      if (this.buffer.length > MAX_BUFFER_SIZE) {
        // Drop the oldest to bound memory.
        this.buffer.splice(0, this.buffer.length - MAX_BUFFER_SIZE);
      }

      // Dual-send to PostHog Cloud.
      capturePostHog(name, event.props);

      if (this.buffer.length >= FLUSH_BATCH_SIZE) {
        this.flush();
      }
    } catch {
      // Swallow — analytics must never break the app.
    }
  }

  /**
   * Record a route change so the next event's `referrer` reflects the page the
   * user navigated from. Call this AFTER emitting the page_view/page_dwell for
   * the old path.
   */
  setReferrer(path: string): void {
    this.lastPath = path;
  }

  /**
   * Strip any non-primitive values from props so the wire payload stays flat
   * (string | number | boolean), matching the ingestion contract.
   */
  private sanitizeProps(props: EventProps): EventProps {
    const out: EventProps = {};
    try {
      Object.keys(props).forEach((key) => {
        const value = props[key];
        if (
          value === null ||
          value === undefined ||
          typeof value === 'string' ||
          typeof value === 'number' ||
          typeof value === 'boolean'
        ) {
          out[key] = value;
        } else {
          // Coerce anything unexpected to a string rather than dropping it.
          out[key] = String(value);
        }
      });
    } catch {
      // ignore — return whatever we accumulated
    }
    return out;
  }

  /**
   * Flush buffered events to the ingestion endpoint. When `useBeacon` is true
   * (page hide / unload), uses navigator.sendBeacon which is non-blocking and
   * survives navigation; otherwise uses a keepalive fetch. Fire-and-forget.
   */
  flush(useBeacon = false): void {
    if (!this.enabled || this.buffer.length === 0) {
      return;
    }

    // Take ownership of the current batch up front so concurrent track() calls
    // accumulate into a fresh buffer.
    const events = this.buffer;
    this.buffer = [];

    const body: IngestBody = { events };
    const url = ingestUrl();

    try {
      const payload = JSON.stringify(body);

      if (useBeacon && typeof navigator.sendBeacon === 'function') {
        const blob = new Blob([payload], { type: 'application/json' });
        const ok = navigator.sendBeacon(url, blob);
        if (!ok) {
          // Beacon was rejected (e.g. payload too large) — re-queue for a
          // later normal flush rather than losing the events.
          this.buffer = events.concat(this.buffer);
        }
        return;
      }

      // Normal path: keepalive fetch so it can complete even if the page is
      // navigating. Backend responds 202; we ignore the body.
      void fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: payload,
        keepalive: true,
      }).catch(() => {
        // Network failure: re-queue so the next flush retries.
        this.buffer = events.concat(this.buffer);
        if (this.buffer.length > MAX_BUFFER_SIZE) {
          this.buffer.splice(0, this.buffer.length - MAX_BUFFER_SIZE);
        }
      });
    } catch {
      // Serialization/transport failed — re-queue and move on.
      this.buffer = events.concat(this.buffer);
    }
  }
}

/** Singleton analytics client used throughout the app. */
export const analytics = new AnalyticsClient();

/** Convenience: initialize the client once (called from App). */
export const initAnalytics = (): void => analytics.init();

/** Convenience: track an event. */
export const track = (name: EventName, props?: EventProps): void =>
  analytics.track(name, props);
