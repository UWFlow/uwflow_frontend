import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

/* Child Components */
import Navbar from '../common/Navbar';
import ProfInfoBox from './ProfInfoBox';

const mapStateToProps = state => ({});

const ProfPage = () => {
  return (
    <>
      <Navbar />
      <ProfInfoBox />
    </>
  );
};

export default connect(mapStateToProps)(ProfPage);
