import React from 'react';
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
import LoadingSpinner from '../../../basicComponents/LoadingSpinner';

const ProfPageContent = ({ prof }) => {
  return (
    <>
      <ProfInfoHeader prof={prof} />
      <ColumnWrapper>
        <Column1>
          <ProfReviews profID={prof.id} />
        </Column1>
        <Column2 />
      </ColumnWrapper>
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
  data: PropTypes.object
};

export default ProfPage;
