import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

/* Child Components */
import CourseInfoHeader from './CourseInfoHeader';
import CourseReviews from './CourseReviews';
import CourseExtraInfo from './CourseExtraInfo';
import AuthModal from '../../../auth/AuthModal';

/* Styled Components */
import { CoursePageWrapper } from './styles/CoursePage';

import { getIsLoggedIn } from '../../../data/reducers/AuthReducer';

const mapStateToProps = state => ({
  isLoggedIn: getIsLoggedIn(state),
});

const CoursePageContent = ({ course, shortlisted, userReview, isLoggedIn }) => {
  const [authModalOpen, setAuthModalOpen] = useState(false);

  return (
    <>
      <CourseInfoHeader
        course={course}
        shortlisted={shortlisted}
        setAuthModalOpen={setAuthModalOpen}
      />
      <CourseExtraInfo
        courseCode={course.code}
        prereqs={course.prerequisites}
        postreqs={course.postrequisites}
      />
      <CourseReviews courseID={course.id} />
      <AuthModal
        isModalOpen={authModalOpen}
        onCloseModal={() => setAuthModalOpen(false)}
        width={350}
      />
    </>
  );
};

const CoursePage = ({ data, isLoggedIn }) => (
  <CoursePageWrapper>
    <CoursePageContent
      course={data.course[0]}
      shortlisted={isLoggedIn && data.user_shortlist.length > 0}
      userReview={
        isLoggedIn && data.course_review.length > 0
          ? data.course_review[0]
          : null
      }
      isLoggedIn={isLoggedIn}
    />
  </CoursePageWrapper>
);

CoursePage.propTypes = {
  data: PropTypes.object,
};

export default connect(mapStateToProps)(CoursePage);
