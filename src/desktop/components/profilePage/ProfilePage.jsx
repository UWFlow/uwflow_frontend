import React from 'react';
import { Query } from 'react-apollo';

/* Child Components */
import ProfileInfoHeader from './ProfileInfoHeader';
import CompleteProfileBox from './CompleteProfileBox';
import ShortlistBox from './ShortlistBox';
import ProfileCalendar from './ProfileCalendar';
import ProfileCourses from './ProfileCourses';

/* Styled Components */
import {
  ProfilePageWrapper,
  ColumnWrapper,
  Column1,
  Column2,
} from './styles/ProfilePage';

/* GraphQL Queries */
import { GET_USER } from '../../../graphql/queries/profile/User';

const dummyData = {
  program: 'Software Engineering',
  picture_url: 'https://uwflow.com/static/img/team/derrek.jpg'
}

const ProfilePageContent = ({ user }) => (
  <>
    <ProfileInfoHeader user={user} />
    <ColumnWrapper>
      <Column1>
        <ProfileCalendar />
        <ProfileCourses />
      </Column1>
      <Column2>
        <CompleteProfileBox />
        <ShortlistBox />
      </Column2>
    </ColumnWrapper>
  </>
);

const ProfilePage = () => {
  // TODO load profile of logged in user or redirect to login page
  return (
    <ProfilePageWrapper>
      <Query query={GET_USER} variables={{ id: 1 }}>
        {({ loading, error, data }) => {
          if (loading) {
            return <div>Loading...</div>;
          }
          if (error) {
            return <div>Error</div>;
          }
          if (data.user.length == 0) {
            return <div>User doesn't exist</div>
          }

          let user = data.user[0];
          return <ProfilePageContent user={{...user, ...dummyData}} />;
        }}
      </Query>
    </ProfilePageWrapper>
  );
};

export default ProfilePage;
