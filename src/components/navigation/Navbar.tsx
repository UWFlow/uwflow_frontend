import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withTheme } from 'styled-components';

import FlowLogo from './FlowLogo';
import ProfileDropdown from './ProfileDropdown';
/* Child Components */
import SearchBar from './SearchBar';
/* Styled Components */
import {
  NavbarContent,
  NavbarPlaceholder,
  NavbarWrapper,
} from './styles/Navbar';

/* Selectors */

const mapStateToProps = (state) => ({
  width: state.browser.width,
});

const Navbar = ({ width, theme }) => (
  <>
    <NavbarWrapper>
      <NavbarContent>
        {width >= theme.breakpoints.mobileLarge && <FlowLogo />}
        <SearchBar maximizeWidth />
        <ProfileDropdown />
      </NavbarContent>
    </NavbarWrapper>
    <NavbarPlaceholder />
  </>
);

export default compose(connect(mapStateToProps), withTheme)(Navbar);
