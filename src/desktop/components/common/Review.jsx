import React from 'react';
import PropTypes from 'prop-types';

/* Styled Components */
import {
  ReviewWrapper,
  ReviewTextWrapper,
  ReviewMetricsWrapper,
  ReviewPictureWrapper,
  ReviewPicture,
  ReviewUpvotes,
  ReviewText,
  ReviewAuthor,
  SingleMetricWrapper,
  SingleMetricSquares,
  SingleMetricLabel,
} from './styles/Review';

/* Child Components */
import SquareRatings from './squareRatings/SquareRatings';

const MetricIfExists = (metrics, metric) => {
  if (metrics[metric] !== null && metrics[metric] !== undefined) {
    if (metrics[metric] === true || metrics[metric] === false) {
      return (
        <SingleMetricWrapper>
          <SingleMetricSquares>
            <SquareRatings boolRating={metrics[metric]} />
          </SingleMetricSquares>
          <SingleMetricLabel>
            {metric === 'liked' ? 'Liked it' : metric}?
          </SingleMetricLabel>
        </SingleMetricWrapper>
      );
    } else {
      return (
        <SingleMetricWrapper>
          <SingleMetricSquares>
            <SquareRatings total={5} rating={metrics[metric]} />
          </SingleMetricSquares>
          <SingleMetricLabel>
            {' '}
            {metric.charAt(0).toUpperCase() + metric.slice(1)}?
          </SingleMetricLabel>
        </SingleMetricWrapper>
      );
    }
  }
};

const Review = ({ upvotes, review, reviewer, prof, metrics }) => {
  return (
    <ReviewWrapper>
      <ReviewPictureWrapper>
        <ReviewPicture />
        <ReviewUpvotes>{upvotes ? upvotes : 0}</ReviewUpvotes>
      </ReviewPictureWrapper>
      <ReviewTextWrapper>
        <ReviewText>{review}</ReviewText>
        <ReviewAuthor>
          -{reviewer.name}, a {review.program} student
        </ReviewAuthor>
      </ReviewTextWrapper>
      <ReviewMetricsWrapper>
        {MetricIfExists(metrics, 'clear')}
        {MetricIfExists(metrics, 'engaging')}
        {MetricIfExists(metrics, 'useful')}
        {MetricIfExists(metrics, 'easy')}
        {MetricIfExists(metrics, 'liked')}
      </ReviewMetricsWrapper>
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
