import React from 'react';
import PropTypes from 'prop-types';
import { withTheme } from 'styled-components';

/* Styled Components */
import {
  ReviewWrapper,
  ReviewPictureAndMetricsRow,
  ReviewTextWrapper,
  ReviewMetricsWrapper,
  ReviewMetricsBody,
  ReviewPictureAndUpvotesWrapper,
  ReviewPicture,
  ReviewUpvotes,
  UpvoteNumber,
  ReviewText,
  ReviewAuthor,
  SingleMetricWrapper,
  SingleMetricSquares,
  SingleMetricLabel,
} from './styles/Review';

/* Child Components */
import BubbleRatings from '../../../basicComponents/bubbleRatings/BubbleRatings';
import { ThumbsUp } from 'react-feather';

const MetricIfExists = (metrics, metric) => {
  if (metrics[metric] !== null && metrics[metric] !== undefined) {
    if (metrics[metric] === true || metrics[metric] === false) {
      return (
        <SingleMetricWrapper>
          <SingleMetricSquares>
            <BubbleRatings boolRating={metrics[metric]} />
          </SingleMetricSquares>
          <SingleMetricLabel>
            {metric === 'liked' ? 'Liked' : metric}?
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

const Review = ({ upvotes, review, reviewer, metrics, theme }) => {
  const userUpvoted = true;
  return (
    <ReviewWrapper>
      <ReviewPictureAndMetricsRow>
        <ReviewPictureAndUpvotesWrapper>
          <ReviewPicture />
          <ReviewUpvotes selected={userUpvoted}>
            <ThumbsUp
              color={userUpvoted ? 'white' : theme.dark3}
              size={16}
              strokeWidth={2}
            />
            <UpvoteNumber selected={userUpvoted}>
              {upvotes ? upvotes : 0}
            </UpvoteNumber>
          </ReviewUpvotes>
        </ReviewPictureAndUpvotesWrapper>
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

export default withTheme(Review);
