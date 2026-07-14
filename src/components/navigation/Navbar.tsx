import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { PLAN_PAGE_ROUTE } from 'Routes';
import { useTheme } from 'styled-components';

import { RootState } from 'data/reducers/RootReducer';

import {
  NavbarContent,
  NavbarPlaceholder,
  NavbarWrapper,
} from './styles/Navbar';
import FlowLogo from './FlowLogo';
import ProfileDropdown from './ProfileDropdown';
import SearchBar from './SearchBar';

const Navbar = () => {
  const width = useSelector((state: RootState) => state.browser.width);
  const isLoggedIn = useSelector((state: RootState) => state.auth.loggedIn);
  const theme = useTheme();

  return (
    <>
      <NavbarWrapper>
        <NavbarContent>
          {width >= theme.breakpoints.mobileLarge && <FlowLogo />}
          <SearchBar maximizeWidth />
          {isLoggedIn && width >= theme.breakpoints.mobileLarge && (
            <Link
              to={PLAN_PAGE_ROUTE}
              className="ml-md text-md font-semibold text-primary no-underline hover:text-primaryDark"
            >
              Plan
            </Link>
          )}
          <ProfileDropdown />
        </NavbarContent>
      </NavbarWrapper>
      <NavbarPlaceholder />
    </>
  );
};

export default Navbar;
