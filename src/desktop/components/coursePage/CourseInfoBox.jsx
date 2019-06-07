import React from 'react';

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
}) => (
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
              for: course.course_review_stats.liked,
              against: course.course_review_stats.not_liked,
            },
            {
              displayName: 'Useful',
              for: course.course_review_stats.useful,
              against: course.course_review_stats.not_useful,
            },
            {
              displayName: 'Easy',
              for: course.course_review_stats.easy,
              against: course.course_review_stats.not_easy,
            },
          ]}
        />
      </RatingsSection>
    </CourseInfoBoxWrapper>
);

export default CourseInfoBox;
