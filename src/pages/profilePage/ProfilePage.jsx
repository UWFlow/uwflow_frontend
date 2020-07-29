import React from 'react';
import { useQuery } from 'react-apollo';
import { Helmet } from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { LANDING_PAGE_ROUTE } from 'Routes';

import LoadingSpinner from 'components/display/LoadingSpinner';
import { SEO_DESCRIPTIONS } from 'constants/Messages';
import { getIsBrowserDesktop } from 'data/reducers/RootReducer';
import { GET_USER } from 'graphql/queries/user/User';
import NotFoundPage from 'pages/notFoundPage/NotFoundPage';
import { logOut } from 'utils/Auth';

import {
  Column1,
  Column2,
  ColumnWrapper,
  CompleteProfileWrapper,
  ProfilePageWrapper,
} from './styles/ProfilePage';
import CompleteProfileContent from './CompleteProfileContent';
import ProfileCalendar from './ProfileCalendar';
import ProfileCourses from './ProfileCourses';
import ProfileInfoHeader from './ProfileInfoHeader';
import ShortlistBox from './ShortlistBox';

const ProfilePageContent = ({ user, reviews, coursesTaken, refetchAll }) => {
  const isBrowserDesktop = useSelector(getIsBrowserDesktop);

  const { shortlist } = user;
  const reviewModalCourseList = coursesTaken.map((course) => {
    const curReview = reviews.find(
      (review) => review.course_id === course.course.id,
    );
    return { course: course.course, review: curReview };
  });

  return (
    <>
      <ProfileInfoHeader user={user} />
      <ColumnWrapper>
        <Column1>
          <ProfileCalendar
            schedule={user.schedule}
            secretID={user.secret_id}
            refetchAll={refetchAll}
          />
          <ProfileCourses
            courses={coursesTaken}
            reviewModalCourseList={reviewModalCourseList}
            reviews={reviews}
            refetchAll={refetchAll}
          />
        </Column1>
        <Column2>
          {isBrowserDesktop && (
            <CompleteProfileWrapper>
              <CompleteProfileContent
                user={user}
                coursesTaken={coursesTaken}
                reviews={reviews}
              />
            </CompleteProfileWrapper>
          )}
          <ShortlistBox shortlistCourses={shortlist} />
        </Column2>
      </ColumnWrapper>
    </>
  );
};

export const ProfilePage = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.loggedIn);
  const history = useHistory();

  const { loading, error, data, refetch } = useQuery(GET_USER, {
    variables: { id: localStorage.getItem('user_id') },
  });

  if (data && data.user.length === 0) {
    logOut(dispatch);
  }

  if (!isLoggedIn) {
    history.push(LANDING_PAGE_ROUTE);
  }

  return loading ? (
    <ProfilePageWrapper>
      <Helmet>
        <title>Profile - UW Flow</title>
        <meta name="description" content={SEO_DESCRIPTIONS.profile} />
        <meta property="og:title" content="Profile - UW Flow" />
        <meta property="og:description" content={SEO_DESCRIPTIONS.profile} />
      </Helmet>
      <LoadingSpinner />
    </ProfilePageWrapper>
  ) : error || !data ? (
    <NotFoundPage />
  ) : (
    <ProfilePageWrapper>
      <Helmet>
        <title>Profile - UW Flow</title>
      </Helmet>
      <ProfilePageContent
        user={data.user[0]}
        reviews={data.review}
        refetchAll={refetch}
        coursesTaken={data.user_course_taken}
      />
    </ProfilePageWrapper>
  );
};

export default ProfilePage;
