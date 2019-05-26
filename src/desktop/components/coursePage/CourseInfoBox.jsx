import React, { useEffect } from 'react';
import { connect } from 'react-redux';

/* Selectors */
import {
  getCourseInfo,
  getCourseRatings,
  getCourseHasGeneralInfo,
} from '../../../data/reducers/CourseReducer';

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

const mapStateToProps = (state, { courseID }) => ({
  courseInfo: getCourseInfo(state, courseID),
  ratings: getCourseRatings(state, courseID),
  isFullCourse: getCourseHasGeneralInfo(state, courseID),
  isFetchingCourse: false, // todo: fetch api
});

const CourseInfoBox = ({
  courseInfo,
  ratings,
  isFullCourse,
  isFetchingCourse,
}) => {
  useEffect(() => {
    if (!isFullCourse && !isFetchingCourse) {
      //fetch course
    }
  }, [isFullCourse, isFetchingCourse]);

  return isFullCourse ? (
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
  ) : null;
};

export default connect(mapStateToProps)(CourseInfoBox);
