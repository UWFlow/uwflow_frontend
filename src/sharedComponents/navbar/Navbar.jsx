import React, { useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Query } from 'react-apollo';
import { compose } from 'redux';
import { withTheme } from 'styled-components';

/* Routes */
import {
  LANDING_PAGE_ROUTE,
  PROFILE_PAGE_ROUTE,
  isOnLandingPageRoute,
} from '../../Routes';

/* Styled Components */
import {
  NavbarWrapper,
  LogoWrapper,
  BlueText,
  ProfileButtonWrapper,
  NavbarContent,
  ProfilePicture,
  ProfileText,
} from './styles/Navbar';

/* Child Components */
import AuthModal from '../../auth/AuthModal';
import DropdownList from '../input/DropdownList';
import SearchBar from './SearchBar';

/* GraphQL Queries */
import { GET_USER } from '../../graphql/queries/profile/User';

/* Selectors */
import { getIsBrowserDesktop } from '../../data/reducers/BrowserReducer';
import { getIsLoggedIn } from '../../data/reducers/AuthReducer';
import { LOGGED_OUT } from '../../data/actions/AuthActions';

const placeholderImage =
  'https://wiki.ideashop.iit.edu/images/7/7e/Placeholder.jpeg';

const renderProfilePicture = data => {
  let user = { picture_url: null };
  if (data && data.user) {
    user = data.user[0];
  }

  return <ProfilePicture src={user.picture_url || placeholderImage} />;
};

const mapStateToProps = state => ({
  isDesktopPage: getIsBrowserDesktop(state),
  isLoggedIn: getIsLoggedIn(state),
});

const Navbar = ({ history, location, theme, isDesktopPage, isLoggedIn }) => {
  const dispatch = useDispatch();
  const [authModalOpen, setAuthModalOpen] = useState(false);

  const handleProfileButtonClick = () => {
    isLoggedIn ? history.push(PROFILE_PAGE_ROUTE) : setAuthModalOpen(true);
  };

  if (isOnLandingPageRoute(location)) {
    return (
      <NavbarWrapper landingPage={true}>
        <NavbarContent>
          <LogoWrapper to={LANDING_PAGE_ROUTE}>
            UW <BlueText>Flow</BlueText>
          </LogoWrapper>
        </NavbarContent>
      </NavbarWrapper>
    );
  }

  return (
    <>
      <NavbarWrapper>
        <NavbarContent>
          {isDesktopPage && (
            <LogoWrapper to={LANDING_PAGE_ROUTE}>
              UW <BlueText>Flow</BlueText>
            </LogoWrapper>
          )}
          <SearchBar />
          <ProfileButtonWrapper>
            {isLoggedIn ? (
              <>
                <Query
                  query={GET_USER}
                  variables={{ id: Number(localStorage.getItem('user_id')) }}
                >
                  {({ data }) => (
                    <ProfileText onClick={handleProfileButtonClick}>
                      {renderProfilePicture(data)}
                      {isDesktopPage && 'View profile'}
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
          </ProfileButtonWrapper>
        </NavbarContent>
      </NavbarWrapper>
      <AuthModal
        isModalOpen={authModalOpen}
        onCloseModal={() => setAuthModalOpen(false)}
        width={isDesktopPage ? 400 : 350}
      />
    </>
  );
};

export default connect(mapStateToProps)(
  compose(
    withTheme,
    withRouter,
  )(Navbar),
);