import React from 'react';
import { withRouter } from 'react-router-dom';
import { Search } from 'react-feather';

/* Routes */
import { LANDING_PAGE_ROUTE, PROFILE_PAGE_ROUTE } from '../../../Routes';

/* Styled Components */
import {
  NavbarWrapper,
  LogoWrapper,
  BlueText,
  ProfileButtonWrapper,
} from './styles/Navbar';

/* Child Components */
import Textbox from './Textbox';

export const NAVBAR_TEXTBOX_ID = 'NAVBAR_TEXTBOX';

const Navbar = () => (
  <>
    <NavbarWrapper>
      <LogoWrapper to={LANDING_PAGE_ROUTE}>UW <BlueText>Flow</BlueText></LogoWrapper>
      <Textbox
        ID={NAVBAR_TEXTBOX_ID}
        icon={Search}
        initialPlaceholder="Explore or search for courses, subjects or professors"
      />
      <ProfileButtonWrapper to={PROFILE_PAGE_ROUTE}>
        Log In
      </ProfileButtonWrapper>
    </NavbarWrapper>
  </>
);

export default withRouter(Navbar);
