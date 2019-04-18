import React from 'react';
import { connect } from 'react-redux';

/* Selectors */
import {
  getProfReviews,
  getProfCoursesTaughtInfo,
} from '../../../data/reducers/ProfReducer';

const mapStateToProps = (state, { profID, courseID }) => ({
  profReviews: getProfReviews(state, profID),
  coursesTaughtInfo: getProfCoursesTaughtInfo(state, profID),
});

const ProfCourseReview = () => {};

export default connect(mapStateToProps)(ProfCourseReview);
