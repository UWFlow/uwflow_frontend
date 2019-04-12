import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';

/* Child Components */
import Navbar from '../common/Navbar';

/* Styled Components */
import { PageWrapper } from './styles/ProfilePage';

const ProfilePage = () => {
  return (
    <PageWrapper>
      <Navbar />
      <Link to="/">Profile Page</Link>;
    </PageWrapper>
  );
};

export default withRouter(ProfilePage);
