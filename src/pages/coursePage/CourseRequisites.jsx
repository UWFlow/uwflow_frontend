import React from 'react';

/* Styled Components */

import { formatCourseCode, COURSE_CODE_REGEX } from 'utils/Misc';
import { getCoursePageRoute } from 'Routes';
import {
  Header,
  LineOfText,
  CourseText,
  GreyText,
  ReqText,
  CourseRequisitesWrapper,
  ReqInfo,
} from './styles/CourseRequisites';

const CourseRequisites = ({
  prereqs,
  antireqs,
  coreqs,
  postreqs,
  courseCode,
}) => {
  const parsedRequisites = (requisites) => {
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
                {`${formatCourseCode(matches[index])}`}
              </CourseText>,
            ]
          : [...arr, element],
      [],
    );
  };

  return (
    <CourseRequisitesWrapper>
      <Header>{`${formatCourseCode(courseCode)} prerequisites`}</Header>
      {prereqs ? (
        <ReqText>{parsedRequisites(prereqs)}</ReqText>
      ) : (
        <LineOfText>
          <GreyText>No prerequisites</GreyText>
        </LineOfText>
      )}
      <br />
      <Header>{`${formatCourseCode(courseCode)} corequisites`}</Header>
      {coreqs ? (
        <>
          <ReqInfo>
            Courses required to be taken concurrently with, or prior to, this
            course.
          </ReqInfo>
          <ReqText>{parsedRequisites(coreqs)}</ReqText>
        </>
      ) : (
        <LineOfText>
          <GreyText>No corequisites</GreyText>
        </LineOfText>
      )}
      <br />
      <Header>{`${formatCourseCode(courseCode)} antirequisites`}</Header>
      {antireqs ? (
        <ReqText>{parsedRequisites(antireqs)}</ReqText>
      ) : (
        <LineOfText>
          <GreyText>No antirequisites</GreyText>
        </LineOfText>
      )}
      <br />
      <Header>{`${formatCourseCode(courseCode)} leads to`}</Header>
      {postreqs.map((postreq, idx) => (
        <LineOfText key={idx}>
          <CourseText to={getCoursePageRoute(postreq.postrequisite.code)}>
            {`${formatCourseCode(postreq.postrequisite.code)} - ${
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
