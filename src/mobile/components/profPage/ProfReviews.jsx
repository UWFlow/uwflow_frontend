import React, { useState } from 'react';
import { useQuery } from 'react-apollo';
import PropTypes from 'prop-types';
import { withTheme } from 'styled-components';

/* GraphQL Queries */
import { GET_PROF_REVIEW } from '../../../graphql/queries/prof/ProfReview.jsx';

/* Child Components */
import CollapseableContainer from '../common/CollapseableContainer.jsx';

/* Styled Components */
import { ProfCourseReviewWrapper } from './styles/ProfReviews';

const renderReviewContent = () => {
  return <>Prof Reviews </>;
};

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

  return (
    <CollapseableContainer
      title={`Prof comments ()`}
      renderContent={renderReviewContent}
    />
  );
};

ProfReviews.propTypes = {
  profID: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  theme: PropTypes.object.isRequired,
};

export default withTheme(ProfReviews);
