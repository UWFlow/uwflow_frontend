import React, { useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { ThumbsUp, ThumbsDown } from 'react-feather';
import { withTheme } from 'styled-components';
import { useMutation } from 'react-apollo';

/* Styled Components */
import {
  LikeCourseToggleWrapper,
  LikeCourseToggleButton
} from './styles/LikeCourseToggle';

/* Selectors */
import { getIsLoggedIn } from '../../data/reducers/AuthReducer';
import { authModalOpen } from '../../data/actions/AuthActions';

/* GraphQL */
import { UPSERT_LIKED_REVIEW } from '../../graphql/mutations/Review';
import { REFETCH_REVIEW_AGGREGATE } from '../../graphql/queries/course/Course';

const mapStateToProps = state => ({
  isLoggedIn: getIsLoggedIn(state),
});

const LikeCourseToggle = ({
  theme,
  isLoggedIn,
  courseID,
  profID,
  reviewID = null,
  initialState = null
}) => {
  const userID = localStorage.getItem('user_id');

  const refetchQueries = [{
    query: REFETCH_REVIEW_AGGREGATE,
    variables: { course_id: courseID, user_id: userID, prof_id: profID === null ? -1 : profID }
  }];

  const dispatch = useDispatch();
  const [liked, setLiked] = useState(initialState);
  const [upsertLiked] = useMutation(UPSERT_LIKED_REVIEW, { refetchQueries });

  const toggleOnClick = (targetState) => {
    if (!isLoggedIn) {
      dispatch(authModalOpen());
      return;
    }

    if (!courseID) {
      return;
    }

    let likedValue = liked === targetState ? null : targetState;
    upsertLiked({
      variables: { user_id: userID, course_id: courseID, liked: likedValue },
      optimisticResponse: {
        __typename: "mutation_root",
        insert_review: {
          __typename: "review_mutation_response",
          returning: {
            __typename: "review",
            id: reviewID,
            liked: likedValue
          }
        }
      }
    });
    setLiked(likedValue);
  }

  return (
    <LikeCourseToggleWrapper>
      <LikeCourseToggleButton
        left
        noneSelected={liked === null}
        selected={liked === 1}
        onClick={() => toggleOnClick(1)}
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

export default withTheme(connect(mapStateToProps)(LikeCourseToggle));
