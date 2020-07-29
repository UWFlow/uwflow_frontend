import React from 'react';
import { useQuery } from 'react-apollo';
import { Helmet } from 'react-helmet';
import { useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';

import LoadingSpinner from 'components/display/LoadingSpinner';
import Button from 'components/input/Button';
import LikeCourseToggle from 'components/input/LikeCourseToggle';
import { DEFAULT_ERROR, NOT_FOUND } from 'constants/Messages';
import { AUTH_MODAL, COURSE_REVIEW_COURSE_MODAL } from 'constants/Modal';
import { getIsBrowserDesktop } from 'data/reducers/RootReducer';
import {
  GET_COURSE,
  GET_COURSE_WITH_USER_DATA,
} from 'graphql/queries/course/Course';
import useModal from 'hooks/useModal';
import NotFoundPage from 'pages/notFoundPage/NotFoundPage';
import { getUserId } from 'utils/Auth';
import { formatCourseCode } from 'utils/Misc';

import {
  Column1,
  Column2,
  ColumnWrapper,
  CoursePageWrapper,
  CourseQuestionTextAndToggle,
  CourseReviewQuestionBox,
  CourseReviewQuestionText,
  ReviewWrapper,
} from './styles/CoursePage';
import CourseInfoHeader from './CourseInfoHeader';
import CourseRequisites from './CourseRequisites';
import CourseReviews from './CourseReviews';
import CourseSchedule from './CourseSchedule';

const CoursePageContent = ({
  course,
  shortlisted,
  userReview,
  userCourseTaken,
  sectionSubscriptions,
  userEmail,
}) => {
  const [openModal, closeModal] = useModal();
  const isBrowserDesktop = useSelector(getIsBrowserDesktop);
  const isLoggedIn = useSelector((state) => state.auth.loggedIn);

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

const CoursePage = () => {
  const match = useRouteMatch();
  const isLoggedIn = useSelector((state) => state.auth.loggedIn);

  const courseCode = match.params.courseCode.toLowerCase();
  const query = isLoggedIn ? GET_COURSE_WITH_USER_DATA : GET_COURSE;

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
        userEmail={isLoggedIn && data.user[0].email}
      />
    </CoursePageWrapper>
  );
};

export default CoursePage;
