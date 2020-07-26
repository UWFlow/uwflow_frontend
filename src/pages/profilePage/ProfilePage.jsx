import React from 'react';
import { connect, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { useQuery } from 'react-apollo';
import { Helmet } from 'react-helmet';

/* Styled Components */

/* Child Components */
import LoadingSpinner from 'components/display/LoadingSpinner';
import NotFoundPage from 'pages/notFoundPage/NotFoundPage';

/* Selectors */
import { getIsLoggedIn } from 'data/reducers/AuthReducer';
import { getIsBrowserDesktop } from 'data/reducers/BrowserReducer';

/* Queries */
import { GET_USER } from 'graphql/queries/user/User';

/* Routes */
import { LANDING_PAGE_ROUTE } from 'Routes';

/* Constants */
import { SEO_DESCRIPTIONS } from 'constants/Messages';

/* Utils */
import { logOut } from 'utils/Auth';
import CompleteProfileContent from './CompleteProfileContent';
import ProfileCourses from './ProfileCourses';
import ProfileCalendar from './ProfileCalendar';
import ShortlistBox from './ShortlistBox';
import ProfileInfoHeader from './ProfileInfoHeader';
import {
  ProfilePageWrapper,
  CompleteProfileWrapper,
  ColumnWrapper,
  Column1,
  Column2,
} from './styles/ProfilePage';

const mapStateToProps = (state) => ({
  isLoggedIn: getIsLoggedIn(state),
  isBrowserDesktop: getIsBrowserDesktop(state),
});

const ProfilePageContent = ({
  user,
  reviews,
  coursesTaken,
  isBrowserDesktop,
  refetchAll,
}) => {
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

export const ProfilePage = ({ history, isLoggedIn, isBrowserDesktop }) => {
  const dispatch = useDispatch();
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
        isBrowserDesktop={isBrowserDesktop}
      />
    </ProfilePageWrapper>
  );
};

export default withRouter(connect(mapStateToProps)(ProfilePage));
