import React from 'react';
import { connect } from 'react-redux';

/* Selectors */
import { getProfCourseReview } from '../../../data/reducers/ProfReducer';
import { getCourseInfo } from '../../../data/reducers/CourseReducer';

const mapStateToProps = (state, { profID, courseID }) => ({
  profCourseReview: getProfCourseReview(state, profID),
  courseInfo: getCourseInfo(state, courseID),
});

const ProfCourseReview = () => {};

export default connect(mapStateToProps)(ProfCourseReview);
