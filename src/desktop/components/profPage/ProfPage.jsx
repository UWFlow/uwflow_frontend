import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

/* Styled Components */
import {
  ProfPageWrapper,
  ColumnWrapper,
  Column1,
  Column2,
} from './styles/ProfPage';

/* Child Components */
import ProfInfoHeader from './ProfInfoHeader';
import ProfReviews from './ProfReviews';
import NotFoundPage from '../notFoundPage/NotFoundPage';

const ProfPageContent = ({ prof, profID }) => {
  return (
    <>
      <ProfInfoHeader prof={prof} />
      <ColumnWrapper>
        <Column1>
          <ProfReviews profID={profID} />
        </Column1>
        <Column2 />
      </ColumnWrapper>
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
  error: PropTypes.bool,
  courseID: PropTypes.string,
};

export default withRouter(ProfPage);
