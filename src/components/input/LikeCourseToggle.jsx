import React, { useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { ThumbsUp, ThumbsDown } from 'react-feather';
import { withTheme } from 'styled-components';

/* Styled Components */
import {
  LikeCourseToggleWrapper,
  LikeCourseToggleButton
} from './styles/LikeCourseToggle';

/* Selectors */
import { getIsLoggedIn } from '../../data/reducers/AuthReducer';
import { authModalOpen } from '../../data/actions/AuthActions';

const mapStateToProps = state => ({
  isLoggedIn: getIsLoggedIn(state),
});

const LikeCourseToggle = ({theme, courseID, isLoggedIn, initialState = null}) => {
  const userID = localStorage.getItem('user_id');
  const dispatch = useDispatch();
  const [liked, setLiked] = useState(initialState);

  const toggleOnClick = (targetState) => {
    if (!isLoggedIn) {
      dispatch(authModalOpen());
      return
    }

    if (liked === targetState) {
      setLiked(null);
    } else {
      setLiked(targetState)
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
