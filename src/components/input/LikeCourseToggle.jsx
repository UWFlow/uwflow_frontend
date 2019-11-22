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
import { UPDATE_LIKED, INSERT_LIKED_REVIEW } from '../../graphql/mutations/user/Review';
import { COURSE_LIKED_REFETCH_QUERY } from '../../graphql/queries/course/Course';

const mapStateToProps = state => ({
  isLoggedIn: getIsLoggedIn(state),
});

const LikeCourseToggle = ({
  theme,
  isLoggedIn,
  courseID,
  reviewID = null,
  initialState = null
}) => {
  const [reviewed, setReviewed] = useState(reviewID !== null);
  const userID = localStorage.getItem('user_id');

  const refetchQueries = [
    {
      query: COURSE_LIKED_REFETCH_QUERY,
      variables: { course_id: courseID, user_id: userID }
    }
  ];

  const dispatch = useDispatch();
  const [liked, setLiked] = useState(initialState);
  const [updateLiked] = useMutation(UPDATE_LIKED, { refetchQueries });
  const [insertLiked] = useMutation(INSERT_LIKED_REVIEW, { refetchQueries });

  const toggleOnClick = (targetState) => {
    if (!isLoggedIn) {
      dispatch(authModalOpen());
      return
    }

    if (!courseID) {
      return;
    }

    if (liked === targetState) {
      if (reviewed) {
        updateLiked({variables: { review_id: reviewID, liked: null }});
      }
      setLiked(null);
    } else {
      setLiked(targetState);
      if (reviewed) {
        updateLiked({variables: { review_id: reviewID, liked: targetState }});
      } else {
        insertLiked({variables: {
          user_id: userID,
          course_id: courseID,
          liked: targetState,
          public: false
        }});
        setReviewed(true);
      }
    }
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
