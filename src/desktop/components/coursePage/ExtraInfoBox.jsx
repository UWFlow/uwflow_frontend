import React from 'react';

/* Styled Components */
import { ExtraInfoBoxWrapper } from './styles/CoursePage';

import Prereqs from '../../../components/coursePage/Prereqs';

const ExtraInfoBox = ({ prereqs, postreqs, courseCode }) => {
  return (
    <ExtraInfoBoxWrapper>
      <Prereqs prereqs={prereqs} postreqs={postreqs} courseCode={courseCode} />
    </ExtraInfoBoxWrapper>
  );
};

export default ExtraInfoBox;
