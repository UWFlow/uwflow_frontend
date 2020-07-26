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

const CompleteProfileContent = ({ theme, user, coursesTaken, reviews }) => {
  const hasScheduleUploaded = user.schedule && user.schedule.length > 0;
  const hasCourseInfo = coursesTaken && coursesTaken.length > 0;
  const hasCoursesReviewed =
    reviews &&
    reviews.length > 0 &&
    !!reviews.find(
      (r) =>
        r.liked !== null ||
        r.course_easy !== null ||
        r.course_useful !== null ||
        r.course_comment !== null,
    );
  const hasProfsReviewed =
    reviews &&
    reviews.length > 0 &&
    !!reviews.find(
      (r) =>
        r.prof_id !== null &&
        (r.prof_clear !== null ||
          r.prof_engaging !== null ||
          r.prof_comment !== null),
    );

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
  user: PropTypes.object.isRequired,
};

export default withTheme(CompleteProfileContent);
