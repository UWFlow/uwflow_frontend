import React, { useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { useQuery } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

/* Child Components */
import CourseInfoHeader from './CourseInfoHeader';
import CourseSchedule from './CourseSchedule';
import ExtraInfoBox from './ExtraInfoBox';
import CourseReviews from './CourseReviews';
import CourseReviewCourseBox from '../../components/common/CourseReviewCourseBox';
import Button from '../../components/input/Button';
import ModalHOC from '../../components/modal/ModalHOC';
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
  isLoggedIn: getIsLoggedIn(state)
});

const CoursePageContent = ({
  course,
  shortlisted,
  isLoggedIn,
  isBrowserDesktop,
}) => {
  const dispatch = useDispatch();
  const [reviewModalOpen, setReviewModalOpen] = useState(false);

  const handleReviewClick = () => {
    isLoggedIn ? setReviewModalOpen(true) : dispatch(authModalOpen());
  };
  const userReview = false; // TODO finish fetching user review

  return (
    <>
      <CourseInfoHeader course={course} shortlisted={shortlisted} />
      <ColumnWrapper>
        <Column1>
          {isBrowserDesktop && (
            <ScheduleAndReviewWrapper>
              <CourseSchedule sections={course.sections} />
              <CourseReviewQuestionBox>
                <CourseQuestionTextAndToggle>
                  <CourseReviewQuestionText>
                    What do you think of {splitCourseCode(course.code)}?
                  </CourseReviewQuestionText>
                  <LikeCourseToggle courseID={course.id} initialState={true} />
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
                  onCancel={() => setReviewModalOpen(false)}
                />
              </ModalHOC>
            </ScheduleAndReviewWrapper>
          )}
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
    <LoadingSpinner />
  ) : error || !data || !data.course || data.course.length === 0 ? (
    <NotFoundPage text="Sorry, we couldn't find that course!" />
  ) : (
    <CoursePageWrapper>
      <CoursePageContent
        course={data.course[0]}
        shortlisted={isLoggedIn && data.user_shortlist.length > 0}
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
