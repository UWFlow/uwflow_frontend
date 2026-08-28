import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Redirect } from 'react-router-dom';
import { LANDING_PAGE_ROUTE } from 'Routes';

import { ADMIN_USERS_ENDPOINT, BACKEND_ENDPOINT } from 'constants/Api';
import useIsAdmin from 'hooks/useIsAdmin';
import { AdminUser, AdminUsersResponse } from 'types/Api';
import { makeAuthenticatedGETRequest } from 'utils/Api';
import { startImpersonation } from 'utils/Impersonation';

import ImpersonateModal from './ImpersonateModal';
import ImpersonationLog from './ImpersonationLog';
import UserRow from './UserRow';

const SEARCH_DEBOUNCE_MS = 250;

const AdminPage = () => {
  const isAdmin = useIsAdmin();

  const [query, setQuery] = useState('');
  const [users, setUsers] = useState<AdminUser[] | null>(null);
  const [loadFailed, setLoadFailed] = useState(false);

  const [pendingTarget, setPendingTarget] = useState<AdminUser | null>(null);
  const [starting, setStarting] = useState(false);
  const [startError, setStartError] = useState<string | null>(null);

  useEffect(() => {
    if (!isAdmin) {
      return undefined;
    }

    let current = true;

    // Debounced so typing a name doesn't fire a query per keystroke against a
    // table scan with three ILIKEs in it.
    const timer = setTimeout(async () => {
      try {
        const [response, status] =
          await makeAuthenticatedGETRequest<AdminUsersResponse>(
            `${BACKEND_ENDPOINT}${ADMIN_USERS_ENDPOINT}?q=${encodeURIComponent(
              query,
            )}`,
          );

        if (!current) {
          return;
        }
        if (status >= 400) {
          setLoadFailed(true);
          return;
        }
        setLoadFailed(false);
        setUsers(response.users);
      } catch {
        // A network failure rejects rather than returning a status; without
        // this the page would sit on "Loading…" forever.
        if (current) {
          setLoadFailed(true);
        }
      }
    }, SEARCH_DEBOUNCE_MS);

    return () => {
      current = false;
      clearTimeout(timer);
    };
  }, [query, isAdmin]);

  const onConfirmImpersonate = async (reason: string) => {
    if (!pendingTarget) {
      return;
    }
    setStarting(true);
    setStartError(null);

    // Resolves to an error message on failure; on success it navigates away and
    // this component is torn down before the promise settles.
    const error = await startImpersonation(
      pendingTarget.id,
      reason,
      LANDING_PAGE_ROUTE,
    );
    setStarting(false);
    if (error) {
      setStartError(error);
    }
  };

  // `undefined` means the check is still in flight — render nothing rather than
  // briefly flashing the console or a redirect.
  if (isAdmin === undefined) {
    return null;
  }

  if (!isAdmin) {
    return <Redirect to={LANDING_PAGE_ROUTE} />;
  }

  return (
    <>
      <Helmet>
        <title>Admin console | UW Flow</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <div className="mx-auto w-full max-w-[900px] px-page py-lg tabletDown:px-md">
        <h1 className="mb-xs font-anderson text-2xl font-extrabold text-dark1">
          Admin console
        </h1>
        <p className="mb-lg font-inter text-sm text-dark2">
          Search for an account and open a read-only session as that user to see
          what they see. Every session is logged below.
        </p>

        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name, email, or user id"
          className="mb-md w-full rounded-card border border-solid border-light3 px-sm py-sm font-inter text-md text-dark1 outline-none focus:border-primary"
        />

        <div className="mb-xl overflow-hidden rounded-card bg-white shadow-box">
          {loadFailed && (
            <div className="px-md py-sm font-inter text-sm text-darkRed">
              Could not load users.
            </div>
          )}
          {!loadFailed && users === null && (
            <div className="px-md py-sm font-inter text-sm text-dark3">
              Loading…
            </div>
          )}
          {!loadFailed && users !== null && users.length === 0 && (
            <div className="px-md py-sm font-inter text-sm text-dark2">
              No users match “{query}”.
            </div>
          )}
          {!loadFailed &&
            users !== null &&
            users.map((user) => (
              <UserRow
                key={user.id}
                user={user}
                busy={starting}
                onImpersonate={(target) => {
                  setStartError(null);
                  setPendingTarget(target);
                }}
              />
            ))}
        </div>

        <h2 className="mb-sm font-inter text-lg font-semibold text-dark1">
          Impersonation log
        </h2>
        <div className="overflow-hidden rounded-card bg-white shadow-box">
          <ImpersonationLog />
        </div>
      </div>

      {pendingTarget && (
        <ImpersonateModal
          user={pendingTarget}
          busy={starting}
          error={startError}
          onConfirm={onConfirmImpersonate}
          onCancel={() => {
            setPendingTarget(null);
            setStartError(null);
          }}
        />
      )}
    </>
  );
};

export default AdminPage;
