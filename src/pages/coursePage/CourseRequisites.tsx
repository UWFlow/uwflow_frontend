import React, { ReactNode } from 'react';
import { CourseRequirementsFragment } from 'generated/graphql';
import { getCoursePageRoute } from 'Routes';

import { COURSE_CODE_REGEX, formatCourseCode } from 'utils/Misc';

import {
  CourseRequisitesWrapper,
  CourseText,
  GreyText,
  Header,
  LineOfText,
  ReqInfo,
  ReqText,
} from './styles/CourseRequisites';

type CourseRequisitesProps = {
  courseCode: string;
  prereqs?: string | null;
  antireqs?: string | null;
  coreqs?: string | null;
  postreqs?: CourseRequirementsFragment['postrequisites'];
};

const CourseRequisites = ({
  courseCode,

  postreqs = [],
}: CourseRequisitesProps) => {
  const parsedRequisites = (requisites: string | null): ReactNode[] => {
    if (requisites === null) {
      return [''];
    }

    let parsedReqs = requisites.replace(/\s{2,}/gi, ' ');
    parsedReqs = parsedReqs.replace(/\(\s*/gi, '(');
    parsedReqs = parsedReqs.replace(/\s*\)/gi, ')');
    parsedReqs = parsedReqs.replace(/\s*\\\s*/gi, '\\');
    parsedReqs = parsedReqs.replace(/\s*\/\s*/gi, '/');

    const splitText = parsedReqs.split(COURSE_CODE_REGEX);
    const matches = parsedReqs.match(COURSE_CODE_REGEX);

    if (splitText.length <= 1) {
      return [parsedReqs];
    }

    return splitText.reduce(
      (arr: ReactNode[], element, index) =>
        matches && matches[index]
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
      <Header>{`${formatCourseCode(courseCode)} leads to`}</Header>
      {postreqs.map(
        (postreq, idx) =>
          postreq.postrequisite && (
            <LineOfText key={idx}>
              <CourseText to={getCoursePageRoute(postreq.postrequisite.code)}>
                {`${formatCourseCode(postreq.postrequisite.code)} - ${
                  postreq.postrequisite.name
                }`}
              </CourseText>
            </LineOfText>
          ),
      )}
      {postreqs.length === 0 && (
        <LineOfText>
          <GreyText>No other courses</GreyText>
        </LineOfText>
      )}
    </CourseRequisitesWrapper>
  );
};

export default CourseRequisites;
