import React from 'react';
import { connect } from 'react-redux';

/* Selectors */
import {
  getProfCoursesTaughtReviews,
  getProfCoursesTaughtInfo,
} from '../../../../data/reducers/ProfReducer';

const mapStateToProps = (state, { profID }) => ({
  courseReviews: getProfCoursesTaughtReviews(state, profID),
  courseInfo: getProfCoursesTaughtInfo(state, profID),
});

const ProfCourseReviews = () => {};

export default connect(mapStateToProps)(ProfCourseReviews);
