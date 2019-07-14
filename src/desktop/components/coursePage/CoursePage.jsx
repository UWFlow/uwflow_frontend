import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { Query } from 'react-apollo';
import PropTypes from 'prop-types';

/* Child Components */
import CourseInfoHeader from './CourseInfoHeader';
import CourseSchedule from './CourseSchedule';
import ExtraInfoBox from './ExtraInfoBox';
import CourseReviews from './CourseReviews';
import CourseReviewCourseBox from './CourseReviewCourseBox';

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
import { GET_COURSE } from '../../../graphql/queries/course/Course.jsx';
import Button from '../common/Button';

const CoursePageContent = ({ course, courseID }) => {
  const [hideReviewForm, setHideReviewForm] = useState(true);
  return (
    <>
      <CourseInfoHeader course={course} />
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

  return (
    <CoursePageWrapper>
      <Query query={GET_COURSE} variables={{ id: courseID }}>
        {({ loading, error, data }) => {
          if (loading) {
            return <div>Loading...</div>;
          }
          if (error) {
            return <div>Error</div>;
          }
          if (data.course.length === 0) {
            return <div>Course Doesn't Exist</div>;
          }

          const course = data.course[0];
          return <CoursePageContent course={course} courseID={courseID} />;
        }}
      </Query>
    </CoursePageWrapper>
  );
};

CoursePage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({ courseID: PropTypes.string }),
  }),
};

export default withRouter(CoursePage);
