import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { Query } from 'react-apollo';
import { compose } from 'redux';
import { withTheme } from 'styled-components';

/* Routes */
import {
  LANDING_PAGE_ROUTE,
  PROFILE_PAGE_ROUTE,
  isOnProfilePageRoute,
  isOnLandingPageRoute,
} from '../../../Routes';

/* Styled Components */
import {
  NavbarWrapper,
  LogoWrapper,
  BlueText,
  ProfileButtonWrapper,
  NavbarContent,
  ProfilePicture,
  ProfileText
} from './styles/Navbar';

/* Child Components */
import AuthModal from '../auth/AuthModal';
import DropdownList from './dropdownList/DropdownList';
import SearchBar from './SearchBar';

/* GraphQL Queries */
import { GET_USER } from '../../../graphql/queries/profile/User';

/* Selectors */
import { getIsBrowserDesktop } from '../../../data/reducers/BrowserReducer';

import { isLoggedIn } from '../../../utils/Auth';

const placeholderImage
  = 'https://wiki.ideashop.iit.edu/images/7/7e/Placeholder.jpeg';

const renderProfilePicture = (data) => {
    let user = { picture_url: null };
    if (data && data.user) {
      user = data.user[0];
    }

    return <ProfilePicture src={user.picture_url || placeholderImage} />;
}

const Navbar = ({ history, location, theme }) => {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [, forceUpdate] = useState(false);

  const handleProfileButtonClick = () => {
    if (isLoggedIn()) {
      history.push(PROFILE_PAGE_ROUTE);
    } else {
      setAuthModalOpen(true);
    }
  }

  if (isOnLandingPageRoute(location)) {
    return (
      <NavbarWrapper landingPage={true}>
        <NavbarContent>
          <LogoWrapper to={LANDING_PAGE_ROUTE}>
            UW <BlueText>Flow</BlueText>
          </LogoWrapper>
        </NavbarContent>
      </NavbarWrapper>
    )
  }

  return (
    <>
      <NavbarWrapper>
        <NavbarContent>
          <LogoWrapper to={LANDING_PAGE_ROUTE}>
            UW <BlueText>Flow</BlueText>
          </LogoWrapper>
          <SearchBar />
          <ProfileButtonWrapper>
            {isLoggedIn() ? (
              <>
                <Query query={GET_USER} variables={ {id: Number(localStorage.getItem('user_id'))} }>
                  {({ data }) => (
                    <ProfileText onClick={handleProfileButtonClick}>
                      {renderProfilePicture(data)}
                      View profile
                    </ProfileText>
                  )}
                </Query>
                <DropdownList
                  selectedIndex={-1}
                  color={theme.dark1}
                  itemColor={theme.dark1}
                  options={['Log out']}
                  onChange={(idx) => {
                    if (idx === 0) {
                      // log out
                      localStorage.removeItem('token');
                      localStorage.removeItem('user_id');
                      if (isOnProfilePageRoute(location)) {
                        history.push(LANDING_PAGE_ROUTE);
                      } else {
                        forceUpdate(x => !x)
                      }
                    }
                  }}
                  placeholder=''
                />
              </>
            ) : (
              <ProfileText onClick={handleProfileButtonClick}>
                Log in
              </ProfileText>
            )
          }
          </ProfileButtonWrapper>
        </NavbarContent>
      </NavbarWrapper>
      <AuthModal
        isModalOpen={authModalOpen}
        onCloseModal={() => setAuthModalOpen(false)}
      />
    </>
  );
};

export default compose(withTheme, withRouter)(Navbar);
