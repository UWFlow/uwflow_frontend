import gql from 'graphql-tag';

import ProfReviewFragment from '../../fragments/prof/ProfReviewFragment.jsx';

export const GET_PROF_REVIEW = gql`
  query GET_PROF_REVIEW($id: Int) {
    prof_review(where: { prof_id: { _eq: $id }, text: { _is_null: false } }) {
      ...ProfReviewInfoFragment
    }
  }
  ${ProfReviewFragment.profCoursesReviewInfo}
`;
