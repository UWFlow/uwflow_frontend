import React from 'react';
import { connect, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { withTheme } from 'styled-components';
import { Query } from 'react-apollo';

/* Styled Components */
import {
  ProfileDropdownWrapper,
  ProfilePicture,
  ProfileText,
} from './styles/ProfileDropdown';

/* Child Components */
import DropdownList from '../input/DropdownList';

/* Routes */
import { PROFILE_PAGE_ROUTE } from '../../Routes';
import { isOnLandingPageRoute } from '../../Routes';

/* GraphQL Queries */
import { GET_USER } from '../../graphql/queries/user/User';

/* Selectors */
import { getIsLoggedIn } from '../../data/reducers/AuthReducer';
import { getIsBrowserDesktop } from '../../data/reducers/BrowserReducer';
import { authModalOpen } from '../../data/actions/AuthActions';

import { logOut } from '../../utils/Auth';

const mapStateToProps = state => ({
  isBrowserDesktop: getIsBrowserDesktop(state),
  isLoggedIn: getIsLoggedIn(state),
});

const renderProfilePicture = (data, dispatch, isLanding) => {
  let user = { picture_url: null };
  if (data && data.user) {
    if (data.user.length > 0) {
      user = data.user[0];
    } else {
      logOut(dispatch);
    }
  }

  return <ProfilePicture id={user.id} isLanding={isLanding} />;
};

const ProfileDropdown = ({ history, theme, isLoggedIn, location }) => {
  const dispatch = useDispatch();
  const isLanding = isOnLandingPageRoute(location);

  const handleProfileButtonClick = () => {
    isLoggedIn ? history.push(PROFILE_PAGE_ROUTE) : dispatch(authModalOpen());
  };

  return (
    <ProfileDropdownWrapper>
      {isLoggedIn ? (
        <>
          <Query
            query={GET_USER}
            variables={{ id: Number(localStorage.getItem('user_id')) }}
          >
            {({ data }) => (
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
            color={isLanding ? theme.white : theme.dark1}
            itemColor={theme.dark1}
            options={['View profile', 'Log out']}
            onChange={idx => {
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

export default connect(mapStateToProps)(
  compose(withTheme, withRouter)(ProfileDropdown),
);
