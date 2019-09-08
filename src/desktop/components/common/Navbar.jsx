import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { Search } from 'react-feather';
import { useQuery } from 'react-apollo';
import { compose } from 'redux';
import { withTheme } from 'styled-components';

/* Routes */
import {
  LANDING_PAGE_ROUTE,
  PROFILE_PAGE_ROUTE,
  EXPLORE_PAGE_ROUTE,
  isOnProfilePageRoute,
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
import Textbox from './Textbox';
import AuthModal from '../auth/AuthModal';
import DropdownList from './dropdownList/DropdownList';

/* GraphQL Queries */
import { GET_USER } from '../../../graphql/queries/profile/User';

/* Constants */
import KEYCODE from '../../../constants/KeycodeConstants';

import { isLoggedIn } from '../../../utils/Auth';

const placeholderImage
  = 'https://wiki.ideashop.iit.edu/images/7/7e/Placeholder.jpeg';

const renderProfilePicture = (data) => {
    let user = {};
    if (data && data.user) {
      user = data.user[0];
    }

    return <ProfilePicture src={user.picture_url || placeholderImage} />;
}

const Navbar = ({ history, location, theme }) => {
  const [searchText, setSearchText] = useState('');
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [, forceUpdate] = useState(false);
  const { data } = useQuery(GET_USER);

  const handleProfileButtonClick = () => {
    if (isLoggedIn()) {
      history.push(PROFILE_PAGE_ROUTE);
    } else {
      setAuthModalOpen(true);
    }
  }

  const handleSearch = (event, text) => {
    if (event.keyCode === KEYCODE.ENTER) {
      history.push(`${EXPLORE_PAGE_ROUTE}?q=${encodeURIComponent(text)}`);
    }
  };

  const profilePicture = renderProfilePicture(data);

  return (
    <>
      <NavbarWrapper>
        <NavbarContent>
          <LogoWrapper to={LANDING_PAGE_ROUTE}>
            UW <BlueText>Flow</BlueText>
          </LogoWrapper>
          <Textbox
            icon={Search}
            text={searchText}
            setText={setSearchText}
            placeholder="Explore or search for courses, subjects or professors"
            handleKeyDown={handleSearch}
            maxLength={100}
          />
          <ProfileButtonWrapper>
            {isLoggedIn() ? (
              <>
                <ProfileText onClick={handleProfileButtonClick}>
                  {profilePicture}
                  View profile
                </ProfileText>
                <DropdownList
                  selectedIndex={-1}
                  color={theme.dark1}
                  itemColor={theme.dark1}
                  options={['Log out']}
                  onChange={(idx) => {
                    if (idx === 0) {
                      // log out
                      localStorage.removeItem('token');
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
