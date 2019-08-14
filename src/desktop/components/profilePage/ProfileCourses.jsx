import React from 'react';
import PropTypes from 'prop-types';
import { PlusSquare } from 'react-feather';
import { withTheme } from 'styled-components';

/* Child Components */
import TabContainer from '../common/TabContainer';
import Button from '../common/Button';
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
  ProfileCourseReviewButtonText
} from './styles/ProfileCourses';

const groupByTerm = (courses) => {
  return courses.reduce((groups, course) => {
    const termName = course.termName;
    groups[termName] = groups[termName] || [];
    groups[termName].push(course);
    return groups;
  }, {});
};

const ProfileCourses = ({ theme, courses }) => {
  const courseGroups = groupByTerm(courses);
  const tabList = Object.keys(courseGroups).map(termName => {
    return {
      title: termName,
      render: () => {
        return courseGroups[termName].map((course, idx) => (
          <ProfileCoursesCourse key={idx}>
            <ProfileCourseText>
              <ProfileCourseCode to="/course/1">{course.code}</ProfileCourseCode>
              <ProfileCourseName>{course.name}</ProfileCourseName>
            </ProfileCourseText>
            <ProfileCourseLiked>{course.liked}%</ProfileCourseLiked>
            <LikedThisCourseText>liked this<br />course</LikedThisCourseText>
            <LikeCourseToggle liked={true} />
            <Button
              margin="0 0 0 16px"
              padding="12px "
              height={40}
            >
              <AddReviewIcon>
                <PlusSquare
                  color={theme.dark2}
                  size={16}
                  strokeWidth={3}
                />
              </AddReviewIcon>
              <ProfileCourseReviewButtonText>
                Add review
              </ProfileCourseReviewButtonText>
            </Button>
          </ProfileCoursesCourse> 
        ));
      }
    }
  })

  return (
    <ProfileCoursesWrapper>
      <TabContainer tabList={tabList} contentPadding='0' />
    </ProfileCoursesWrapper>
  );
};

ProfileCourses.propTypes = {
  theme: PropTypes.object.isRequired,
  courses: PropTypes.arrayOf(PropTypes.shape({
    term: PropTypes.string,
    termName: PropTypes.string,
    code: PropTypes.string,
    name: PropTypes.string,
    liked: PropTypes.number
  })).isRequired,
};

export default withTheme(ProfileCourses);
