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

const ProfPageContent = ({ prof }) => {
  console.log(prof);
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
