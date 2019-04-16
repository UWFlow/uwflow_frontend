import React from 'react';
import { connect } from 'react-redux';

/* Selectors */
import { getCourseInfo } from '../../../data/reducers/CourseReducer';

const mapStateToProps = (state, { courseID }) => ({
  courseInfo: getCourseInfo(state, courseID),
});

const CourseInfoBox = ({ courseInfo }) => {};

export default connect(mapStateToProps)(CourseInfoBox);
