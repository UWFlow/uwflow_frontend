import React, { useState } from 'react';
import PropTypes from 'prop-types';

/* Child Components */
import CourseInfoHeader from './CourseInfoHeader';
import CourseSchedule from './CourseSchedule';
import ExtraInfoBox from './ExtraInfoBox';
import CourseReviews from './CourseReviews';
import CourseReviewCourseBox from './CourseReviewCourseBox';
import Button from '../../../sharedComponents/input/Button';
import ModalHOC from '../../../sharedComponents/modal/ModalHOC';
import NotFoundPage from '../notFoundPage/NotFoundPage';
import LoadingSpinner from '../../../sharedComponents/display/LoadingSpinner';
import LikeCourseToggle from '../../../sharedComponents/input/LikeCourseToggle';
import AuthModal from '../../../auth/AuthModal';

/* Styled Components */
import {
  CoursePageWrapper,
  ColumnWrapper,
  Column1,
  Column2,
  CourseReviewQuestionBox,
  CourseReviewQuestionText,
} from './styles/CoursePage';

import { splitCourseCode } from '../../../utils/Misc';
import { isLoggedIn } from '../../../utils/Auth';

const CoursePageContent = ({ course, shortlisted, userReview }) => {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);

  const handleReviewClick = () => {
    isLoggedIn() ? setReviewModalOpen(true) : setAuthModalOpen(true);
  }

  return (
    <>
      <CourseInfoHeader
        course={course}
        shortlisted={shortlisted}
        setAuthModalOpen={setAuthModalOpen}
      />
      <ColumnWrapper>
        <Column1>
          {/*<CourseSchedule sections={course.sections} />*/}
          <CourseReviewQuestionBox>
            <CourseReviewQuestionText>
              What do you think of {splitCourseCode(course.code)}?
            </CourseReviewQuestionText>
            <LikeCourseToggle liked={true} />
            <Button
              width={200}
              padding="16px 24px"
              handleClick={handleReviewClick}
            >
              {userReview ? 'Edit your review' : 'Add your review'}
            </Button>
          </CourseReviewQuestionBox>
          <ModalHOC
            isModalOpen={reviewModalOpen}
            onCloseModal={() => setReviewModalOpen(false)}
          >
            <CourseReviewCourseBox
              courseIDList={[course.id]}
              reviewData={userReview}
              onCancel={() => setReviewModalOpen(false)}
            />
          </ModalHOC>
          <CourseReviews courseID={course.id} />
        </Column1>
        <Column2>
          <ExtraInfoBox
            courseCode={course.code}
            prereqs={course.prerequisites}
            postreqs={course.postrequisites}
          />
        </Column2>
      </ColumnWrapper>
      <AuthModal
        isModalOpen={authModalOpen}
        onCloseModal={() => setAuthModalOpen(false)}
        width={400}
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
  data: PropTypes.object
};

export default CoursePage;
