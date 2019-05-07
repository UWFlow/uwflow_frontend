import React from 'react';
import { connect } from 'react-redux';

/* Selectors */
import { getProfCourseReviews } from '../../../data/reducers/ProfReducer';
import { getCourseInfo } from '../../../data/reducers/CourseReducer';

/* Styled Components */
import {
  ProfCourseReviewWrapper,
  CourseInfoWrapper,
  CourseInfo,
  CourseRatingsWrapper,
  CourseLikes,
  CourseRatings,
} from './styles/ProfCourseReview';

const mapStateToProps = (state, { profID, courseID }) => ({
  profCourseReviews: getProfCourseReviews(state, profID, courseID),
  courseInfo: getCourseInfo(state, courseID),
});

const ProfCourseReview = ({ courseInfo, profCourseReview }) => {};

export default connect(mapStateToProps)(ProfCourseReview);
