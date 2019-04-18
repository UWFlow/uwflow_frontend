import React from 'react';
import { connect } from 'react-redux';

/* Selectors */
import { getCourseInfo } from '../../../data/reducers/CourseReducer';

/* Styled Components */
import { CourseInfoBoxWrapper } from './styles/CoursePage';

const mapStateToProps = (state, { courseID }) => ({
  courseInfo: getCourseInfo(state, courseID),
});

const CourseInfoBox = ({ courseInfo }) => {
  return <CourseInfoBoxWrapper>Course Info Box</CourseInfoBoxWrapper>;
};

export default connect(mapStateToProps)(CourseInfoBox);
