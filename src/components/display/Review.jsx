import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withTheme } from 'styled-components';
import { ThumbsUp } from 'react-feather';
import { useMutation } from 'react-apollo';
import moment from 'moment/moment';

/* Styled Components */

/* Child Components */

/* Selectors */
import { getIsBrowserDesktop } from 'data/reducers/BrowserReducer';
import { getIsLoggedIn } from 'data/reducers/AuthReducer';

/* GraphQL */
import {
  DELETE_COURSE_REVIEW_VOTE,
  DELETE_PROF_REVIEW_VOTE,
  INSERT_COURSE_REVIEW_VOTE,
  INSERT_PROF_REVIEW_VOTE,
} from 'graphql/mutations/Upvote';
import { REFETCH_COURSE_REVIEW_UPVOTE } from 'graphql/queries/course/CourseReview';
import { REFETCH_PROF_REVIEW_UPVOTE } from 'graphql/queries/prof/ProfReview';

/* Routes */
import { getProfPageRoute } from 'Routes';

/* Utils */
import withModal from 'components/modal/withModal';
import { getKittenFromID } from 'utils/Kitten';

/* Constants */
import { AUTH_MODAL } from 'constants/Modal';
import Tooltip from './Tooltip';
import BubbleRatings from './BubbleRatings';
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

const mapStateToProps = (state) => ({
  isBrowserDesktop: getIsBrowserDesktop(state),
  isLoggedIn: getIsLoggedIn(state),
});

const MetricIfExists = (metrics, metric) => {
  const metricText = metric.charAt(0).toUpperCase() + metric.slice(1);
  if (metrics[metric] === null || metrics[metric] === undefined) {
    return null;
  }

  if (metrics[metric] === true || metrics[metric] === false) {
    return (
      <SingleMetricWrapper>
        <SingleMetricSquares>
          <BubbleRatings boolRating={metrics[metric]} />
        </SingleMetricSquares>
        <SingleMetricLabel>{metricText}</SingleMetricLabel>
      </SingleMetricWrapper>
    );
  }
  return (
    <SingleMetricWrapper>
      <SingleMetricSquares>
        <BubbleRatings total={5} rating={metrics[metric]} />
      </SingleMetricSquares>
      <SingleMetricLabel> {metricText}</SingleMetricLabel>
    </SingleMetricWrapper>
  );
};

const Review = ({
  review,
  theme,
  isBrowserDesktop,
  isLoggedIn,
  isCourseReview,
  openModal,
}) => {
  const {
    id,
    upvotes,
    upvote_users,
    review: reviewText,
    created_at,
    author,
    metrics,
    prof,
    prof_code,
    user,
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
      openModal(AUTH_MODAL);
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

  const programText = author.program ? `${author.program} student ` : '';
  const authorText = author.full_name
    ? `${author.full_name}${programText.length ? ',' : ''} `
    : '';
  const authorTitle = user
    ? 'You wrote this '
    : authorText.length || programText.length
    ? `${authorText}${user ? '' : programText}`
    : 'A student ';

  let timeAgo = `${moment(created_at).fromNow()}`;
  if (moment(created_at).isBefore(moment(new Date('01-01-2012')))) {
    timeAgo = '';
  }

  const profText = prof
    ? [
        ', taught by ',
        <ProfText key={prof_code} to={getProfPageRoute(prof_code)}>
          {prof}
        </ProfText>,
      ]
    : [''];

  const reviewContent = (
    <ReviewTextWrapper>
      <ReviewText>{reviewText}</ReviewText>
      <ReviewAuthor>
        {`— ${authorTitle}${timeAgo}`}
        {profText}
      </ReviewAuthor>
    </ReviewTextWrapper>
  );

  const userImage = user
    ? author.picture_url
      ? author.picture_url
      : getKittenFromID(user.user_id)
    : getKittenFromID(id);

  return (
    <ReviewWrapper isUserReview={!!user}>
      <ReviewPictureAndMetricsRow>
        <ReviewPictureAndUpvotesWrapper>
          <ReviewPicture image={userImage} />
          <Tooltip
            content={userUpvoted ? `Remove vote` : `This review was helpful`}
          >
            <ReviewUpvotes
              data-for={id}
              selected={userUpvoted}
              onClick={onClickUpvote}
              onMouseDown={(e) => e.preventDefault()}
            >
              <ThumbsUp
                color={userUpvoted ? 'white' : theme.dark3}
                size={16}
                strokeWidth={2}
              />
              <UpvoteNumber selected={userUpvoted}>{upvotes || 0}</UpvoteNumber>
            </ReviewUpvotes>
          </Tooltip>
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
      useful: PropTypes.number, // not all these metrics have to exist, we should only display the ones that do
      easy: PropTypes.number, // for example course review only has useful, easy liked,
      liked: PropTypes.bool, // prof review only has liked, clear and engagin
      clear: PropTypes.number,
      engaging: PropTypes.number,
    }).isRequired,
  }).isRequired,
};

export default withModal(withTheme(connect(mapStateToProps)(Review)));
