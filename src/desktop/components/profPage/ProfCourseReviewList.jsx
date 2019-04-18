import React from 'react';
import { connect } from 'react-redux';

/* Selectors */
import { getProfCoursesTaught } from '../../../data/reducers/ProfReducer';

const mapStateToProps = (state, { profID }) => ({
  coursesTaught: getProfCoursesTaught(state, profID),
});

const ProfCourseReviewList = () => {};

export default connect(mapStateToProps)(ProfCourseReviewList);
