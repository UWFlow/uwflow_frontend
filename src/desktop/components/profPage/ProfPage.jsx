import React from 'react';
import { withRouter } from 'react-router-dom';
import { Query } from 'react-apollo';

/* Styled Components */
import { ProfPageWrapper } from './styles/ProfPage';

/* Child Components */
import ProfInfoBox from './ProfInfoBox';

const ProfPage = ({ match }) => {
  const profID = match.params.profID;

  return (
    <ProfPageWrapper>
      <ProfInfoBox profID={profID} />
    </ProfPageWrapper>
  );
};

export default withRouter(ProfPage);
