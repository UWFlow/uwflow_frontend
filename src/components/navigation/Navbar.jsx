import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withTheme } from 'styled-components';

/* Routes */
import { isOnLandingPageRoute } from '../../Routes';
/* Styled Components */
import { NavbarWrapper, NavbarContent } from './styles/Navbar';

/* Child Components */
import SearchBar from './SearchBar';
import FlowLogo from './FlowLogo';
import ProfileDropdown from './ProfileDropdown';

/* Selectors */
import { getWidth } from '../../data/reducers/BrowserReducer';

const mapStateToProps = state => ({
  width: getWidth(state),
});

const Navbar = ({ location, width, theme }) => {
  if (isOnLandingPageRoute(location)) {
    return null;
  }

  return (
    <>
      <NavbarWrapper>
        <NavbarContent>
          {width >= theme.breakpoints.mobileLarge && <FlowLogo />}
          <SearchBar maximizeWidth />
          <ProfileDropdown />
        </NavbarContent>
      </NavbarWrapper>
    </>
  );
};

export default compose(withRouter, connect(mapStateToProps), withTheme)(Navbar);
