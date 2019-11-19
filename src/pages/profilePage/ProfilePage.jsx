import React, { useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { useQuery } from 'react-apollo';

/* Child Components */
import ProfileInfoHeader from './ProfileInfoHeader';
import ShortlistBox from './ShortlistBox';
import ProfileCalendar from './ProfileCalendar';
import ProfileCourses from './ProfileCourses';
import ProfileFinalExams from './ProfileFinalExams';
import Modal from '../../components/display/Modal';
import CourseReviewCourseBox from '../../components/common/CourseReviewCourseBox';
import LoadingSpinner from '../../components/display/LoadingSpinner';
import CompleteProfileContent from './CompleteProfileContent';

/* Styled Components */
import {
  ProfilePageWrapper,
  CompleteProfileWrapper,
  ColumnWrapper,
  Column1,
  Column2,
} from './styles/ProfilePage';

/* Selectors */
import { getIsLoggedIn } from '../../data/reducers/AuthReducer';
import { getIsBrowserDesktop } from '../../data/reducers/BrowserReducer';

/* Queries */
import { GET_USER } from '../../graphql/queries/user/User';

/* Routes */
import { LANDING_PAGE_ROUTE } from '../../Routes';
import NotFoundPage from '../notFoundPage/NotFoundPage';
import { logOut } from '../../utils/Auth';

const mapStateToProps = state => ({
  isLoggedIn: getIsLoggedIn(state),
  isBrowserDesktop: getIsBrowserDesktop(state)
});

const ProfilePageContent = ({ user, isBrowserDesktop }) => {
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [selectedCourseIndex, setSelectedCourseIndex] = useState(0);

  let {
    courses_taken: courses,
    course_reviews: courseReviews,
    prof_reviews: profReviews,
    shortlist
  } = user;
  
  const reviewModalCourseList = courses.map(course => {
    const courseReview = courseReviews.find(review => review.course_id === course.course.id);
    const profReview = profReviews.find(review => review.course_id === course.course.id);
    return { course: course.course, courseReview, profReview };
  });

  return (
    <>
      <ProfileInfoHeader user={user} />
      <ColumnWrapper>
        <Column1>
          <ProfileCalendar />
          <ProfileCourses
            courses={courses}
            courseReviews={courseReviews}
            setReviewCourse={setSelectedCourseIndex}
            openModal={() => setReviewModalOpen(true)}
          />
          <ProfileFinalExams courses={courses} />
        </Column1>
        <Column2>
          {isBrowserDesktop && (
            <CompleteProfileWrapper>
              <CompleteProfileContent user={user} />
            </CompleteProfileWrapper>
          )}
          <ShortlistBox shortlistCourses={shortlist} />
        </Column2>
      </ColumnWrapper>
      <Modal
        isOpen={reviewModalOpen}
        onRequestClose={() => setReviewModalOpen(false)}
      >
        <CourseReviewCourseBox
          showCourseDropdown
          courseList={reviewModalCourseList}
          selectedCourseIndex={selectedCourseIndex}
          setSelectedCourseIndex={setSelectedCourseIndex}
          onCancel={() => setReviewModalOpen(false)}
        />
      </Modal>
    </>
  );
};

export const ProfilePage = ({ history, isLoggedIn, isBrowserDesktop }) => {
  const dispatch = useDispatch();

  const { loading, error, data } = useQuery(GET_USER, {
    variables: { id: localStorage.getItem('user_id') },
  });

  if (data && data.user.length === 0) {
    logOut(dispatch);
  }

  if (!isLoggedIn) {
    history.push(LANDING_PAGE_ROUTE);
  }

  return loading ? (
    <LoadingSpinner />
  ) : error || !data ? (
    <NotFoundPage />
  ) : (
    <ProfilePageWrapper>
      <ProfilePageContent user={{ ...data.user[0] }} isBrowserDesktop={isBrowserDesktop} />
    </ProfilePageWrapper>
  );
};

export default withRouter(connect(mapStateToProps)(ProfilePage));
