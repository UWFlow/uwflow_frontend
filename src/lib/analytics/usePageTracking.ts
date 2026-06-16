import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

import { analytics, track } from './client';

/**
 * Mount-once hook (placed near the router) that drives the route-level event
 * taxonomy:
 *
 *   - `session_start` — emitted exactly once per browser session.
 *   - `page_view`     — on every route change, with the destination path.
 *   - `page_dwell`    — time spent on a page, emitted when navigating AWAY from
 *                       it and on tab hide / unload. `props.dwell_ms` is the
 *                       client-measured residence time; the backend averages
 *                       these to get "average retention time".
 *
 * react-router v5: `useLocation()` gives us a new location object on every
 * navigation, so the effect below fires per route change.
 */
export const usePageTracking = (): void => {
  const location = useLocation();
  const path = location.pathname + location.search;

  // Path currently being dwelled on, and when that dwell started.
  const dwellPathRef = useRef<string | null>(null);
  const dwellStartRef = useRef<number>(Date.now());
  // Guard so session_start fires only once for this mounted tracker.
  const startedRef = useRef(false);

  // session_start: once per session, on first mount of the tracker.
  useEffect(() => {
    if (startedRef.current) {
      return;
    }
    startedRef.current = true;
    track('session_start');
  }, []);

  // page_view + page_dwell on route change.
  useEffect(() => {
    const now = Date.now();

    // Emit dwell for the page we are leaving (if any).
    const prevPath = dwellPathRef.current;
    if (prevPath !== null && prevPath !== path) {
      const dwellMs = now - dwellStartRef.current;
      track('page_dwell', { path: prevPath, dwell_ms: dwellMs });
      // The page we just left is now the referrer for subsequent events.
      analytics.setReferrer(prevPath);
    }

    // Emit the page_view for the new path.
    track('page_view', { path });

    // Reset dwell tracking for the new page.
    dwellPathRef.current = path;
    dwellStartRef.current = now;
  }, [path]);

  // Flush a dwell on tab hide / unload so partial dwells aren't lost. We do NOT
  // reset dwellStartRef here, so if the tab becomes visible again the dwell
  // continues to accumulate from the original mount time (a subsequent
  // navigation will then report the full residence time).
  useEffect(() => {
    const emitDwell = () => {
      const current = dwellPathRef.current;
      if (current === null) {
        return;
      }
      const dwellMs = Date.now() - dwellStartRef.current;
      track('page_dwell', { path: current, dwell_ms: dwellMs });
    };

    const onVisibility = () => {
      if (document.visibilityState === 'hidden') {
        emitDwell();
      }
    };

    document.addEventListener('visibilitychange', onVisibility);
    window.addEventListener('pagehide', emitDwell);

    return () => {
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('pagehide', emitDwell);
    };
  }, []);
};
