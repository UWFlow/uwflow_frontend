import React from 'react';
import PropTypes from 'prop-types';

/* Child Components */
import TabContainer from '../common/TabContainer';

/* Styled Components */
import {
  ProfileCoursesWrapper,
  ProfileCoursesHeader
} from './styles/ProfileCourses';

const ProfileCourses = ({ courses }) => {
  const tabList = [
    {
      title: 'Spring 2019',
      render: () => {}
    },
    {
      title: 'Winter 2019',
      render: () => {}
    },
    {
      title: 'Fall 2018',
      render: () => {}
    },
    {
      title: 'Spring 2018',
      render: () => {}
    }
  ]

  return (
    <ProfileCoursesWrapper>
      <TabContainer tabList={tabList} />
    </ProfileCoursesWrapper>
  );
};

ProfileCourses.propTypes = {
  courses: PropTypes.arrayOf(PropTypes.object),
};

export default ProfileCourses;
