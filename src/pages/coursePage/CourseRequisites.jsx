import React from 'react';

/* Styled Components */
import {
  Header,
  LineOfText,
  CourseText,
  GreyText,
  PrereqText,
  ExtraInfoBoxWrapper,
} from './styles/CourseRequisites';

import { splitCourseCode, COURSE_CODE_REGEX } from '../../utils/Misc';
import { getCoursePageRoute } from '../../Routes';

const ExtraInfoBox = ({ prereqs, postreqs, courseCode }) => {
  const parsedPrereqs = () => {
    if (!prereqs) {
      return '';
    }

    prereqs = prereqs.replace(/\s{2,}/gi, ' ');
    prereqs = prereqs.replace(/\(\s*/gi, '(');
    prereqs = prereqs.replace(/\s*\)/gi, ')');
    prereqs = prereqs.replace(/\s*\\\s*/gi, '\\');
    prereqs = prereqs.replace(/\s*\/\s*/gi, '/');

    const splitText = prereqs.split(COURSE_CODE_REGEX);
    const matches = prereqs.match(COURSE_CODE_REGEX);

    if (splitText.length <= 1) {
      return prereqs;
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
    <ExtraInfoBoxWrapper>
      <Header>{`${splitCourseCode(courseCode)} prerequisites`}</Header>
      {prereqs ? (
        <PrereqText>{parsedPrereqs()}</PrereqText>
      ) : (
        <LineOfText>
          <GreyText>No prerequisites</GreyText>
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
          <GreyText>Nothing</GreyText>
        </LineOfText>
      )}
    </ExtraInfoBoxWrapper>
  );
};

export default ExtraInfoBox;
