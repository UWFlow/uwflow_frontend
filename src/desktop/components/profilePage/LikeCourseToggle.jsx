import React from 'react';
import PropTypes from 'prop-types';
import { ThumbsUp, ThumbsDown } from 'react-feather';
import { withTheme } from 'styled-components';

/* Styled Components */
import {
  LikeCourseToggleWrapper,
  LikeCourseLeftToggle,
  LikeCourseRightToggle
} from './styles/LikeCourseToggle';

const LikeCourseToggle = ({
  theme, liked, onClick = () => {}
}) => {
  return (
    <LikeCourseToggleWrapper
      onClick={onClick}
    >
      <LikeCourseLeftToggle>
        <ThumbsUp
          color={theme.primary}
          size={32}
          strokeWidth={2}
        />
      </LikeCourseLeftToggle>
      <LikeCourseRightToggle>
        <ThumbsDown
          color={theme.primary}
          size={32}
          strokeWidth={2}
        />
      </LikeCourseRightToggle>
    </LikeCourseToggleWrapper>
  );
};

ShortlistStar.propTypes = {
  theme: PropTypes.object.isRequired,
  liked: PropTypes.bool.isRequired,
  onClick: PropTypes.func,
};

export default withTheme(LikeCourseToggle);
