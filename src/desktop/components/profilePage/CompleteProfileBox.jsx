import React from 'react';
import PropTypes from 'prop-types';
import { withTheme } from 'styled-components';

/* Child Components */
import CheckCircle from '../../../sharedComponents/input/CheckCircle';

/* Styled Components */
import {
  CompleteProfileBoxWrapper,
  CompleteProfileHeading,
  CheckedItem,
  CheckedText,
} from './styles/CompleteProfileBox';

const CompleteProfileBox = ({
  theme,
  hasCoursesReviewed,
  hasProfsReviewed,
  hasCourseInfo,
  hasScheduleUploaded,
}) => {
  return (
    <CompleteProfileBoxWrapper>
      <CompleteProfileHeading>Complete your profile</CompleteProfileHeading>
      <CheckedItem>
        <CheckCircle color={theme.primary} checked={hasScheduleUploaded} />
        <CheckedText checked={hasScheduleUploaded}>
          Upload your schedule
        </CheckedText>
      </CheckedItem>
      <CheckedItem checked>
        <CheckCircle color={theme.primary} checked={hasCourseInfo} />
        <CheckedText checked={hasCourseInfo}>
          Import your previous courses
        </CheckedText>
      </CheckedItem>
      <CheckedItem>
        <CheckCircle color={theme.primary} checked={hasCoursesReviewed} />
        <CheckedText checked={hasCoursesReviewed}>
          Add a rating for a course
        </CheckedText>
      </CheckedItem>
      <CheckedItem>
        <CheckCircle color={theme.primary} checked={hasProfsReviewed} />
        <CheckedText checked={hasProfsReviewed}>
          Add a rating for a professor
        </CheckedText>
      </CheckedItem>
    </CompleteProfileBoxWrapper>
  );
};

CompleteProfileBox.propTypes = {
  theme: PropTypes.object.isRequired,
  hasCoursesReviewed: PropTypes.bool.isRequired,
  hasProfsReviewed: PropTypes.bool.isRequired,
  hasCourseInfo: PropTypes.bool.isRequired,
  hasScheduleUploaded: PropTypes.bool.isRequired,
};

export default withTheme(CompleteProfileBox);
