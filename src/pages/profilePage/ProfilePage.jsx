import React, { useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { useQuery } from 'react-apollo';
import { Helmet } from 'react-helmet';

/* Styled Components */
import {
  ProfilePageWrapper,
  CompleteProfileWrapper,
  ColumnWrapper,
  Column1,
  Column2,
} from './styles/ProfilePage';

/* Child Components */
import ProfileInfoHeader from './ProfileInfoHeader';
import ShortlistBox from './ShortlistBox';
import ProfileCalendar from './ProfileCalendar';
import ProfileCourses from './ProfileCourses';
import ProfileFinalExams from './ProfileFinalExams';
import LoadingSpinner from '../../components/display/LoadingSpinner';
import CompleteProfileContent from './CompleteProfileContent';
import NotFoundPage from '../notFoundPage/NotFoundPage';

/* Selectors */
import { getIsLoggedIn } from '../../data/reducers/AuthReducer';
import { getIsBrowserDesktop } from '../../data/reducers/BrowserReducer';

/* Queries */
import { GET_USER } from '../../graphql/queries/user/User';

/* Routes */
import { LANDING_PAGE_ROUTE } from '../../Routes';

/* Constants */
import { SEO_DESCRIPTIONS } from '../../constants/Messages';
import { COURSE_REVIEW_COURSE_MODAL } from '../../constants/Modal';

/* Utils */
import { logOut } from '../../utils/Auth';
import withModal from '../../components/modal/withModal';

const mapStateToProps = state => ({
  isLoggedIn: getIsLoggedIn(state),
  isBrowserDesktop: getIsBrowserDesktop(state),
});

const ProfilePageContent = ({
  user,
  reviews,
  coursesTaken,
  isBrowserDesktop,
  refetchAll,
  openModal,
  closeModal,
}) => {
  const [selectedCourseIndex, setSelectedCourseIndex] = useState(0);

  const shortlist = user.shortlist;
  const reviewModalCourseList = coursesTaken.map(course => {
    const curReview = reviews.find(
      review => review.course_id === course.course.id,
    );
    return { course: course.course, review: curReview };
  });

  const reviewModalProps = {
    showCourseDropdown: true,
    courseList: reviewModalCourseList,
    selectedCourseIndex: selectedCourseIndex,
    setSelectedCourseIndex: setSelectedCourseIndex,
    onCancel: () => closeModal(COURSE_REVIEW_COURSE_MODAL),
  };

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
            reviews={reviews}
            setReviewCourse={setSelectedCourseIndex}
            openReviewModal={() =>
              openModal(COURSE_REVIEW_COURSE_MODAL, reviewModalProps)
            }
            refetchAll={refetchAll}
          />
          <ProfileFinalExams courses={coursesTaken} />
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

export const ProfilePage = ({
  history,
  isLoggedIn,
  isBrowserDesktop,
  openModal,
  closeModal,
}) => {
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
        openModal={openModal}
        closeModal={closeModal}
      />
    </ProfilePageWrapper>
  );
};

export default withModal(withRouter(connect(mapStateToProps)(ProfilePage)));
