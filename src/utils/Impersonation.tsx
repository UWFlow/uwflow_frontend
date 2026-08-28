import {
  ADMIN_IMPERSONATE_ENDPOINT,
  ADMIN_IMPERSONATE_STOP_ENDPOINT,
  BACKEND_ENDPOINT,
} from 'constants/Api';
import {
  AdminImpersonateBody,
  AdminImpersonateResponse,
  AdminStopImpersonatingResponse,
} from 'types/Api';
import { makeAuthenticatedPOSTRequest } from 'utils/Api';

const IMPERSONATION_KEY = 'impersonation';

/*
 * What we keep in localStorage for the duration of an impersonation session.
 *
 * `adminToken` is the admin's own token, parked here while `token` holds the
 * impersonation one. Exiting does not depend on it — the backend recovers the
 * admin's identity from the signed `imp` claim — but keeping it means the
 * banner can name the admin without a round trip, and it gives us something to
 * fall back to if the exit request fails.
 */
export type ImpersonationSession = {
  adminToken: string;
  adminUserId: number;
  targetUserId: number;
  targetName: string;
  sessionId: number;
  /* Epoch ms at which the impersonation token stops being accepted. */
  expiresAt: number;
};

export const getImpersonation = (): ImpersonationSession | null => {
  const raw = localStorage.getItem(IMPERSONATION_KEY);
  if (!raw) {
    return null;
  }
  try {
    return JSON.parse(raw) as ImpersonationSession;
  } catch {
    // Corrupt entry: treat it as no session rather than wedging the whole app
    // on a bad JSON blob nobody can clear from the UI.
    localStorage.removeItem(IMPERSONATION_KEY);
    return null;
  }
};

export const isImpersonating = (): boolean => getImpersonation() !== null;

/*
 * Swapping identity mid-session would leave the Apollo cache full of the
 * previous user's data — every query result is normalized without any notion of
 * which account it came from. Rather than trying to evict selectively, both
 * directions end in a hard navigation, which throws away the cache, the Redux
 * store and all component state along with it.
 */
const reloadInto = (route: string) => {
  window.location.assign(route);
};

/*
 * Begin impersonating `userId`. On success this navigates away and never
 * returns; on failure it returns an error message for the caller to display.
 */
export const startImpersonation = async (
  userId: number,
  reason: string,
  landingRoute: string,
): Promise<string | null> => {
  const adminToken = localStorage.getItem('token');
  const adminUserId = Number(localStorage.getItem('user_id'));

  if (!adminToken) {
    return 'You are not signed in.';
  }

  // `makeAuthenticatedPOSTRequest` lets a network failure reject rather than
  // reporting it as a status, so catch here: an unhandled rejection would
  // leave the caller's "starting…" state stuck on with nothing explaining why.
  let response: AdminImpersonateResponse;
  let status: number;
  try {
    [response, status] = await makeAuthenticatedPOSTRequest<
      AdminImpersonateBody,
      AdminImpersonateResponse
    >(`${BACKEND_ENDPOINT}${ADMIN_IMPERSONATE_ENDPOINT}`, {
      user_id: userId,
      reason,
    });
  } catch {
    return 'Could not reach the server.';
  }

  if (status >= 400) {
    return status === 403
      ? 'You are not allowed to impersonate that account.'
      : 'Could not start the impersonation session.';
  }

  const session: ImpersonationSession = {
    adminToken,
    adminUserId,
    targetUserId: response.user_id,
    targetName: response.full_name,
    sessionId: response.session_id,
    expiresAt: Date.now() + response.expires_in * 1000,
  };

  // Order matters: the session record is written before `token` is replaced, so
  // an interruption here leaves the admin logged in as themselves rather than
  // holding an impersonation token with no way back.
  localStorage.setItem(IMPERSONATION_KEY, JSON.stringify(session));
  localStorage.setItem('token', response.token);
  localStorage.setItem('user_id', String(response.user_id));

  reloadInto(landingRoute);
  return null;
};

/*
 * End the current impersonation session and return to the admin's own account.
 * Navigates on success and never returns.
 */
export const stopImpersonation = async (
  returnRoute: string,
): Promise<string | null> => {
  const session = getImpersonation();
  if (!session) {
    return null;
  }

  // The stored admin token is the fallback. The request closes out the audit
  // record and mints a fresh token, but an admin must be able to stop being
  // somebody else even when the network is down — otherwise a failed request
  // strands them in the other account. That means catching a rejected fetch as
  // well as an error status: `makeAuthenticatedPOSTRequest` surfaces a network
  // failure by throwing, and an exception escaping here would skip the restore
  // below entirely and leave the session exactly where it was.
  let token = session.adminToken;
  let userId = session.adminUserId;
  try {
    const [response, status] = await makeAuthenticatedPOSTRequest<
      { session_id: number },
      AdminStopImpersonatingResponse
    >(`${BACKEND_ENDPOINT}${ADMIN_IMPERSONATE_STOP_ENDPOINT}`, {
      session_id: session.sessionId,
    });

    if (status < 400) {
      token = response.token;
      userId = response.user_id;
    }
  } catch {
    // Keep the fallback values and carry on with the local restore.
  }

  localStorage.setItem('token', token);
  localStorage.setItem('user_id', String(userId));
  localStorage.removeItem(IMPERSONATION_KEY);

  reloadInto(returnRoute);
  return null;
};

/*
 * Drop the session without calling the backend. Used when the impersonation
 * token has already expired, so there is nothing left to exit from — the audit
 * row simply keeps its NULL `ended_at`.
 */
export const clearExpiredImpersonation = (returnRoute: string): void => {
  const session = getImpersonation();
  if (!session) {
    return;
  }

  localStorage.setItem('token', session.adminToken);
  localStorage.setItem('user_id', String(session.adminUserId));
  localStorage.removeItem(IMPERSONATION_KEY);

  reloadInto(returnRoute);
};
