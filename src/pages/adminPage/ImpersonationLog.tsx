import React, { useEffect, useState } from 'react';

import {
  ADMIN_IMPERSONATION_LOG_ENDPOINT,
  BACKEND_ENDPOINT,
} from 'constants/Api';
import {
  AdminImpersonationLogEntry,
  AdminImpersonationLogResponse,
} from 'types/Api';
import { makeAuthenticatedGETRequest } from 'utils/Api';

const formatTimestamp = (iso: string): string =>
  new Date(iso).toLocaleString(undefined, {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });

const describeDuration = (entry: AdminImpersonationLogEntry): string => {
  // A NULL end time is the normal outcome for a session the admin simply let
  // expire, so it is not flagged as an anomaly — only sessions that are still
  // inside their one-hour window are called out as possibly live.
  if (!entry.ended_at) {
    const startedAt = new Date(entry.started_at).getTime();
    const withinWindow = Date.now() - startedAt < 60 * 60 * 1000;
    return withinWindow ? 'may still be active' : 'expired';
  }

  const minutes = Math.round(
    (new Date(entry.ended_at).getTime() -
      new Date(entry.started_at).getTime()) /
      60000,
  );
  return minutes < 1 ? 'under a minute' : `${minutes} min`;
};

const ImpersonationLog = () => {
  const [entries, setEntries] = useState<AdminImpersonationLogEntry[] | null>(
    null,
  );
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let current = true;

    const load = async () => {
      try {
        const [response, status] =
          await makeAuthenticatedGETRequest<AdminImpersonationLogResponse>(
            `${BACKEND_ENDPOINT}${ADMIN_IMPERSONATION_LOG_ENDPOINT}`,
          );
        if (!current) {
          return;
        }
        if (status >= 400) {
          setFailed(true);
          return;
        }
        setEntries(response.entries);
      } catch {
        // A network failure rejects rather than returning a status.
        if (current) {
          setFailed(true);
        }
      }
    };

    load();
    return () => {
      current = false;
    };
  }, []);

  if (failed) {
    return (
      <div className="px-md py-sm font-inter text-sm text-dark2">
        Could not load the impersonation log.
      </div>
    );
  }

  if (entries === null) {
    return (
      <div className="px-md py-sm font-inter text-sm text-dark3">Loading…</div>
    );
  }

  if (entries.length === 0) {
    return (
      <div className="px-md py-sm font-inter text-sm text-dark2">
        No impersonation sessions have been opened yet.
      </div>
    );
  }

  return (
    <div>
      {entries.map((entry) => (
        <div
          key={entry.id}
          className="border-0 border-b border-solid border-light3 px-md py-sm last:border-b-0"
        >
          <div className="font-inter text-sm text-dark1">
            <strong className="font-semibold">{entry.admin_name}</strong> viewed
            as{' '}
            <strong className="font-semibold">{entry.target_user_name}</strong>{' '}
            <span className="text-dark3">(user {entry.target_user_id})</span>
          </div>
          <div className="font-inter text-xs text-dark2">
            {formatTimestamp(entry.started_at)} · {describeDuration(entry)}
            {entry.reason ? ` · ${entry.reason}` : ''}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ImpersonationLog;
