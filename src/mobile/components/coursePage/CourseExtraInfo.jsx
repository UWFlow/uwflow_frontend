import React from 'react';

/* Styled Components */
import {
  CourseExtraInfoWrapper,
} from './styles/CourseExtraInfo';

import Prereqs from '../../../components/coursePage/Prereqs';

const CourseExtraInfo = ({ prereqs, postreqs, courseCode }) => {
  return (
    <CourseExtraInfoWrapper>
      <Prereqs prereqs={prereqs} postreqs={postreqs} courseCode={courseCode} />
    </CourseExtraInfoWrapper>
  );
};

export default CourseExtraInfo;
