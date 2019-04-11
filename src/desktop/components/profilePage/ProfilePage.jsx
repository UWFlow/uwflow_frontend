import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';

const ProfilePage = () => {
  return <Link to="/">Profile Page</Link>;
};

export default withRouter(ProfilePage);
