/**
 * Identity management for analytics.
 *
 * - `anonymous_id`: a uuid v4 persisted in localStorage. Stable across sessions
 *   and tabs for the same browser, used to stitch a visitor's events together.
 * - `session_id`: a uuid v4 stored in sessionStorage. A "session" ends after
 *   ~30 minutes of inactivity, after which a fresh id is minted on the next
 *   tracked interaction.
 *
 * Everything here is defensively wrapped: Storage access can throw (private
 * mode, disabled cookies, sandboxed iframes), so each accessor falls back to an
 * in-memory value rather than letting analytics break the app.
 */

const ANON_ID_KEY = 'uwflow_analytics_anonymous_id';
const SESSION_ID_KEY = 'uwflow_analytics_session_id';
const SESSION_LAST_SEEN_KEY = 'uwflow_analytics_session_last_seen';

/** ~30 minutes of idle time ends a session. */
const SESSION_IDLE_MS = 30 * 60 * 1000;

// In-memory fallbacks used when Web Storage is unavailable or throws.
let memoryAnonId: string | null = null;
let memorySessionId: string | null = null;
let memorySessionLastSeen = 0;

/**
 * Generate a RFC4122 v4 uuid. Prefers crypto.randomUUID / getRandomValues when
 * available, falling back to Math.random so this never throws in old browsers.
 */
export const uuidv4 = (): string => {
  try {
    const cryptoObj: Crypto | undefined =
      typeof crypto !== 'undefined' ? crypto : undefined;

    if (cryptoObj && typeof cryptoObj.randomUUID === 'function') {
      return cryptoObj.randomUUID();
    }

    if (cryptoObj && typeof cryptoObj.getRandomValues === 'function') {
      const bytes = new Uint8Array(16);
      cryptoObj.getRandomValues(bytes);
      // Per RFC4122 §4.4: set version (4) and variant bits.
      bytes[6] = (bytes[6] & 0x0f) | 0x40;
      bytes[8] = (bytes[8] & 0x3f) | 0x80;
      const hex: string[] = [];
      for (let i = 0; i < 256; i += 1) {
        hex.push((i + 0x100).toString(16).slice(1));
      }
      const b = bytes;
      const tail =
        `${hex[b[10]]}${hex[b[11]]}${hex[b[12]]}` +
        `${hex[b[13]]}${hex[b[14]]}${hex[b[15]]}`;
      return (
        `${hex[b[0]]}${hex[b[1]]}${hex[b[2]]}${hex[b[3]]}-` +
        `${hex[b[4]]}${hex[b[5]]}-` +
        `${hex[b[6]]}${hex[b[7]]}-` +
        `${hex[b[8]]}${hex[b[9]]}-` +
        tail
      );
    }
  } catch {
    // fall through to Math.random implementation
  }

  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

const safeLocalGet = (key: string): string | null => {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
};

const safeLocalSet = (key: string, value: string): void => {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    // ignore — storage unavailable
  }
};

const safeSessionGet = (key: string): string | null => {
  try {
    return window.sessionStorage.getItem(key);
  } catch {
    return null;
  }
};

const safeSessionSet = (key: string, value: string): void => {
  try {
    window.sessionStorage.setItem(key, value);
  } catch {
    // ignore — storage unavailable
  }
};

/** Get (creating + persisting on first call) the stable anonymous visitor id. */
export const getAnonymousId = (): string => {
  if (memoryAnonId) {
    return memoryAnonId;
  }

  let id = safeLocalGet(ANON_ID_KEY);
  if (!id) {
    id = uuidv4();
    safeLocalSet(ANON_ID_KEY, id);
  }
  memoryAnonId = id;
  return id;
};

const readSessionLastSeen = (): number => {
  const raw = safeSessionGet(SESSION_LAST_SEEN_KEY);
  if (raw) {
    const parsed = parseInt(raw, 10);
    if (!Number.isNaN(parsed)) {
      return parsed;
    }
  }
  return memorySessionLastSeen;
};

const startNewSession = (now: number): string => {
  const id = uuidv4();
  memorySessionId = id;
  memorySessionLastSeen = now;
  safeSessionSet(SESSION_ID_KEY, id);
  safeSessionSet(SESSION_LAST_SEEN_KEY, String(now));
  return id;
};

/**
 * Result of resolving the current session id. `isNew` is true when a brand new
 * session was just started (first ever, or after idle expiry) — callers use
 * this to emit `session_start` exactly once per session.
 */
export type SessionResult = {
  sessionId: string;
  isNew: boolean;
};

/**
 * Resolve the current session id, rotating it if the previous one has gone idle
 * for longer than SESSION_IDLE_MS. Also refreshes the "last seen" timestamp so
 * activity keeps the session alive.
 */
export const getSession = (): SessionResult => {
  const now = Date.now();
  const existing = safeSessionGet(SESSION_ID_KEY) || memorySessionId;
  const lastSeen = readSessionLastSeen();

  if (!existing || now - lastSeen > SESSION_IDLE_MS) {
    return { sessionId: startNewSession(now), isNew: true };
  }

  // Touch the session so continued activity defers expiry.
  memorySessionId = existing;
  memorySessionLastSeen = now;
  safeSessionSet(SESSION_LAST_SEEN_KEY, String(now));
  return { sessionId: existing, isNew: false };
};
