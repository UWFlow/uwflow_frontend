import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withTheme } from 'styled-components';
import { ThumbsUp } from 'react-feather';

/* Selectors */
import { getIsBrowserDesktop } from '../../data/reducers/BrowserReducer';

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
  ReviewText,
  ReviewAuthor,
  UpvoteNumber,
  SingleMetricWrapper,
  SingleMetricSquares,
  SingleMetricLabel,
} from './styles/Review';

/* Child Components */
import BubbleRatings from '../input/BubbleRatings';

const mapStateToProps = state => ({
  isBrowserDesktop: getIsBrowserDesktop(state),
});

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

const Review = ({
  review,
  theme,
  isBrowserDesktop,
}) => {
  const { upvotes, review: reviewText, author, metrics } = review;
  const authorNameText = author.full_name ? `-${author.full_name}` : '-Anonymous';

  const reviewContent = (
    <ReviewTextWrapper>
      <ReviewText>{reviewText}</ReviewText>
      <ReviewAuthor>
        {authorNameText}{author.program ? `, a ${author.program} student` : ''}
      </ReviewAuthor>
    </ReviewTextWrapper>
  );
  
  // TODO(Edwin)
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
        {isBrowserDesktop && reviewContent}
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
      {!isBrowserDesktop && reviewContent}
    </ReviewWrapper>
  );
};

Review.propTypes = {
  upvotes: PropTypes.number,
  review: PropTypes.shape({
    upvotes: PropTypes.number,
    review: PropTypes.string.isRequired,
    author: PropTypes.shape({
      full_name: PropTypes.string,
      program: PropTypes.string,
      picture_url: PropTypes.string
    }).isRequired,
    user: PropTypes.shape({
      user_id: PropTypes.number
    }),
    metrics: PropTypes.shape({
      useful: PropTypes.number, //not all these metrics have to exist, we should only display the ones that do
      easy: PropTypes.number, //for example course review only has useful, easy liked,
      liked: PropTypes.bool, //prof review only has liked, clear and engagin
      clear: PropTypes.number,
      engaging: PropTypes.number,
    }).isRequired,
  }).isRequired
};

export default withTheme(connect(mapStateToProps)(Review));
