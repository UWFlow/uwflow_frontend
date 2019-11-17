import React from 'react';

/* Styled Components */
import { 
  Header,
  LineOfText,
  CourseText,
  GreyText,
  ExtraInfoBoxWrapper
} from './styles/ExtraInfoBox';

import { splitCourseCode } from '../../utils/Misc';
import { getCoursePageRoute } from '../../Routes';

const ExtraInfoBox = ({ prereqs, postreqs, courseCode }) => {
  return (
    <ExtraInfoBoxWrapper>
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
    </ExtraInfoBoxWrapper>
  );
};

export default ExtraInfoBox;
