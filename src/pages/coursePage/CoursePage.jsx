import React from 'react';
import { connect } from 'react-redux';
import { useQuery } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

/* Child Components */
import Button from 'components/input/Button';
import LikeCourseToggle from 'components/input/LikeCourseToggle';
import LoadingSpinner from 'components/display/LoadingSpinner';
import NotFoundPage from 'pages/notFoundPage/NotFoundPage';

/* Queries */
import { buildCourseQuery } from 'graphql/queries/course/Course';
import { getUserId } from 'utils/Auth';

/* Styled Components */

/* Selectors */
import { getIsLoggedIn } from 'data/reducers/AuthReducer';
import { getIsBrowserDesktop } from 'data/reducers/BrowserReducer';

/* Utils */
import { formatCourseCode } from 'utils/Misc';
import withModal from 'components/modal/withModal';

/* Constants */
import { NOT_FOUND, DEFAULT_ERROR } from 'constants/Messages';
import { AUTH_MODAL, COURSE_REVIEW_COURSE_MODAL } from 'constants/Modal';
import {
  CoursePageWrapper,
  ColumnWrapper,
  Column1,
  Column2,
  ReviewWrapper,
  CourseReviewQuestionBox,
  CourseQuestionTextAndToggle,
  CourseReviewQuestionText,
} from './styles/CoursePage';
import CourseReviews from './CourseReviews';
import CourseRequisites from './CourseRequisites';
import CourseSchedule from './CourseSchedule';
import CourseInfoHeader from './CourseInfoHeader';

const mapStateToProps = (state) => ({
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
  userEmail,
  openModal,
  closeModal,
}) => {
  const handleReviewClick = () =>
    isLoggedIn
      ? openModal(COURSE_REVIEW_COURSE_MODAL, {
          courseList: [{ course, review: userReview }],
          onCancel: () => closeModal(COURSE_REVIEW_COURSE_MODAL),
        })
      : openModal(AUTH_MODAL);

  const Schedule = (
    <CourseSchedule
      sections={course.sections}
      courseCode={course.code}
      courseID={course.id}
      sectionSubscriptions={sectionSubscriptions}
      userEmail={userEmail}
    />
  );

  return (
    <>
      <CourseInfoHeader course={course} shortlisted={shortlisted} />
      <ColumnWrapper>
        {isBrowserDesktop && Schedule}
        <Column1>
          <ReviewWrapper>
            {!isBrowserDesktop && Schedule}
            {(!isLoggedIn || userCourseTaken) && (
              <CourseReviewQuestionBox>
                <CourseQuestionTextAndToggle>
                  <CourseReviewQuestionText>
                    What do you think of {formatCourseCode(course.code)}?
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
          </ReviewWrapper>
          <CourseReviews
            courseID={course.id}
            profsTeaching={course.profs_teaching}
          />
        </Column1>
        <Column2>
          <CourseRequisites
            courseCode={course.code}
            prereqs={course.prereqs}
            antireqs={course.antireqs}
            coreqs={course.coreqs}
            postreqs={course.postrequisites}
          />
        </Column2>
      </ColumnWrapper>
    </>
  );
};

const CoursePage = ({
  match,
  isLoggedIn,
  isBrowserDesktop,
  openModal,
  closeModal,
}) => {
  const courseCode = match.params.courseCode.toLowerCase();
  const query = buildCourseQuery(isLoggedIn);

  const { loading, error, data } = useQuery(query, {
    variables: { code: courseCode, user_id: getUserId() },
  });

  return loading ? (
    <CoursePageWrapper>
      <LoadingSpinner />
    </CoursePageWrapper>
  ) : error || !data ? (
    <NotFoundPage text={DEFAULT_ERROR} title="" />
  ) : data.course.length === 0 ? (
    <NotFoundPage text={NOT_FOUND.course} />
  ) : (
    <CoursePageWrapper>
      <Helmet>
        <title>
          {formatCourseCode(data.course[0].code)} - {data.course[0].name} - UW
          Flow
        </title>
        <meta name="description" content={data.course[0].description} />
        <meta
          property="og:title"
          content={`${formatCourseCode(data.course[0].code)} - ${
            data.course[0].name
          } - UW Flow`}
        />
        <meta property="og:description" content={data.course[0].description} />
      </Helmet>
      <CoursePageContent
        course={data.course[0]}
        userReview={
          isLoggedIn && data.review.length > 0 ? data.review[0] : null
        }
        userCourseTaken={!!(isLoggedIn && data.user_course_taken.length > 0)}
        shortlisted={isLoggedIn && data.user_shortlist.length > 0}
        sectionSubscriptions={data.queue_section_subscribed || []}
        isLoggedIn={isLoggedIn}
        isBrowserDesktop={isBrowserDesktop}
        userEmail={isLoggedIn && data.user[0].email}
        openModal={openModal}
        closeModal={closeModal}
      />
    </CoursePageWrapper>
  );
};

CoursePage.propTypes = {
  data: PropTypes.object,
};

export default withModal(withRouter(connect(mapStateToProps)(CoursePage)));
