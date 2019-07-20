import gql from 'graphql-tag';

import ProfReviewFragment from '../../fragments/prof/ProfReviewFragment.jsx';

export const GET_PROF_REVIEW = gql`
  query GET_PROF_REVIEW($id: Int) {
    course_review(
      where: { course_id: { _eq: $id }, text: { _is_null: false } }
    ) {
      ...ProfReviewInfoFragment
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
  ${ProfReviewFragment.profCoursesReviewInfo}
`;
