import React from 'react';
import { connect } from 'react-redux';

/* Styled Components */
import { UserCoursesWrapper, UserCoursesHeader } from './styles/ProfilePage';

const UserCourses = ({ courses }) => {
  return (
    <UserCoursesWrapper>
      <UserCoursesHeader>My Courses</UserCoursesHeader>
    </UserCoursesWrapper>
  );
};

export default UserCourses;
