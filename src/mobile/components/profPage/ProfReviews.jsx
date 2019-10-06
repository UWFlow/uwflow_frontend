import React, { useState } from 'react';
import { useQuery } from 'react-apollo';
import PropTypes from 'prop-types';
import { withTheme } from 'styled-components';

/* GraphQL Queries */
import { GET_PROF_REVIEW } from '../../../graphql/queries/prof/ProfReview.jsx';

/* Styled Components */
import { ProfCourseReviewWrapper } from './styles/ProfReviews';

const ProfReviews = ({ profID, theme }) => {
  const [selectedSort, setSelectedSort] = useState(0);
  const { loading, data } = useQuery(GET_PROF_REVIEW, {
    variables: { id: profID },
  });

  if (loading) {
    return (
      <ProfCourseReviewWrapper>
        <div>Loading ...</div>
      </ProfCourseReviewWrapper>
    );
  }

  return <div>Prof Reviews</div>;
};

ProfReviews.propTypes = {
  profID: PropTypes.string.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withTheme(ProfReviews);
