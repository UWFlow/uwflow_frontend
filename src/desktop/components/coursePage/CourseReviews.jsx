import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state, { courseID }) => ({
  courseReviews: getCourseReviews(state, courseID),
});

const CourseReviews = ({ courseReviews }) => {
  return <div />;
};

export default connect(mapStateToProps)(CourseReviews);
