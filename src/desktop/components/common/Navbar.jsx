import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { Search } from 'react-feather';

/* Routes */
import {
  LANDING_PAGE_ROUTE,
  PROFILE_PAGE_ROUTE,
  EXPLORE_PAGE_ROUTE,
} from '../../../Routes';

/* Styled Components */
import {
  NavbarWrapper,
  LogoWrapper,
  BlueText,
  ProfileButtonWrapper,
  NavbarContent,
} from './styles/Navbar';

/* Child Components */
import Textbox from './Textbox';
import AuthModal from '../auth/AuthModal';

export const NAVBAR_TEXTBOX_ID = 'NAVBAR_TEXTBOX';

const Navbar = ({ history }) => {
  const [searchText, setSearchText] = useState('');
  const [authModalOpen, setAuthModalOpen] = useState(false);

  const handleSearch = (event, text) => {
    if (event.keyCode === 13) {
      history.push(`${EXPLORE_PAGE_ROUTE}?q=${encodeURIComponent(text)}`);
    }
  };

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
          <ProfileButtonWrapper onClick={() => setAuthModalOpen(true)}>
            Log In
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

export default withRouter(Navbar);
