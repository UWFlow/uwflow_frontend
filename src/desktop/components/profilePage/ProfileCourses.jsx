import React from 'react';
import PropTypes from 'prop-types';
import { PlusSquare } from 'react-feather';
import { withTheme } from 'styled-components';

/* Child Components */
import TabContainer from '../common/TabContainer';
import Button from '../../../basicComponents/Button';
import LikeCourseToggle from './LikeCourseToggle';

/* Styled Components */
import {
  ProfileCoursesWrapper,
  ProfileCoursesCourse,
  ProfileCourseText,
  ProfileCourseCode,
  ProfileCourseName,
  ProfileCourseLiked,
  LikedThisCourseText,
  AddReviewIcon,
  ProfileCourseReviewButtonText,
  ReviewButtonContents,
} from './styles/ProfileCourses';

import { termCodeToDate, splitCourseCode, processRating } from '../../../utils/Misc';

const groupByTerm = courses => {
  return courses.reduce((groups, course) => {
    const term = termCodeToDate(course.term);
    groups[term] = groups[term] || [];
    groups[term].push(course);
    return groups;
  }, {});
};

const ProfileCourses = ({ theme, courses, setReviewCourse, openModal }) => {
  const courseGroups = groupByTerm(courses);
  const tabList = Object.keys(courseGroups).map(termName => {
    return {
      title: termName,
      render: () => {
        return courseGroups[termName].map((course_taken, idx) => (
          <ProfileCoursesCourse key={idx}>
            <ProfileCourseText>
              <ProfileCourseCode to={`/course/${course_taken.course.code}`}>
                {splitCourseCode(course_taken.course.code)}
              </ProfileCourseCode>
              <ProfileCourseName>{course_taken.course.name}</ProfileCourseName>
            </ProfileCourseText>
            <ProfileCourseLiked>
              {processRating(course_taken.course.course_reviews_aggregate.aggregate.avg.liked)}
            </ProfileCourseLiked>
            <LikedThisCourseText>
              liked this
              <br />
              course
            </LikedThisCourseText>
            <LikeCourseToggle liked={true} />
            <Button
              margin="0 0 0 16px"
              padding="8px"
              height={40}
              handleClick={() => {
                setReviewCourse(idx);
                openModal();
              }}
            >
              <ReviewButtonContents>
                <AddReviewIcon>
                  <PlusSquare color={theme.dark2} size={24} strokeWidth={2} />
                </AddReviewIcon>
                <ProfileCourseReviewButtonText>
                  Add review
                </ProfileCourseReviewButtonText>
              </ReviewButtonContents>
            </Button>
          </ProfileCoursesCourse>
        ));
      },
    };
  });

  return (
    <ProfileCoursesWrapper>
      <TabContainer tabList={tabList} contentPadding="0" />
    </ProfileCoursesWrapper>
  );
};

ProfileCourses.propTypes = {
  theme: PropTypes.object.isRequired,
  courses: PropTypes.arrayOf(PropTypes.object).isRequired,
  setReviewCourse: PropTypes.func.isRequired,
  openModal: PropTypes.func.isRequired,
};

export default withTheme(ProfileCourses);
