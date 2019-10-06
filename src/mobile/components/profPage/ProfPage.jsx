import React from 'react';
import PropTypes from 'prop-types';

/* Styled Components */
import { ProfPageWrapper } from './styles/ProfPage';

/* Child Components */
import NotFoundPage from '../notFoundPage/NotFoundPage';
import ProfInfoHeader from './ProfInfoHeader';
import ProfReviews from './ProfReviews';

const ProfPageContent = ({ prof, profID }) => {
  return (
    <>
      <ProfInfoHeader />
      <ProfReviews />
    </>
  );
};

const ProfPage = ({ loading, error, data, profID }) => (
  <ProfPageWrapper>
    {loading ? (
      <div>Loading ...</div>
    ) : error || !data || data.prof.length === 0 ? (
      <NotFoundPage text="Sorry, we couldn't find that professor!" />
    ) : (
      <ProfPageContent
        prof={{
          ...data.prof[0],
          reviewsAggregate: data.prof_review_aggregate,
        }}
        profID={profID}
      />
    )}
  </ProfPageWrapper>
);

ProfPage.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.object,
  courseID: PropTypes.string,
};

export default ProfPage;
