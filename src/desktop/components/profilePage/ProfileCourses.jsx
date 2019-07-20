import React from 'react';
import PropTypes from 'prop-types';

/* Styled Components */
import {
  ProfileCoursesWrapper,
  ProfileCoursesHeader
} from './styles/ProfileCourses';

const ProfileCourses = ({ courses }) => {
  return (
    <ProfileCoursesWrapper>
      <ProfileCoursesHeader>My Courses</ProfileCoursesHeader>
    </ProfileCoursesWrapper>
  );
};

ProfileCourses.propTypes = {
  courses: PropTypes.arrayOf(PropTypes.object),
};

export default ProfileCourses;
