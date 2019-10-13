import React, { useState } from 'react';
import PropTypes from 'prop-types';

/* Child Components */
import CourseInfoHeader from './CourseInfoHeader';
import NotFoundPage from '../notFoundPage/NotFoundPage';
import CourseReviews from './CourseReviews';
import CourseExtraInfo from './CourseExtraInfo';

/* Styled Components */
import { CoursePageWrapper } from './styles/CoursePage';

const CoursePageContent = ({ course }) => {
  console.log(course);
  return (
    <>
      <CourseInfoHeader course={course} />
      <CourseExtraInfo
        courseCode={course.code}
        prereqs={course.prerequisites}
        postreqs={course.postrequisites}
        textbooks={course.textbooks}
      />
      <CourseReviews courseID={course.id} />
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
  data: PropTypes.object,
};

export default CoursePage;
