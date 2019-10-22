import React from 'react';
import PropTypes from 'prop-types';

/* Styled Components */
import { 
  Header,
  LineOfText,
  CourseText,
  GreyText,  
} from './styles/Prereqs';

import { splitCourseCode } from '../../utils/Misc';
import { getCoursePageRoute } from '../../Routes';

const Prereqs = ({ prereqs, postreqs, courseCode }) => {
  console.log(prereqs);
  return (
    <>
      <Header>{`${splitCourseCode(courseCode)} prerequisites`}</Header>
        {prereqs.map((prereq, idx) => (
          <LineOfText key={idx}>
            <CourseText to={getCoursePageRoute(prereq.prerequisite.code)}>
              {`${splitCourseCode(prereq.prerequisite.code)} - ${prereq.prerequisite.name}`}
            </CourseText>
          </LineOfText>
        ))}
        {prereqs.length === 0 && (
          <LineOfText>
            <GreyText>No prerequisites</GreyText>
          </LineOfText>
        )}
      <br />
      <Header>{`${splitCourseCode(courseCode)} leads to`}</Header>
      {postreqs.map((postreq, idx) => (
        <LineOfText key={idx}>
          <CourseText to={getCoursePageRoute(postreq.postrequisite.code)}>
            {`${splitCourseCode(postreq.postrequisite.code)} - ${postreq.postrequisite.name}`}
          </CourseText>
        </LineOfText>
      ))}
      {postreqs.length === 0 && (
        <LineOfText>
          <GreyText>Nothing</GreyText>
        </LineOfText>
      )}
    </>
  );
};

Prereqs.propTypes = {
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
  courseCode: PropTypes.string,
};

export default Prereqs;
