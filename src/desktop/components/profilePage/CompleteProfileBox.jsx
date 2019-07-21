import React from 'react';

/* Styled Components */
import {
  CompleteProfileBoxWrapper,
  CompleteProfileHeading
} from './styles/CompleteProfileBox';

const CompleteProfileBox = ({
  coursesReviewed,
  profsReviewed,
  coursesTakenInfo,
}) => {
  return (
    <CompleteProfileBoxWrapper>
      <CompleteProfileHeading>Complete your profile</CompleteProfileHeading>
    </CompleteProfileBoxWrapper>
  );
};

export default CompleteProfileBox;
