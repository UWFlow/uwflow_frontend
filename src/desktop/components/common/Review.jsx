import React from 'react';

/* Styled Components */
import {
  ReviewWrapper,
  ReviewTextWrapper,
  ReviewMetricsWrapper,
} from './styles/Review';

/*
metrics: Array<{
  name: string
  choice: boolean or null
}>
*/
const Review = ({ upvotes, review, reviewer, metrics }) => {
  return (
    <ReviewWrapper>
      <ReviewTextWrapper>Review Text</ReviewTextWrapper>
      <ReviewMetricsWrapper>Metrics</ReviewMetricsWrapper>
    </ReviewWrapper>
  );
};

export default Review;
