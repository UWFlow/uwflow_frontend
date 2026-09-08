import React from 'react';
import { ChevronDown } from 'react-feather';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GetUserQuery } from 'generated/graphql';
import { Dispatch } from 'redux';
import {
  isOnLandingPageRoute,
  PROFILE_PAGE_ROUTE,
  SHARED_CLASSES_PAGE_ROUTE,
  SWAP_PAGE_ROUTE,
} from 'Routes';

import { Button } from 'components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from 'components/ui/dropdown-menu';
import { AUTH_MODAL } from 'constants/Modal';
import { RootState } from 'data/reducers/RootReducer';
import { GET_USER } from 'graphql/queries/user/User';
import useModal from 'hooks/useModal';
import { logOut } from 'utils/Auth';
import { getKittenFromID } from 'utils/Kitten';

import {
  ProfileDropdownWrapper,
  ProfilePicture,
  ProfileText,
} from './styles/ProfileDropdown';

const renderProfilePicture = (
  data: GetUserQuery | undefined,
  dispatch: Dispatch,
  isLanding: boolean,
  loading: boolean,
) => {
  let user: { id?: number | null; picture_url?: string | null } = {
    id: null,
    picture_url: null,
  };

  // While the query is in flight `data` is still undefined; show the fallback
  // kitten and hold off on the "empty user => log out" check until the real
  // response arrives, so a slow load can't trigger a spurious logout.
  if (!loading && data && data.user) {
    if (data.user.length > 0) {
      [user] = data.user;
    } else {
      logOut(dispatch);
    }
  }

  return (
    <ProfilePicture
      image={user.picture_url || getKittenFromID(user.id)}
      isLanding={isLanding}
      onMouseDown={(e) => e.preventDefault()}
    />
  );
};

const ProfileDropdown = () => {
  const [openModal] = useModal();
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();

  const isLoggedIn = useSelector((state: RootState) => state.auth.loggedIn);
  const isLanding = isOnLandingPageRoute(location);

  const { data, loading } = useQuery<GetUserQuery>(GET_USER, {
    variables: { id: Number(localStorage.getItem('user_id')) },
    skip: !isLoggedIn,
  });

  const handleProfileButtonClick = () =>
    isLoggedIn ? history.push(PROFILE_PAGE_ROUTE) : openModal(AUTH_MODAL);

  return (
    <ProfileDropdownWrapper>
      {isLoggedIn ? (
        <>
          <ProfileText onClick={handleProfileButtonClick} isLanding={isLanding}>
            {renderProfilePicture(data, dispatch, isLanding, loading)}
          </ProfileText>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="inline"
                aria-label="Profile menu"
                className={`ml-xs flex ${
                  isLanding ? 'text-white' : 'text-dark2'
                }`}
              >
                <ChevronDown />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" sideOffset={24}>
              <DropdownMenuItem onSelect={handleProfileButtonClick}>
                View profile
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => history.push(SWAP_PAGE_ROUTE)}>
                Swap Class
              </DropdownMenuItem>
              <DropdownMenuItem
                onSelect={() => history.push(SHARED_CLASSES_PAGE_ROUTE)}
              >
                Shared Classes
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => logOut(dispatch, true)}>
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      ) : (
        <ProfileText onClick={handleProfileButtonClick} isLanding={isLanding}>
          Log in
        </ProfileText>
      )}
    </ProfileDropdownWrapper>
  );
};

export default ProfileDropdown;
