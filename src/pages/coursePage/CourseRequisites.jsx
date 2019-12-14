import React from 'react';

/* Styled Components */
import {
  Header,
  LineOfText,
  CourseText,
  GreyText,
  ReqText,
  CourseRequisitesWrapper,
} from './styles/CourseRequisites';

import { splitCourseCode, COURSE_CODE_REGEX } from '../../utils/Misc';
import { getCoursePageRoute } from '../../Routes';

const CourseRequisites = ({ prereqs, antireqs, postreqs, courseCode }) => {
  const parsedRequisites = requisites => {
    if (!requisites) {
      return '';
    }

    let parsedReqs = requisites.replace(/\s{2,}/gi, ' ');
    parsedReqs = parsedReqs.replace(/\(\s*/gi, '(');
    parsedReqs = parsedReqs.replace(/\s*\)/gi, ')');
    parsedReqs = parsedReqs.replace(/\s*\\\s*/gi, '\\');
    parsedReqs = parsedReqs.replace(/\s*\/\s*/gi, '/');

    const splitText = parsedReqs.split(COURSE_CODE_REGEX);
    const matches = parsedReqs.match(COURSE_CODE_REGEX);

    if (splitText.length <= 1) {
      return parsedReqs;
    }

    return splitText.reduce(
      (arr, element, index) =>
        matches[index]
          ? [
              ...arr,
              element,
              <CourseText to={getCoursePageRoute(matches[index])} key={index}>
                {`${splitCourseCode(matches[index])}`}
              </CourseText>,
            ]
          : [...arr, element],
      [],
    );
  };

  return (
    <CourseRequisitesWrapper>
      <Header>{`${splitCourseCode(courseCode)} prerequisites`}</Header>
      {prereqs ? (
        <ReqText>{parsedRequisites(prereqs)}</ReqText>
      ) : (
        <LineOfText>
          <GreyText>No prerequisites</GreyText>
        </LineOfText>
      )}
      <br />
      <Header>{`${splitCourseCode(courseCode)} antirequisites`}</Header>
      {antireqs ? (
        <ReqText>{parsedRequisites(antireqs)}</ReqText>
      ) : (
        <LineOfText>
          <GreyText>No antirequisites</GreyText>
        </LineOfText>
      )}
      <br />
      <Header>{`${splitCourseCode(courseCode)} leads to`}</Header>
      {postreqs.map((postreq, idx) => (
        <LineOfText key={idx}>
          <CourseText to={getCoursePageRoute(postreq.postrequisite.code)}>
            {`${splitCourseCode(postreq.postrequisite.code)} - ${
              postreq.postrequisite.name
            }`}
          </CourseText>
        </LineOfText>
      ))}
      {postreqs.length === 0 && (
        <LineOfText>
          <GreyText>No other courses</GreyText>
        </LineOfText>
      )}
    </CourseRequisitesWrapper>
  );
};

export default CourseRequisites;
