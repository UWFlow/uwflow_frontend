import React from 'react';
import PropTypes from 'prop-types';
import { withTheme } from 'styled-components';

/* Child Components */
import CheckCircle from '../../components/input/CheckCircle';

/* Styled Components */
import {
  CompleteProfileHeading,
  CheckedItem,
  CheckedText,
} from './styles/CompleteProfileContent';

const CompleteProfileContent = ({
  theme,
  user
}) => {
  const hasScheduleUploaded = user.schedule && user.schedule.length > 0;
  const hasCourseInfo = user.courses_taken && user.courses_taken.length > 0;
  const hasCoursesReviewed = user.course_reviews && user.course_reviews.length > 0;
  const hasProfsReviewed = user.prof_reviews && user.prof_reviews.length > 0;

  return (
    <>
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
    </>
  );
};

CompleteProfileContent.propTypes = {
  theme: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

export default withTheme(CompleteProfileContent);
