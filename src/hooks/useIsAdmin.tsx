import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { ADMIN_ME_ENDPOINT, BACKEND_ENDPOINT } from 'constants/Api';
import { RootState } from 'data/reducers/RootReducer';
import { AdminMeResponse } from 'types/Api';
import { makeAuthenticatedGETRequest } from 'utils/Api';

/*
 * Whether the signed-in user may use the admin console.
 *
 * This only decides whether to *show* admin UI. Every admin endpoint checks the
 * caller's `is_admin` flag itself, so a user who forces this to true gets a
 * console that answers 403 to everything.
 *
 * `undefined` while the answer is still unknown, so callers can tell "not an
 * admin" apart from "haven't asked yet" and avoid flashing the console's entry
 * points on for a moment during load.
 */
const useIsAdmin = (): boolean | undefined => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.loggedIn);
  const [isAdmin, setIsAdmin] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    if (!isLoggedIn) {
      setIsAdmin(false);
      return undefined;
    }

    let current = true;

    const check = async () => {
      try {
        const [response, status] =
          await makeAuthenticatedGETRequest<AdminMeResponse>(
            `${BACKEND_ENDPOINT}${ADMIN_ME_ENDPOINT}`,
          );

        if (!current) {
          return;
        }
        setIsAdmin(status < 400 && response.is_admin);
      } catch {
        // Unreachable backend: fall back to "not an admin" rather than leaving
        // this `undefined`, which callers read as "still checking" and would
        // hold the admin page on a blank render indefinitely.
        if (current) {
          setIsAdmin(false);
        }
      }
    };

    check();

    // The logged-in user can change while this is in flight (log out, or an
    // impersonation swap); ignore a response that arrives for the old one.
    return () => {
      current = false;
    };
  }, [isLoggedIn]);

  return isAdmin;
};

export default useIsAdmin;
