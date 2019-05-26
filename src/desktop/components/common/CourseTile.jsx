import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

/* Selectors */
import { getCourseInfo } from '../../../data/reducers/CourseReducer';

/* Styled Components */
import { CourseTileWrapper } from './styles/CourseTile';

const mapStateToProps = (state, { courseID }) => ({
  info: getCourseInfo(state, courseID),
});

const CourseTile = ({ info }) => {
  return <CourseTileWrapper>{info.courseName}</CourseTileWrapper>;
};

export default CourseTile;
