import React from 'react';
import PropTypes from 'prop-types';

/* Styled Components */
import {
  ShortlistBoxWrapper,
  ShortlistHeading,
  ShortlistCourse,
  ShortListCourseText,
  ShortlistCourseCode,
  ShortlistCourseName
} from './styles/ShortlistBox';

import ShortlistStar from './ShortlistStar';

const ShortlistBox = ({ shortlistCourses }) => {
  return (
    <ShortlistBoxWrapper>
      <ShortlistHeading>Shortlist</ShortlistHeading>
      {shortlistCourses.map((course, idx) => (
        <ShortlistCourse key={idx}>
          <ShortlistStar checked />
          <ShortListCourseText>
            <ShortlistCourseCode to={"/course/1"}>
              {course.code}
            </ShortlistCourseCode>
            <ShortlistCourseName>{course.name}</ShortlistCourseName>
          </ShortListCourseText>
        </ShortlistCourse>
      ))}
    </ShortlistBoxWrapper>
  );
};

ShortlistBox.propTypes = {
  shortlistCourses: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string,
    name: PropTypes.string
  })).isRequired
}

export default ShortlistBox;
