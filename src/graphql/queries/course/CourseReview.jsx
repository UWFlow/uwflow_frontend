import gql from 'graphql-tag';

import CourseReviewFragment from "../../fragments/course/CourseReviewFragment.jsx";

export const GET_COURSE_REVIEW = gql`
  query GET_COURSE_REVIEW($courseID: Int) {
    course_review(where: {course_id: {_eq: $courseID}}) {
      ...CourseReviewInfoFragment
    }
  }
  ${CourseReviewFragment.courseReviewInfo}
;`
