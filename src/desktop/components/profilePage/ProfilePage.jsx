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

const profileDummy = {
  name: 'Derrek Chow',
  program: 'Software Engineering',
  picture_url: 'https://uwflow.com/static/img/team/derrek.jpg'
}

const ProfilePage = () => {
  return (
    <ProfilePageWrapper>
      <ProfileInfoHeader profile={profileDummy} />
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
