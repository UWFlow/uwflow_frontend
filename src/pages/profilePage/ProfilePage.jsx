import React, { useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { useQuery } from 'react-apollo';

/* Child Components */
import ProfileInfoHeader from './ProfileInfoHeader';
import ShortlistBox from './ShortlistBox';
import ProfileCalendar from './ProfileCalendar';
import ProfileCourses from './ProfileCourses';
import ProfileFinalExams from './ProfileFinalExams';
import ModalHOC from '../../components/modal/ModalHOC';
import CourseReviewCourseBox from '../../components/coursePage/CourseReviewCourseBox';
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
import { GET_USER } from '../../graphql/queries/profile/User';

/* Routes */
import { LANDING_PAGE_ROUTE } from '../../Routes';

const mapStateToProps = state => ({
  isLoggedIn: getIsLoggedIn(state),
  isBrowserDesktop: getIsBrowserDesktop(state)
});

const ProfilePageContent = ({ user, isBrowserDesktop }) => {
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [selectedCourseIndex, setSelectedCourseIndex] = useState(0);
  const courseCodes = user.courses_taken.map(
    course_taken => course_taken.course.code,
  );

  return (
    <>
      <ProfileInfoHeader user={user} />
      <ColumnWrapper>
        <Column1>
          <ProfileCalendar />
          <ProfileCourses
            courses={user.courses_taken}
            setReviewCourse={setSelectedCourseIndex}
            openModal={() => setReviewModalOpen(true)}
          />
          <ProfileFinalExams courses={user.courses_taken} />
        </Column1>
        <Column2>
          {isBrowserDesktop && (
            <CompleteProfileWrapper>
              <CompleteProfileContent user={user} />
            </CompleteProfileWrapper>
          )}
          <ShortlistBox shortlistCourses={user.shortlist} />
        </Column2>
      </ColumnWrapper>
      <ModalHOC
        isModalOpen={reviewModalOpen}
        onCloseModal={() => setReviewModalOpen(false)}
      >
        <CourseReviewCourseBox
          showCourseDropdown
          courseIDList={courseCodes}
          selectedCourseIndex={selectedCourseIndex}
          setSelectedCourseIndex={setSelectedCourseIndex}
          onCancel={() => setReviewModalOpen(false)}
        />
      </ModalHOC>
    </>
  );
};

export const ProfilePage = ({ history, isLoggedIn, isBrowserDesktop }) => {
  const { loading, error, data } = useQuery(GET_USER, {
    variables: { id: localStorage.getItem('user_id') },
  });

  if (!isLoggedIn) {
    history.push(LANDING_PAGE_ROUTE);
  }

  return loading ? (
    <LoadingSpinner />
  ) : error || !data ? (
    <div>Error</div>
  ) : (
    <ProfilePageWrapper>
      <ProfilePageContent user={{ ...data.user[0] }} isBrowserDesktop={isBrowserDesktop} />
    </ProfilePageWrapper>
  );
};

export default withRouter(connect(mapStateToProps)(ProfilePage));
