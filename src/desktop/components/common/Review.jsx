import React from 'react';
import PropTypes from 'prop-types';

/* Styled Components */
import {
  ReviewWrapper,
  ReviewTextWrapper,
  ReviewMetricsWrapper,
} from './styles/Review';
import { interfaceDeclaration } from '@babel/types';

const Review = ({ upvotes, review, reviewer, prof, metrics }) => {
  return (
    <ReviewWrapper>
      <ReviewTextWrapper>Review Text</ReviewTextWrapper>
      <ReviewMetricsWrapper>Metrics</ReviewMetricsWrapper>
    </ReviewWrapper>
  );
};

Review.propTypes = {
  upvotes: PropTypes.number,
  review: PropTypes.string,
  reviewer: PropTypes.shape({
    name: PropTypes.string,
    program: PropTypes.string,
  }),
  prof: PropTypes.string,
  metrics: PropTypes.shape({
    useful: PropTypes.number, //not all these metrics have to exist, we should only display the ones that do
    easy: PropTypes.number, //for example course review only has useful, easy liked,
    liked: PropTypes.bool, //prof review only has liked, clear and engagin
    clear: PropTypes.number,
    engaging: PropTypes.number,
  }),
};

export default Review;
