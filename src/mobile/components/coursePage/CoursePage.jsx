import React, { useState } from 'react';
import PropTypes from 'prop-types';

/* Child Components */
import CourseInfoHeader from './CourseInfoHeader';
import NotFoundPage from '../../../desktop/components/notFoundPage/NotFoundPage';
import CourseReviews from './CourseReviews';
import CourseExtraInfo from './CourseExtraInfo';
import LoadingSpinner from '../../../sharedComponents/display/LoadingSpinner';
import AuthModal from '../../../auth/AuthModal';

/* Styled Components */
import { CoursePageWrapper } from './styles/CoursePage';

const CoursePageContent = ({ course, shortlisted, userReview }) => {
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

const CoursePage = ({ loading, error, data }) => (
  <CoursePageWrapper>
    {loading ? (
      <LoadingSpinner />
    ) : error || !data || !data.course || data.course.length === 0 ? (
      <NotFoundPage text="Sorry, we couldn't find that course!" />
    ) : (
      <CoursePageContent
        course={data.course[0]}
        shortlisted={data.user_shortlist && data.user_shortlist.length > 0}
        userReview={data.course_review
          && data.course_review.length > 0 ? data.course_review[0] : null}
      />
    )}
  </CoursePageWrapper>
);

CoursePage.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.object,
  data: PropTypes.object,
};

export default CoursePage;
