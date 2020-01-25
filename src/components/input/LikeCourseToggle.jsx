import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { ThumbsUp, ThumbsDown } from 'react-feather';
import { withTheme } from 'styled-components';
import { useMutation } from 'react-apollo';

/* Styled Components */
import {
  LikeCourseToggleWrapper,
  LikeCourseToggleButton,
} from './styles/LikeCourseToggle';

/* Selectors */
import { getIsLoggedIn } from '../../data/reducers/AuthReducer';

/* GraphQL */
import { UPSERT_LIKED_REVIEW } from '../../graphql/mutations/Review';
import {
  REFETCH_RATINGS,
  REFETCH_COURSE_REVIEWS,
} from '../../graphql/queries/course/Course';
import { REFETCH_USER_REVIEW } from '../../graphql/queries/user/User';
import { buildCourseReviewQuery } from '../../graphql/queries/course/CourseReview';

/* Utils */
import withModal from '../modal/withModal';
import { getUserId } from '../../utils/Auth';

/* Constants */
import { AUTH_MODAL } from '../../constants/Modal';

const mapStateToProps = state => ({
  isLoggedIn: getIsLoggedIn(state),
});

const LikeCourseToggle = ({
  theme,
  isLoggedIn,
  courseID,
  courseCode,
  profID,
  reviewID = null,
  initialState = null,
  openModal,
}) => {
  const userID = getUserId();

  const refetchQueries = [
    {
      query: REFETCH_RATINGS,
      variables: {
        course_id: courseID,
        prof_id: profID === null ? -1 : profID,
      },
    },
    {
      query: REFETCH_COURSE_REVIEWS,
      variables: {
        code: courseCode,
        user_id: userID,
      },
    },
    {
      query: buildCourseReviewQuery(true),
      variables: {
        id: courseID,
      },
    },
    {
      query: REFETCH_USER_REVIEW,
      variables: {
        id: userID,
      },
    },
  ];
  const [liked, setLiked] = useState(initialState);
  const [upsertLiked] = useMutation(UPSERT_LIKED_REVIEW, { refetchQueries });

  useEffect(() => setLiked(initialState), [initialState]);

  const toggleOnClick = targetState => {
    if (!isLoggedIn) {
      openModal(AUTH_MODAL);
      return;
    }

    if (!courseID) {
      return;
    }

    let likedValue = liked === targetState ? null : targetState;
    setLiked(likedValue);

    upsertLiked({
      variables: { user_id: userID, course_id: courseID, liked: likedValue },
      optimisticResponse: {
        __typename: 'mutation_root',
        insert_review: {
          __typename: 'review_mutation_response',
          returning: {
            __typename: 'review',
            id: reviewID,
            liked: likedValue,
          },
        },
      },
    });
  };

  return (
    <LikeCourseToggleWrapper>
      <LikeCourseToggleButton
        left
        noneSelected={liked === null}
        selected={liked === 1}
        onClick={() => toggleOnClick(1)}
        onMouseDown={e => e.preventDefault()}
      >
        <ThumbsUp
          color={liked === 1 ? theme.white : theme.dark3}
          size={16}
          strokeWidth={3}
        />
      </LikeCourseToggleButton>
      <LikeCourseToggleButton
        left={false}
        noneSelected={liked === null}
        selected={liked === 0}
        onClick={() => toggleOnClick(0)}
        onMouseDown={e => e.preventDefault()}
      >
        <ThumbsDown
          color={liked === 0 ? theme.white : theme.dark3}
          size={16}
          strokeWidth={3}
        />
      </LikeCourseToggleButton>
    </LikeCourseToggleWrapper>
  );
};

export default withModal(withTheme(connect(mapStateToProps)(LikeCourseToggle)));
