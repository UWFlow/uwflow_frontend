import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';

import { NavbarSpacer, NavbarWrapper } from './styles/Navbar';

const Navbar = () => {
  return (
    <>
      <NavbarSpacer />
      <NavbarWrapper>Text</NavbarWrapper>
    </>
  );
};

export default withRouter(Navbar);
