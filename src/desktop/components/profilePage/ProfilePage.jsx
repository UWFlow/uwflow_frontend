import React from 'react';
import { useQuery } from 'react-apollo';

/* Child Components */
import ProfileInfoHeader from './ProfileInfoHeader';
import CompleteProfileBox from './CompleteProfileBox';
import ShortlistBox from './ShortlistBox';
import ProfileCalendar from './ProfileCalendar';
import ProfileCourses from './ProfileCourses';
import ProfileFinalExams from './ProfileFinalExams';

/* Styled Components */
import {
  ProfilePageWrapper,
  ColumnWrapper,
  Column1,
  Column2,
} from './styles/ProfilePage';

/* GraphQL Queries */
import { GET_USER } from '../../../graphql/queries/profile/User';
import CourseReviewCourseBox from '../coursePage/CourseReviewCourseBox';

// TODO get real data from login
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
        <CourseReviewCourseBox
          courseIDList={['ECE 105', 'MATH 135', 'SMF 213']} // TODO get real courses
          cancelButton={false}
        />
        <ProfileFinalExams
          courses={[]}
          lastUpdated={{
            time: 18,
            url: 'adm.uwaterloo.ca'
          }}
        />
      </Column1>
      <Column2>
        <CompleteProfileBox
          hasScheduleUploaded={true}
          hasCourseInfo={true}
          hasCoursesReviewed={false}
          hasProfsReviewed={false}
        />
        <ShortlistBox />
      </Column2>
    </ColumnWrapper>
  </>
);

const ProfilePage = () => {
  // TODO load profile of logged in user or redirect to login page
  const { loading, data } = useQuery(GET_USER, {variables: { id: 1 }});

  return (
    <ProfilePageWrapper>
      {loading
        ? (<p>Loading ...</p>)
        : (<ProfilePageContent user={{...data.user[0], ...dummyData}} />)
      }
    </ProfilePageWrapper>
  );
};

export default ProfilePage;
