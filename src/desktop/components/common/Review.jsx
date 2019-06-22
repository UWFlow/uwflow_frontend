import React from 'react';
import PropTypes from 'prop-types';

/* Styled Components */
import {
  ReviewWrapper,
  ReviewTextWrapper,
  ReviewMetricsWrapper,
} from './styles/Review';

const Review = ({ upvotes, review, reviewer, metrics }) => {
  return (
    <ReviewWrapper>
      <ReviewTextWrapper>Review Text</ReviewTextWrapper>
      <ReviewMetricsWrapper>Metrics</ReviewMetricsWrapper>
    </ReviewWrapper>
  );
};

Review.PropTypes = {
  upvotes: PropTypes.number,
  review: PropTypes.object,
  reviewer: PropTypes.object,
  metrics: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    choice: PropTypes.bool
  }))
}

export default Review;
