import React from 'react';
import { connect } from 'react-redux';

/* Selectors */
import {
  getProfReviews,
  getProfCoursesTaughtInfo,
} from '../../../../data/reducers/ProfReducer';

const mapStateToProps = (state, { profID }) => ({
  courseReviews: getProfReviews(state, profID),
  courseInfo: getProfCoursesTaughtInfo(state, profID),
});

const ProfCourseReviews = () => {};

export default connect(mapStateToProps)(ProfCourseReviews);
