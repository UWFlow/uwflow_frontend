import React from 'react';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';

/* Routes */
import { isOnLandingPageRoute } from '../../Routes';
/* Styled Components */
import {
  NavbarWrapper,
  NavbarContent,
} from './styles/Navbar';

/* Child Components */
import SearchBar from './SearchBar';
import FlowLogo from './FlowLogo';

/* Selectors */
import ProfileDropdown from './ProfileDropdown';

const Navbar = ({ location }) => {
  if (isOnLandingPageRoute(location)) {
    return null;
  }

  return (
    <>
      <NavbarWrapper>
        <NavbarContent>
          <FlowLogo />
          <SearchBar maximizeWidth />
          <ProfileDropdown />
        </NavbarContent>
      </NavbarWrapper>
    </>
  );
};

export default compose(withRouter)(Navbar);