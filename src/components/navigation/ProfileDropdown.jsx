import React, { useState } from 'react';
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
import AuthModal from '../../auth/AuthModal';
import DropdownList from '../input/DropdownList';

/* Routes */
import { PROFILE_PAGE_ROUTE } from '../../Routes';

/* GraphQL Queries */
import { GET_USER } from '../../graphql/queries/profile/User';

/* Selectors */
import { getIsLoggedIn } from '../../data/reducers/AuthReducer';
import { LOGGED_OUT } from '../../data/actions/AuthActions';
import { getIsBrowserDesktop } from '../../data/reducers/BrowserReducer';

const mapStateToProps = state => ({
  isDesktopPage: getIsBrowserDesktop(state),
  isLoggedIn: getIsLoggedIn(state),
});

// TODO(Edwin) change to actual placeholders
const placeholderImage =
  'https://wiki.ideashop.iit.edu/images/7/7e/Placeholder.jpeg';

const renderProfilePicture = data => {
  let user = { picture_url: null };
  if (data && data.user) {
    user = data.user[0];
  }

  return <ProfilePicture src={user.picture_url || placeholderImage} />;
};

const ProfileDropdown = ({ history, theme, isLoggedIn, isDesktopPage }) => {
  const dispatch = useDispatch();
  const [authModalOpen, setAuthModalOpen] = useState(false);

  const handleProfileButtonClick = () => {
    isLoggedIn ? history.push(PROFILE_PAGE_ROUTE) : setAuthModalOpen(true);
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
              <ProfileText onClick={handleProfileButtonClick}>
                {renderProfilePicture(data)}
                {'View profile'}
              </ProfileText>
            )}
          </Query>
          <DropdownList
            selectedIndex={-1}
            color={theme.dark1}
            itemColor={theme.dark1}
            options={['Log out']}
            onChange={idx => {
              if (idx === 0) {
                // log out
                localStorage.removeItem('token');
                localStorage.removeItem('user_id');
                dispatch({ type: LOGGED_OUT });
              }
            }}
            placeholder=""
          />
        </>
      ) : (
        <ProfileText onClick={handleProfileButtonClick}>
          Log in
        </ProfileText>
      )}
      <AuthModal
        isModalOpen={authModalOpen}
        onCloseModal={() => setAuthModalOpen(false)}
        width={isDesktopPage ? '400px': '100vw'}
      />
    </ProfileDropdownWrapper>
  );
}

export default connect(mapStateToProps)(
  compose(
    withTheme,
    withRouter,
  )(ProfileDropdown),
);
