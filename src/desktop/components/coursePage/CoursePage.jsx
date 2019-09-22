import React, { useState } from 'react';
import PropTypes from 'prop-types';

/* Child Components */
import CourseInfoHeader from './CourseInfoHeader';
import CourseSchedule from './CourseSchedule';
import ExtraInfoBox from './ExtraInfoBox';
import CourseReviews from './CourseReviews';
import CourseReviewCourseBox from './CourseReviewCourseBox';
import Button from '../../../basicComponents/Button';
import ModalHOC from '../../../basicComponents/modal/ModalHOC';
import NotFoundPage from '../notFoundPage/NotFoundPage';

/* Styled Components */
import {
  CoursePageWrapper,
  ColumnWrapper,
  Column1,
  Column2,
  CourseReviewQuestionBox,
  CourseReviewQuestionText,
} from './styles/CoursePage';

const CoursePageContent = ({ course, liked, easy, useful, courseID }) => {
  const [reviewModalOpen, setReviewModalOpen] = useState(false);

  return (
    <>
      <CourseInfoHeader
        course={course}
        liked={liked}
        easy={easy}
        useful={useful}
      />
      <ColumnWrapper>
        <Column1>
          <CourseSchedule courseID={courseID} />
          <CourseReviewQuestionBox>
            <CourseReviewQuestionText>
              What do you think of {course.code}?
            </CourseReviewQuestionText>
            <Button
              children="Add your review"
              width={200}
              handleClick={() => setReviewModalOpen(true)}
            />
          </CourseReviewQuestionBox>
          <ModalHOC
            isModalOpen={reviewModalOpen}
            onCloseModal={() => setReviewModalOpen(false)}
          >
            <CourseReviewCourseBox
              courseIDList={[courseID]}
              onCancel={() => setReviewModalOpen(false)}
            />
          </ModalHOC>
          <CourseReviews courseID={courseID} />
        </Column1>
        <Column2>
          <ExtraInfoBox />
        </Column2>
      </ColumnWrapper>
    </>
  );
};

const CoursePage = ({ loading, error, data, courseID }) => (
  <CoursePageWrapper>
    {loading ? (
      <div>Loading ...</div>
    ) : error || !data || !data.course || data.course.length === 0 ? (
      <NotFoundPage text="Sorry, we couldn't find that course!" />
    ) : (
      <CoursePageContent
        course={data.course[0]}
        easy={data.aggregate_course_easy_buckets_aggregate}
        liked={data.aggregate_course_liked_buckets_aggregate}
        useful={data.aggregate_course_useful_buckets_aggregate}
        courseID={courseID}
      />
    )}
  </CoursePageWrapper>
);

CoursePage.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.bool,
  courseID: PropTypes.string,
};

export default CoursePage;
