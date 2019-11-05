import React, { useState } from 'react';
import PropTypes from 'prop-types';

/* Styled Components */
import {
  ShortlistCourse,
  ShortListCourseText,
  ShortlistCourseCode,
  ShortlistCourseName,
} from './styles/ShortlistContent';

import ShortlistStar from '../input/ShortlistStar';

import { splitCourseCode } from '../../utils/Misc';
import { getCoursePageRoute } from '../../Routes';

const ShortlistContent = ({ shortlistCourses }) => {
  const [shortlisted, setShortedlisted] =  useState(Array(shortlistCourses.length).fill(true));

  const toggleShortlisted = (idx) => {
    setShortedlisted([
      ...shortlisted.slice(0, idx),
      !shortlisted[idx],
      ...shortlisted.slice(idx + 1),
    ]);
  }

  return (
    <>
      {shortlistCourses.map((course, idx) => (
        <ShortlistCourse key={idx}>
          <ShortlistStar
            checked={shortlisted[idx]}
            onClick={() => toggleShortlisted(idx)}
          />
          <ShortListCourseText>
            <ShortlistCourseCode to={getCoursePageRoute(course.course.code)}>
              {splitCourseCode(course.course.code)}
            </ShortlistCourseCode>
            <ShortlistCourseName>{course.course.name}</ShortlistCourseName>
          </ShortListCourseText>
        </ShortlistCourse>
      ))}
      {shortlistCourses.length === 0 ? (
        <ShortlistCourse>
          No shortlisted courses found
        </ShortlistCourse>
      ) : null}
    </>
  );
};

ShortlistContent.propTypes = {
  shortlistCourses: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.string,
      name: PropTypes.string,
    }),
  ).isRequired,
};

export default ShortlistContent;
