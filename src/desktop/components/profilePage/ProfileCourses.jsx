import React from 'react';
import PropTypes from 'prop-types';

/* Child Components */
import TabContainer from '../common/TabContainer';

/* Styled Components */
import {
  ProfileCoursesWrapper,
  ProfileCoursesCourse,
  ProfileCourseText,
  ProfileCourseCode,
  ProfileCourseName,
  ProfileCourseLiked,
  LikedThisCourseText
} from './styles/ProfileCourses';

const groupByTerm = (courses) => {
  return courses.reduce((groups, course) => {
    const termName = course.termName;
    groups[termName] = groups[termName] || [];
    groups[termName].push(course);
    return groups;
  }, {});
};

const ProfileCourses = ({ courses }) => {
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
  courses: PropTypes.arrayOf(PropTypes.shape({
    term: PropTypes.string,
    termName: PropTypes.string,
    code: PropTypes.string,
    name: PropTypes.string,
    liked: PropTypes.number
  })).isRequired,
};

export default ProfileCourses;
