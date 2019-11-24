import React from 'react';
import { withRouter } from 'react-router-dom';
import { useQuery } from 'react-apollo';

/* Styled Components */
import {
  ProfPageWrapper,
  ColumnWrapper,
  Column1,
  Column2,
} from './styles/ProfPage';

/* Child Components */
import LoadingSpinner from '../../components/display/LoadingSpinner';
import NotFoundPage from '../../pages/notFoundPage/NotFoundPage';
import ProfInfoHeader from './ProfInfoHeader';
import ProfReviews from './ProfReviews';

/* Queries */
import { GET_PROF } from '../../graphql/queries/prof/Prof';

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

export const ProfPage = ({ match }) => {
  const profCode = match.params.profCode.toLowerCase();
  const { loading, error, data } = useQuery(GET_PROF, {
    variables: { code: profCode },
  });

  return loading ? (
    <ProfPageWrapper>
      <LoadingSpinner />
    </ProfPageWrapper>
  ) : error || !data || data.prof.length === 0 ? (
    <NotFoundPage text="Sorry, we couldn't find that professor!" />
  ) : (
    <ProfPageWrapper>
      <ProfPageContent prof={data.prof[0]} />
    </ProfPageWrapper>
  );
};

export default withRouter(ProfPage);
