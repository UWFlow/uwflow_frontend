import React from 'react';
import { connect } from 'react-redux';
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
import { getIsBrowserDesktop } from '../../data/reducers/BrowserReducer';
import ProfileDropdown from './ProfileDropdown';

const mapStateToProps = state => ({
  isDesktopPage: getIsBrowserDesktop(state),
});

const Navbar = ({ location, isDesktopPage }) => {
  if (isOnLandingPageRoute(location)) {
    return null;
  }

  return (
    <>
      <NavbarWrapper>
        <NavbarContent>
          {isDesktopPage && <FlowLogo />}
          <SearchBar />
          <ProfileDropdown />
        </NavbarContent>
      </NavbarWrapper>
    </>
  );
};

export default compose(connect(mapStateToProps), withRouter)(Navbar);