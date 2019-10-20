import React from 'react';
import PropTypes from 'prop-types';

/* Styled Components */
import { ProfPageWrapper } from './styles/ProfPage';

/* Child Components */
import ProfInfoHeader from './ProfInfoHeader';
import ProfReviews from './ProfReviews';

const ProfPageContent = ({ prof }) => {
  return (
    <>
      <ProfInfoHeader prof={prof} />
      <ProfReviews profID={prof.id} />
    </>
  );
};

const ProfPage = ({ data }) => (
  <ProfPageWrapper>
    <ProfPageContent prof={data.prof[0]} />
  </ProfPageWrapper>
);

ProfPage.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.object,
  data: PropTypes.object,
};

export default ProfPage;
