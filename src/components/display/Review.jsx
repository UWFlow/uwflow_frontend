import React, { useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { withTheme } from 'styled-components';
import { ThumbsUp } from 'react-feather';
import { useMutation } from 'react-apollo';
import moment from 'moment';

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
  ProfText,
} from './styles/Review';

/* Child Components */
import BubbleRatings from '../input/BubbleRatings';
import Tooltip from '../display/Tooltip';

/* Selectors */
import { getIsBrowserDesktop } from '../../data/reducers/BrowserReducer';
import { getIsLoggedIn } from '../../data/reducers/AuthReducer';
import { authModalOpen } from '../../data/actions/AuthActions';

/* GraphQL */
import {
  DELETE_COURSE_REVIEW_VOTE,
  DELETE_PROF_REVIEW_VOTE,
  INSERT_COURSE_REVIEW_VOTE,
  INSERT_PROF_REVIEW_VOTE,
} from '../../graphql/mutations/Upvote';
import { REFETCH_COURSE_REVIEW_UPVOTE } from '../../graphql/queries/course/CourseReview';
import { REFETCH_PROF_REVIEW_UPVOTE } from '../../graphql/queries/prof/ProfReview';

/* Routes */
import { getProfPageRoute } from '../../Routes';

const mapStateToProps = state => ({
  isBrowserDesktop: getIsBrowserDesktop(state),
  isLoggedIn: getIsLoggedIn(state),
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
            {metric === 'liked' ? 'Liked' : metric}
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
            {metric.charAt(0).toUpperCase() + metric.slice(1)}
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
  isLoggedIn,
  isCourseReview,
}) => {
  const {
    upvotes,
    upvote_users,
    review: reviewText,
    created_at,
    author,
    metrics,
    prof,
    prof_code,
  } = review;
  const userID = localStorage.getItem('user_id');

  const refetchQueries = [
    {
      query: isCourseReview
        ? REFETCH_COURSE_REVIEW_UPVOTE
        : REFETCH_PROF_REVIEW_UPVOTE,
      variables: { review_id: review.id },
    },
  ];

  const dispatch = useDispatch();
  const [userUpvoted, setUserUpvoted] = useState(
    upvote_users.includes(Number(userID)),
  );
  const [insertReviewVote] = useMutation(
    isCourseReview ? INSERT_COURSE_REVIEW_VOTE : INSERT_PROF_REVIEW_VOTE,
    { refetchQueries },
  );
  const [deleteReviewVote] = useMutation(
    isCourseReview ? DELETE_COURSE_REVIEW_VOTE : DELETE_PROF_REVIEW_VOTE,
    { refetchQueries },
  );

  const onClickUpvote = () => {
    if (!isLoggedIn) {
      dispatch(authModalOpen());
      return;
    }

    if (userUpvoted) {
      deleteReviewVote({
        variables: { review_id: review.id, user_id: userID },
      });
    } else {
      insertReviewVote({
        variables: { review_id: review.id, user_id: userID },
      });
    }
    setUserUpvoted(!userUpvoted);
  };

  const authorText = author.full_name ? `${author.full_name}, ` : 'Anonymous ';
  const programText = `${author.program ? author.program : ''} ${
    !author.full_name || author.program ? 'student' : ''
  } `;
  const timeAgo = `about ${moment(created_at).fromNow()}`;
  const profText = prof
    ? [
        ', taken with ',
        <ProfText to={getProfPageRoute(prof_code)}>{prof}</ProfText>,
      ]
    : [''];
  const reviewContent = (
    <ReviewTextWrapper>
      <ReviewText>{reviewText}</ReviewText>
      <ReviewAuthor>
        {Boolean(authorText.length) && (
          <>
            {`— ${authorText}${programText}${timeAgo}`}
            {profText}
          </>
        )}
      </ReviewAuthor>
    </ReviewTextWrapper>
  );

  return (
    <ReviewWrapper>
      <ReviewPictureAndMetricsRow>
        <ReviewPictureAndUpvotesWrapper>
          <ReviewPicture />
          <Tooltip />
          <ReviewUpvotes
            data-tip={userUpvoted ? `Remove upvote` : `Upvote this review`}
            selected={userUpvoted}
            onClick={onClickUpvote}
          >
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
            {MetricIfExists(metrics, 'easy')}
            {MetricIfExists(metrics, 'useful')}
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
      picture_url: PropTypes.string,
    }).isRequired,
    user: PropTypes.shape({
      user_id: PropTypes.number,
    }),
    metrics: PropTypes.shape({
      useful: PropTypes.number, //not all these metrics have to exist, we should only display the ones that do
      easy: PropTypes.number, //for example course review only has useful, easy liked,
      liked: PropTypes.bool, //prof review only has liked, clear and engagin
      clear: PropTypes.number,
      engaging: PropTypes.number,
    }).isRequired,
  }).isRequired,
};

export default withTheme(connect(mapStateToProps)(Review));
