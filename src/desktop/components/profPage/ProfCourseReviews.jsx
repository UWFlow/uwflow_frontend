import React from 'react';
import { connect } from 'react-redux';

/* Selectors */
import {
  getProfReviews,
  getProfCoursesTaughtInfo,
} from '../../../data/reducers/ProfReducer';

const mapStateToProps = (state, { profID }) => ({
  profReviews: getProfReviews(state, profID),
  coursesTaughtInfo: getProfCoursesTaughtInfo(state, profID),
});

const ProfCourseReviews = () => {};

export default connect(mapStateToProps)(ProfCourseReviews);
