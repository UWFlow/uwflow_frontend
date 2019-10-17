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

import { splitCourseCode } from '../../../utils/Misc';

const CoursePageContent = ({ course }) => {
  const [reviewModalOpen, setReviewModalOpen] = useState(false);

  return (
    <>
      <CourseInfoHeader
        course={course}
      />
      <ColumnWrapper>
        <Column1>
          {/*<CourseSchedule sections={course.sections} />*/}
          <CourseReviewQuestionBox>
            <CourseReviewQuestionText>
              What do you think of {splitCourseCode(course.code)}?
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
              courseIDList={[course.id]}
              onCancel={() => setReviewModalOpen(false)}
            />
          </ModalHOC>
          <CourseReviews courseID={course.id} />
        </Column1>
        <Column2>
          <ExtraInfoBox />
        </Column2>
      </ColumnWrapper>
    </>
  );
};

const CoursePage = ({ loading, error, data }) => (
  <CoursePageWrapper>
    {loading ? (
      <div>Loading ...</div>
    ) : error || !data || !data.course || data.course.length === 0 ? (
      <NotFoundPage text="Sorry, we couldn't find that course!" />
    ) : (
      <CoursePageContent course={data.course[0]} />
    )}
  </CoursePageWrapper>
);

CoursePage.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.object,
  data: PropTypes.object
};

export default CoursePage;
