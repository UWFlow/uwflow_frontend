import React from 'react';
import PropTypes from 'prop-types';

/* Route Getters */
import { getCoursePageRoute } from '../../../Routes';

/* Styled Components */
import {
  CourseExtraInfoWrapper,
  Header,
  LineOfText,
  CourseText,
  GreyText,
} from './styles/CourseExtraInfo';

import { splitCourseCode } from '../../../utils/Misc';

const CourseExtraInfo = ({ prereqs, postreqs, courseCode }) => {
  return (
    <CourseExtraInfoWrapper>
      <Header>{`${splitCourseCode(courseCode)} prerequisites`}</Header>
      {prereqs.map(course => (
        <LineOfText>
          <CourseText to={getCoursePageRoute(course.course.code)}>
            {`${splitCourseCode(course.course.code)} - ${course.course.name}`}
          </CourseText>
        </LineOfText>
      ))}
      {prereqs.length === 0 && (
        <LineOfText>
          <GreyText>No Prerequisites</GreyText>
        </LineOfText>
      )}
      <Header>{`${splitCourseCode(courseCode)} leads to`}</Header>
      {postreqs.map(course => (
        <LineOfText>
          <CourseText to={getCoursePageRoute(course.course.code)}>
            {`${splitCourseCode(course.course.code)} - ${course.course.name}`}
          </CourseText>
        </LineOfText>
      ))}
      {postreqs.length === 0 && (
        <LineOfText>
          <GreyText>Nothing</GreyText>
        </LineOfText>
      )}
    </CourseExtraInfoWrapper>
  );
};

CourseExtraInfo.propTypes = {
  prereqs: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.string,
      id: PropTypes.number,
      name: PropTypes.string,
    }),
  ),
  postreqs: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.string,
      id: PropTypes.number,
      name: PropTypes.string,
    }),
  ),
};

export default CourseExtraInfo;
