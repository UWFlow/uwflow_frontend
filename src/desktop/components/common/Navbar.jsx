import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';

/* Routes */
import { LANDING_PAGE_ROUTE, PROFILE_PAGE_ROUTE } from '../../../Routes';

/* Styled Components */
import {
  NavbarSpacer,
  NavbarWrapper,
  LogoWrapper,
  ProfileButtonWrapper,
} from './styles/Navbar';

/* Child Components */
import Textbox from './Textbox';

export const NAVBAR_TEXTBOX_ID = 'NAVBAR_TEXTBOX';

const Navbar = ({ history }) => {
  return (
    <>
      <NavbarSpacer />
      <NavbarWrapper>
        <LogoWrapper onClick={() => history.push(LANDING_PAGE_ROUTE)}>
          UW Flow
        </LogoWrapper>
        <Textbox
          ID={NAVBAR_TEXTBOX_ID}
          initialPlaceholder="Explore or search for courses, subjects or professors"
        />
        <ProfileButtonWrapper onClick={() => history.push(PROFILE_PAGE_ROUTE)}>
          My Profile
        </ProfileButtonWrapper>
      </NavbarWrapper>
    </>
  );
};

export default withRouter(Navbar);
