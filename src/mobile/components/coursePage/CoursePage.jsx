import React, { useState } from 'react';
import PropTypes from 'prop-types';

/* Child Components */
import CourseInfoHeader from './CourseInfoHeader';
import NotFoundPage from '../notFoundPage/NotFoundPage';
import CourseReviews from './CourseReviews';

/* Styled Components */
import { CoursePageWrapper } from './styles/CoursePage';

const CoursePageContent = ({ course }) => {
  return (
    <>
      <CourseInfoHeader course={course} />
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
