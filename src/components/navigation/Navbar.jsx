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
  isBrowserDesktop: getIsBrowserDesktop(state),
});

const Navbar = ({ location, isBrowserDesktop }) => {
  if (isOnLandingPageRoute(location)) {
    return null;
  }

  return (
    <>
      <NavbarWrapper>
        <NavbarContent>
          {isBrowserDesktop && <FlowLogo />}
          <SearchBar maximizeWidth />
          <ProfileDropdown />
        </NavbarContent>
      </NavbarWrapper>
    </>
  );
};

export default compose(connect(mapStateToProps), withRouter)(Navbar);