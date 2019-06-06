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
  courseInfo,
  ratings,
}) => (
    <CourseInfoBoxWrapper>
      <InfoSection>
        <CourseCode>{courseInfo.courseCode}</CourseCode>
        <CourseName>{courseInfo.courseName}</CourseName>
        <Description>{courseInfo.description}</Description>
      </InfoSection>
      <RatingsSection>
        <RatingBox
          numReviews={courseInfo}
          percentages={[
            {
              displayName: 'Likes',
              for: ratings.likes,
              against: ratings.dislikes,
            },
            {
              displayName: 'Useful',
              for: ratings.useful,
              against: ratings.notUseful,
            },
            {
              displayName: 'Easy',
              for: ratings.easy,
              against: ratings.notEasy,
            },
          ]}
        />
      </RatingsSection>
    </CourseInfoBoxWrapper>
);

export default CourseInfoBox;
