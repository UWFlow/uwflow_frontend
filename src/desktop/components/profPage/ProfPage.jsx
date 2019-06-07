import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { Query } from 'react-apollo';

/* Styled Components */
import { ProfPageWrapper } from './styles/ProfPage';

/* Child Components */
import Navbar from '../common/Navbar';
import ProfInfoBox from './ProfInfoBox';

const mapStateToProps = state => ({});

const ProfPage = ({ match }) => {
  const profID = match.params.profID;

  return (
    <ProfPageWrapper>
      <Navbar />
      <ProfInfoBox profID={profID} />
    </ProfPageWrapper>
  );
};

export default withRouter(ProfPage);
