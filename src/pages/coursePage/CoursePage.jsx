import React, { useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { useQuery } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

/* Child Components */
import CourseInfoHeader from './CourseInfoHeader';
import CourseSchedule from './CourseSchedule';
import CourseRequisites from './CourseRequisites';
import CourseReviews from './CourseReviews';
import CourseReviewCourseBox from '../../components/common/CourseReviewCourseBox';
import Button from '../../components/input/Button';
import Modal from '../../components/display/Modal';
import LikeCourseToggle from '../../components/input/LikeCourseToggle';
import LoadingSpinner from '../../components/display/LoadingSpinner';
import NotFoundPage from '../../pages/notFoundPage/NotFoundPage';

/* Queries */
import { buildCourseQuery } from '../../graphql/queries/course/Course';
import { getUserId } from '../../utils/Auth';

/* Styled Components */
import {
  CoursePageWrapper,
  ColumnWrapper,
  Column1,
  Column2,
  ScheduleAndReviewWrapper,
  CourseReviewQuestionBox,
  CourseQuestionTextAndToggle,
  CourseReviewQuestionText,
} from './styles/CoursePage';

/* Selectors */
import { getIsLoggedIn } from '../../data/reducers/AuthReducer';
import { getIsBrowserDesktop } from '../../data/reducers/BrowserReducer';

import { splitCourseCode } from '../../utils/Misc';
import { authModalOpen } from '../../data/actions/AuthActions';

const mapStateToProps = state => ({
  isBrowserDesktop: getIsBrowserDesktop(state),
  isLoggedIn: getIsLoggedIn(state),
});

const CoursePageContent = ({
  course,
  shortlisted,
  userReview,
  userCourseTaken,
  sectionSubscriptions,
  isLoggedIn,
  isBrowserDesktop,
}) => {
  const dispatch = useDispatch();
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  console.log(sectionSubscriptions);
  const handleReviewClick = () => {
    isLoggedIn ? setReviewModalOpen(true) : dispatch(authModalOpen());
  };

  return (
    <>
      <CourseInfoHeader course={course} shortlisted={shortlisted} />
      <ColumnWrapper>
        <Column1>
          <ScheduleAndReviewWrapper>
            <CourseSchedule
              sections={course.sections}
              courseCode={course.code}
              courseID={course.id}
              sectionSubscriptions={sectionSubscriptions}
            />
            {(!isLoggedIn || userCourseTaken) && (
              <CourseReviewQuestionBox>
                <CourseQuestionTextAndToggle>
                  <CourseReviewQuestionText>
                    What do you think of {splitCourseCode(course.code)}?
                  </CourseReviewQuestionText>
                  <LikeCourseToggle
                    courseCode={course.code}
                    courseID={course.id}
                    profID={userReview ? userReview.prof_id : null}
                    reviewID={userReview ? userReview.id : null}
                    initialState={userReview ? userReview.liked : null}
                  />
                </CourseQuestionTextAndToggle>
                <Button
                  width={isBrowserDesktop ? 'max-content' : '100%'}
                  padding="16px 24px"
                  handleClick={handleReviewClick}
                >
                  {userReview ? 'Edit your review' : 'Add your review'}
                </Button>
              </CourseReviewQuestionBox>
            )}
          </ScheduleAndReviewWrapper>
          <CourseReviews courseID={course.id} />
        </Column1>
        <Column2>
          <CourseRequisites
            courseCode={course.code}
            prereqs={course.prereqs}
            antireqs={course.antireqs}
            postreqs={course.postrequisites}
          />
        </Column2>
      </ColumnWrapper>
      <Modal
        isOpen={reviewModalOpen}
        onRequestClose={() => setReviewModalOpen(false)}
      >
        <CourseReviewCourseBox
          courseList={[{ course: course, review: userReview }]}
          onCancel={() => setReviewModalOpen(false)}
        />
      </Modal>
    </>
  );
};

const CoursePage = ({ match, isLoggedIn, isBrowserDesktop }) => {
  const courseCode = match.params.courseCode.toLowerCase();
  const query = buildCourseQuery(isLoggedIn, getUserId());

  const { loading, error, data } = useQuery(query, {
    variables: { code: courseCode },
  });

  return loading ? (
    <CoursePageWrapper>
      <LoadingSpinner />
    </CoursePageWrapper>
  ) : error || !data || !data.course || data.course.length === 0 ? (
    <NotFoundPage text="Sorry, we couldn't find that course!" />
  ) : (
    <CoursePageWrapper>
      <CoursePageContent
        course={data.course[0]}
        userReview={
          isLoggedIn && data.review.length > 0 ? data.review[0] : null
        }
        userCourseTaken={
          isLoggedIn && data.user_course_taken.length > 0 ? true : false
        }
        shortlisted={isLoggedIn && data.user_shortlist.length > 0}
        sectionSubscriptions={data.section_subscription || []}
        isLoggedIn={isLoggedIn}
        isBrowserDesktop={isBrowserDesktop}
      />
    </CoursePageWrapper>
  );
};

CoursePage.propTypes = {
  data: PropTypes.object,
};

export default withRouter(connect(mapStateToProps)(CoursePage));
