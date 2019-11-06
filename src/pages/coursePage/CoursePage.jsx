import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

/* Child Components */
import CourseInfoHeader from './CourseInfoHeader';
import CourseSchedule from './CourseSchedule';
import ExtraInfoBox from './ExtraInfoBox';
import CourseReviews from './CourseReviews';
import CourseReviewCourseBox from '../../components/coursePage/CourseReviewCourseBox';
import Button from '../../components/input/Button';
import ModalHOC from '../../components/modal/ModalHOC';
import LikeCourseToggle from '../../components/input/LikeCourseToggle';
import AuthModal from '../../auth/AuthModal';

/* Styled Components */
import {
  CoursePageWrapper,
  ColumnWrapper,
  Column1,
  Column2,
  CourseReviewQuestionBox,
  CourseQuestionTextAndToggle,
  CourseReviewQuestionText,
} from './styles/CoursePage';

import { splitCourseCode } from '../../utils/Misc';
import { getIsLoggedIn } from '../../data/reducers/AuthReducer';

const mapStateToProps = state => ({
  isLoggedIn: getIsLoggedIn(state),
});

const CoursePageContent = ({ course, shortlisted, userReview, isLoggedIn }) => {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);

  const handleReviewClick = () => {
    isLoggedIn ? setReviewModalOpen(true) : setAuthModalOpen(true);
  };
  console.log(course);
  return (
    <>
      <CourseInfoHeader
        course={course}
        shortlisted={shortlisted}
        setAuthModalOpen={setAuthModalOpen}
      />
      <ColumnWrapper>
        <Column1>
          <CourseSchedule sections={course.sections} />
          <CourseReviewQuestionBox>
            <CourseQuestionTextAndToggle>
              <CourseReviewQuestionText>
                What do you think of {splitCourseCode(course.code)}?
              </CourseReviewQuestionText>
              <LikeCourseToggle liked={true} />
            </CourseQuestionTextAndToggle>
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
