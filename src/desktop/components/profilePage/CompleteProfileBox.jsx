import React from 'react';
import { withTheme } from 'styled-components';

/* Child Components */
import CheckCircle from '../../components/common/CheckCircle';

/* Styled Components */
import {
  CompleteProfileBoxWrapper,
  CompleteProfileHeading
} from './styles/CompleteProfileBox';

const CompleteProfileBox = ({
  theme,
  coursesReviewed,
  profsReviewed,
  coursesTakenInfo,
}) => {
  return (
    <CompleteProfileBoxWrapper>
      <CompleteProfileHeading>Complete your profile</CompleteProfileHeading>
      <CheckCircle color={theme.primary} checked />
      <CheckCircle color={theme.primary} checked />
      <CheckCircle color={theme.primary} />
      <CheckCircle color={theme.primary} />
    </CompleteProfileBoxWrapper>
  );
};

export default withTheme(CompleteProfileBox);
