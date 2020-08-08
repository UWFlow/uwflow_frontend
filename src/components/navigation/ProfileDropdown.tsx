import React from 'react';
import { Query } from 'react-apollo';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { GetUserQuery } from 'generated/graphql';
import { Dispatch } from 'redux';
import { isOnLandingPageRoute, PROFILE_PAGE_ROUTE } from 'Routes';
import { useTheme } from 'styled-components';

import DropdownList from 'components/input/DropdownList';
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
  data: GetUserQuery,
  dispatch: Dispatch,
  isLanding: boolean,
) => {
  let user: { id?: number | null; picture_url?: string | null } = {
    id: null,
    picture_url: null,
  };

  if (data && data.user) {
    if (data.user.length > 0) {
      [user] = data.user;
    } else {
      logOut(dispatch);
    }
  }

  return (
    <ProfilePicture
      image={user.picture_url ? user.picture_url! : getKittenFromID(user.id)}
      isLanding={isLanding}
      onMouseDown={(e) => e.preventDefault()}
    />
  );
};

const ProfileDropdown = () => {
  const [openModal] = useModal();
  const location = useLocation();
  const history = useHistory();
  const theme = useTheme();
  const dispatch = useDispatch();

  const isLoggedIn = useSelector((state: RootState) => state.auth.loggedIn);
  const isLanding = isOnLandingPageRoute(location);

  const handleProfileButtonClick = () =>
    isLoggedIn ? history.push(PROFILE_PAGE_ROUTE) : openModal(AUTH_MODAL);

  return (
    <ProfileDropdownWrapper>
      {isLoggedIn ? (
        <>
          <Query
            query={GET_USER}
            variables={{ id: Number(localStorage.getItem('user_id')) }}
          >
            {({ data }: { data: GetUserQuery }) => (
              <ProfileText
                onClick={handleProfileButtonClick}
                isLanding={isLanding}
              >
                {renderProfilePicture(data, dispatch, isLanding)}
              </ProfileText>
            )}
          </Query>
          <DropdownList
            selectedIndex={-1}
            color={isLanding ? theme.white : theme.dark2}
            itemColor={theme.dark1}
            options={['View profile', 'Log out']}
            onChange={(idx) => {
              if (idx === 0) {
                handleProfileButtonClick();
              } else {
                logOut(dispatch, true);
              }
            }}
            placeholder=""
            zIndex={10}
            menuOffset={24}
          />
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
