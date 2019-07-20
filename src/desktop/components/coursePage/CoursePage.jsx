import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { useQuery } from 'react-apollo';
import PropTypes from 'prop-types';

/* Child Components */
import CourseInfoHeader from './CourseInfoHeader';
import CourseSchedule from './CourseSchedule';
import ExtraInfoBox from './ExtraInfoBox';
import CourseReviews from './CourseReviews';
import CourseReviewCourseBox from './CourseReviewCourseBox';
import Button from '../common/Button';

/* Styled Components */
import {
  CoursePageWrapper,
  ColumnWrapper,
  Column1,
  Column2,
  CourseReviewQuestionBox,
  CourseReviewQuestionText,
  AddReviewButton,
} from './styles/CoursePage';

/* GraphQL Queries */
import { GET_COURSE } from '../../../graphql/queries/course/Course';

const CoursePageContent = ({ course, liked, easy, useful, courseID }) => {
  const [hideReviewForm, setHideReviewForm] = useState(true);

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
          <CourseSchedule />
          {hideReviewForm && (
            <CourseReviewQuestionBox>
              <CourseReviewQuestionText>
                What do you think of {course.code}?
              </CourseReviewQuestionText>
              <Button
                children="Add your review"
                width={200}
                handleClick={() => {
                  setHideReviewForm(false);
                }}
              />
            </CourseReviewQuestionBox>
          )}
          {!hideReviewForm && (
            <CourseReviewCourseBox
              courseID={courseID}
              onCancel={() => setHideReviewForm(true)}
            />
          )}
          <CourseReviews courseID={courseID} />
        </Column1>
        <Column2>
          <ExtraInfoBox />
        </Column2>
      </ColumnWrapper>
    </>
  );
};

const CoursePage = ({ match }) => {
  const courseID = match.params.courseID;
  const { loading, error, data } = useQuery(GET_COURSE, {variables: { id: courseID }});

  return (
    <CoursePageWrapper>
      { loading
          ? <div>Loading ...</div>
          : <CoursePageContent
            course={data.course[0]}
            easy={data.aggregate_course_easy_buckets_aggregate}
            liked={data.aggregate_course_liked_buckets_aggregate}
            useful={data.aggregate_course_useful_buckets_aggregate}
            courseID={courseID}
          />
      }
    </CoursePageWrapper>
  );
};

CoursePage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({ courseID: PropTypes.string }).isRequired,
  }).isRequired,
};

export default withRouter(CoursePage);
