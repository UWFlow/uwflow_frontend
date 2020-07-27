import React, { useEffect, useState } from 'react';
import { useMutation } from 'react-apollo';
import { ThumbsDown, ThumbsUp } from 'react-feather';
import { useSelector } from 'react-redux';
import { useTheme } from 'styled-components';

import withModal from 'components/modal/withModal';
import { AUTH_MODAL } from 'constants/Modal';
import { RootState } from 'data/reducers/RootReducer';
import { UPSERT_LIKED_REVIEW } from 'graphql/mutations/Review';
import {
  REFETCH_COURSE_REVIEWS,
  REFETCH_RATINGS,
} from 'graphql/queries/course/Course';
import { buildCourseReviewQuery } from 'graphql/queries/course/CourseReview';
import { REFETCH_USER_REVIEW } from 'graphql/queries/user/User';
import { getUserId } from 'utils/Auth';

import {
  LikeCourseToggleButton,
  LikeCourseToggleWrapper,
} from './styles/LikeCourseToggle';

type LikeCourseToggleProps = {
  courseID: number;
  courseCode: string;
  profID: number;
  reviewID: number | null;
  initialState: number | null;
  openModal: any;
};

const LikeCourseToggle = ({
  courseID,
  courseCode,
  profID,
  reviewID = null,
  initialState = null,
  openModal,
}: LikeCourseToggleProps) => {
  const theme = useTheme();
  const isLoggedIn = useSelector((state: RootState) => state.auth.loggedIn);
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

  const toggleOnClick = (targetState: number) => {
    if (!isLoggedIn) {
      openModal(AUTH_MODAL);
      return;
    }

    if (!courseID) {
      return;
    }

    const likedValue = liked === targetState ? null : targetState;
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
        onMouseDown={(e) => e.preventDefault()}
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
        onMouseDown={(e) => e.preventDefault()}
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

export default withModal(LikeCourseToggle);
