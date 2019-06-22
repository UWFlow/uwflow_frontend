import React from 'react';
import PropTypes from 'prop-types';

/* Styled Components */
import {
  CourseInfoBoxWrapper,
  InfoSection,
  CourseCode,
  CourseName,
  Description,
  RatingsSection,
} from './styles/CourseInfoBox';

/* Child Components */
import RatingBox from '../common/RatingBox';

const CourseInfoBox = ({
  course
}) => {
  // validate data if course has no review stats
  const reviewStats = {
    liked: course.course_review_stats ? course.course_review_stats.liked : 0,
    not_liked: course.course_review_stats ? course.course_review_stats.not_liked : 0,
    useful: course.course_review_stats ? course.course_review_stats.useful : 0,
    not_useful: course.course_review_stats ? course.course_review_stats.not_useful : 0,
    easy: course.course_review_stats ? course.course_review_stats.easy : 0,
    not_easy: course.course_review_stats ? course.course_review_stats.not_easy : 0
  };

  return (
    <CourseInfoBoxWrapper>
      <InfoSection>
        <CourseCode>{course.code}</CourseCode>
        <CourseName>{course.name}</CourseName>
        <Description>{course.description}</Description>
      </InfoSection>
      <RatingsSection>
        <RatingBox
          numReviews={course}
          percentages={[
            {
              displayName: 'Likes',
              for: reviewStats.liked,
              against: reviewStats.not_liked,
            },
            {
              displayName: 'Useful',
              for: reviewStats.useful,
              against: reviewStats.not_useful,
            },
            {
              displayName: 'Easy',
              for: reviewStats.easy,
              against: reviewStats.not_easy,
            },
          ]}
        />
      </RatingsSection>
    </CourseInfoBoxWrapper>
  );
};

CourseInfoBox.propTypes = {
  course: PropTypes.object
};

export default CourseInfoBox;
