import React from 'react';
import PropTypes from 'prop-types';

/* Styled Components */
import { ProfPageWrapper } from './styles/ProfPage';

/* Child Components */
import NotFoundPage from '../../../desktop/components/notFoundPage/NotFoundPage';
import ProfInfoHeader from './ProfInfoHeader';
import ProfReviews from './ProfReviews';
import LoadingSpinner from '../../../sharedComponents/display/LoadingSpinner';

const ProfPageContent = ({ prof }) => {
  return (
    <>
      <ProfInfoHeader prof={prof} />
      <ProfReviews profID={prof.id} />
    </>
  );
};

const ProfPage = ({ loading, error, data }) => (
  <ProfPageWrapper>
    {loading ? (
      <LoadingSpinner />
    ) : error || !data || data.prof.length === 0 ? (
      <NotFoundPage text="Sorry, we couldn't find that professor!" />
    ) : (
      <ProfPageContent prof={data.prof[0]} />
    )}
  </ProfPageWrapper>
);

ProfPage.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.object,
  data: PropTypes.object,
};

export default ProfPage;
