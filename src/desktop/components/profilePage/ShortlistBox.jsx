import React from 'react';
import PropTypes from 'prop-types';

/* Styled Components */
import {
  ShortlistBoxWrapper,
  ShortlistHeading,
} from './styles/ShortlistBox';

import ShortlistContent from '../../../sharedComponents/profilePage/ShortlistContent';

const ShortlistBox = ({ shortlistCourses }) => {
  return (
    <ShortlistBoxWrapper>
      <ShortlistHeading>Shortlist</ShortlistHeading>
      <ShortlistContent shortlistCourses={shortlistCourses} />
    </ShortlistBoxWrapper>
  );
};

ShortlistBox.propTypes = {
  shortlistCourses: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.string,
      name: PropTypes.string,
    }),
  ).isRequired,
};

export default ShortlistBox;
