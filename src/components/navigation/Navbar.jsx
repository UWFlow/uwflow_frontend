import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTheme } from 'styled-components';

/* Styled Components */
import { getWidth } from 'data/reducers/BrowserReducer';
import {
  NavbarWrapper,
  NavbarContent,
  NavbarPlaceholder,
} from './styles/Navbar';

/* Child Components */
import SearchBar from './SearchBar';
import FlowLogo from './FlowLogo';
import ProfileDropdown from './ProfileDropdown';

/* Selectors */

const mapStateToProps = (state) => ({
  width: getWidth(state),
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
