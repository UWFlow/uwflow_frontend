import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';

/* Child Components */
import Navbar from '../common/Navbar';
import CompleteProfileBox from './CompleteProfileBox';
import RateCoursesBox from './RateCoursesBox';
import Shortlist from './Shortlist';
import UserCourses from './UserCourses';
import UserNameBox from './UserNameBox';

/* Styled Components */
import {
  ProfilePageWrapper,
  ColumnWrapper,
  Column1,
  Column2,
} from './styles/ProfilePage';

const ProfilePage = () => {
  return (
    <ProfilePageWrapper>
      <Navbar />
      <ColumnWrapper>
        <Column1>
          <UserNameBox />
          <UserCourses />
        </Column1>
        <Column2>
          <CompleteProfileBox />
          <Shortlist />
          <RateCoursesBox />
        </Column2>
      </ColumnWrapper>
    </ProfilePageWrapper>
  );
};

export default withRouter(ProfilePage);
