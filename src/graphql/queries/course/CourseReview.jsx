import gql from 'graphql-tag';

import CourseReviewFragment from '../../fragments/course/CourseReviewFragment.jsx';

export const GET_COURSE_REVIEW = gql`
  query GET_COURSE_REVIEW($id: Int) {
    course_review(where: { id: { _eq: $id } }) {
      ...CourseReviewInfoFragment
    }
    prof_review(where: { course_id: { _eq: $id }, text: { _is_null: false } }) {
      ...ProfReviewInfoFragment
    }
  }
  ${CourseReviewFragment.courseReviewInfo}
  ${CourseReviewFragment.profReviewInfo}
`;
