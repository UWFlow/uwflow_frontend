import React from 'react';
import PropTypes from 'prop-types';
import { ThumbsUp, ThumbsDown } from 'react-feather';
import { withTheme } from 'styled-components';

/* Styled Components */
import {
  LikeCourseToggleWrapper,
  LikeCourseToggleButton
} from './styles/LikeCourseToggle';

const LikeCourseToggle = ({
  theme, liked = null, onClick = () => {}
}) => {
  return (
    <LikeCourseToggleWrapper>
      <LikeCourseToggleButton
        left
        noneSelected={liked === null}
        selected={liked === true}
        onClick={() => onClick(true)}
      >
        <ThumbsUp
          color={liked === true ? theme.white : theme.dark3}
          size={16}
          strokeWidth={3}
        />
      </LikeCourseToggleButton>
      <LikeCourseToggleButton
        left={false}
        noneSelected={liked === null}
        selected={liked === false}
        onClick={() => onClick(false)}
      >
        <ThumbsDown
          color={liked === false ? theme.white : theme.dark3}
          size={16}
          strokeWidth={3}
        />
      </LikeCourseToggleButton>
    </LikeCourseToggleWrapper>
  );
};

LikeCourseToggle.propTypes = {
  theme: PropTypes.object.isRequired,
  liked: PropTypes.bool,
  onClick: PropTypes.func,
};

export default withTheme(LikeCourseToggle);
