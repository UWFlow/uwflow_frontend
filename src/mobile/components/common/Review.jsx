import React from 'react';
import PropTypes from 'prop-types';

/* Styled Components */
import {
  ReviewWrapper,
  ReviewPictureAndMetricsRow,
  ReviewTextWrapper,
  ReviewMetricsWrapper,
  ReviewMetricsBody,
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
import BubbleRatings from '../../../basicComponents/bubbleRatings/BubbleRatings';

const MetricIfExists = (metrics, metric) => {
  if (metrics[metric] !== null && metrics[metric] !== undefined) {
    if (metrics[metric] === true || metrics[metric] === false) {
      return (
        <SingleMetricWrapper>
          <SingleMetricSquares>
            <BubbleRatings boolRating={metrics[metric]} />
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
            <BubbleRatings total={5} rating={metrics[metric]} />
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
      <ReviewPictureAndMetricsRow>
        <ReviewPictureWrapper>
          <ReviewPicture />
          <ReviewUpvotes>{upvotes ? upvotes : 0}</ReviewUpvotes>
        </ReviewPictureWrapper>
        <ReviewMetricsWrapper>
          <ReviewMetricsBody>
            {MetricIfExists(metrics, 'clear')}
            {MetricIfExists(metrics, 'engaging')}
            {MetricIfExists(metrics, 'useful')}
            {MetricIfExists(metrics, 'easy')}
            {MetricIfExists(metrics, 'liked')}
          </ReviewMetricsBody>
        </ReviewMetricsWrapper>
      </ReviewPictureAndMetricsRow>
      <ReviewTextWrapper>
        <ReviewText>{review}</ReviewText>
        <ReviewAuthor>
          -{reviewer.full_name}, a {review.program} student
        </ReviewAuthor>
      </ReviewTextWrapper>
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
