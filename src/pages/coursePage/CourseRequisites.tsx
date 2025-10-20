import React from 'react';
import { CourseRequirementsFragment } from 'generated/graphql';
import { getCoursePageRoute } from 'Routes';

import { formatCourseCode } from 'utils/Misc';

import {
  CourseRequisitesWrapper,
  CourseText,
  GreyText,
  Header,
  LineOfText,
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
