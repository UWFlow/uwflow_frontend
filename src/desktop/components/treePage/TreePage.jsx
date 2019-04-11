import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const mapStateToProps = state => ({});

const TreePage = ({ match }) => {
  return <div />;
};

export default withRouter(connect(mapStateToProps)(TreePage));
