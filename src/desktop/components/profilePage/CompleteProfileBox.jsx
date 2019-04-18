import React from 'react';
import { connect } from 'react-redux';
import {
  getCoursesReviewed,
  getProfsReviewed,
  getUserCoursesTakenInfo,
} from '../../../data/reducers/UserReducer';

const mapStateToProps = state => ({
  coursesReviewed: getCoursesReviewed(state),
  profsReviewed: getProfsReviewed(state),
  coursesTakenInfo: getUserCoursesTakenInfo(state),
});

const CompleteProfileBox = ({
  coursesReviewed,
  profsReviewed,
  coursesTakenInfo,
}) => {
  return <>Complete Profile Box</>;
};

export default connect(mapStateToProps)(CompleteProfileBox);
