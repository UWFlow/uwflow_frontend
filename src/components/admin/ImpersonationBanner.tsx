import React, { useEffect, useState } from 'react';
import { AlertTriangle, X } from 'react-feather';
import { ADMIN_PAGE_ROUTE } from 'Routes';

import {
  clearExpiredImpersonation,
  getImpersonation,
  stopImpersonation,
} from 'utils/Impersonation';

const formatRemaining = (msRemaining: number): string => {
  const totalMinutes = Math.max(0, Math.floor(msRemaining / 60000));
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
};

/*
 * A fixed bar shown for the whole of an impersonation session.
 *
 * This is deliberately loud and unmissable. The risk an admin console like this
 * carries is not really a technical one — the session is read-only and audited
 * — it is forgetting which account you are looking at and drawing conclusions
 * about the wrong person's data.
 */
const ImpersonationBanner = () => {
  const session = getImpersonation();
  const [exiting, setExiting] = useState(false);
  const [now, setNow] = useState(Date.now());

  const expiresAt = session?.expiresAt;

  useEffect(() => {
    if (expiresAt === undefined) {
      return undefined;
    }

    // A minute's resolution is all the countdown shows, so tick at that rate
    // rather than every second.
    const id = setInterval(() => setNow(Date.now()), 30000);
    return () => clearInterval(id);
  }, [expiresAt]);

  if (!session) {
    return null;
  }

  const remaining = session.expiresAt - now;
  const expired = remaining <= 0;

  const onExit = async () => {
    setExiting(true);
    if (expired) {
      // Nothing to end server-side: the token the request would carry is no
      // longer accepted, so just restore the admin's own session locally.
      clearExpiredImpersonation(ADMIN_PAGE_ROUTE);
      return;
    }
    await stopImpersonation(ADMIN_PAGE_ROUTE);
  };

  // Anchored to the bottom: the navbar is `position: fixed; top: 0`, so a bar
  // at the top would either cover it or have to move it. The bottom edge is
  // free, and being fixed it stays visible on every page and at every scroll
  // position — which is the whole point of it.
  return (
    <div
      className="fixed bottom-0 left-0 z-50 flex w-full flex-wrap items-center gap-sm bg-red px-md py-sm text-white tabletDown:px-sm"
      role="status"
      aria-live="polite"
    >
      <AlertTriangle size={18} aria-hidden className="shrink-0" />
      <span className="font-inter text-sm">
        {expired ? (
          <>
            Your session as{' '}
            <strong className="font-semibold">{session.targetName}</strong> has
            expired.
          </>
        ) : (
          <>
            Viewing as{' '}
            <strong className="font-semibold">{session.targetName}</strong>{' '}
            (user {session.targetUserId}) — read-only,{' '}
            {formatRemaining(remaining)} left.
          </>
        )}
      </span>
      <button
        type="button"
        onClick={onExit}
        disabled={exiting}
        className="ml-auto flex cursor-pointer items-center gap-xs rounded-card border-none bg-white px-sm py-xs font-inter text-sm font-semibold text-red transition-all duration-hover ease-hover hover:brightness-hover disabled:cursor-default disabled:opacity-60"
      >
        <X size={14} aria-hidden />
        {exiting ? 'Exiting…' : 'Exit'}
      </button>
    </div>
  );
};

export default ImpersonationBanner;
