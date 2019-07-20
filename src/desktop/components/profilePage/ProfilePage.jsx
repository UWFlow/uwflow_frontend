import React from 'react';
import { withRouter } from 'react-router-dom';
import { Query } from 'react-apollo';

/* Child Components */
import ProfileInfoHeader from './ProfileInfoHeader';
import CompleteProfileBox from './CompleteProfileBox';
import RateCoursesBox from './RateCoursesBox';
import Shortlist from './Shortlist';
import ProfileCourses from './ProfileCourses';

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
      <ProfileInfoHeader />
      <ColumnWrapper>
        <Column1>
          <ProfileCourses />
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
