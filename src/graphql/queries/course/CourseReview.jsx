import gql from 'graphql-tag';

import CourseReviewFragment from '../../fragments/course/CourseReviewFragment.jsx';

export const GET_COURSE_REVIEW = gql`
  query GET_COURSE_REVIEW($id: Int) {
    course_review(
      where: { course_id: { _eq: $id }, text: { _is_null: false } }
    ) {
      ...CourseReviewInfoFragment
    }
    course_review_aggregate(where: { course_id: { _eq: $id } }) {
      aggregate {
        count(columns: text)
      }
    }
    prof_review(where: { course_id: { _eq: $id }, text: { _is_null: false } }) {
      ...ProfReviewInfoFragment
    }
    prof_review_aggregate(where: { course_id: { _eq: $id } }) {
      aggregate {
        count(columns: text)
      }
    }
  }
  ${CourseReviewFragment.courseReviewInfo}
  ${CourseReviewFragment.profReviewInfo}
`;
