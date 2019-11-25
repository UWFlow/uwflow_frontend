import gql from 'graphql-tag';

import ReviewFragment from '../../fragments/ReviewFragment';

export const GET_PROF_REVIEW = gql`
  query GET_PROF_REVIEW($id: Int) {
    review(where: { prof_id: { _eq: $id }, prof_comment: { _is_null: false } }) {
      ...ReviewInfoFragment
      ...ProfReviewVotesFragment
    }
  }
  ${ReviewFragment.reviewInfo}
  ${ReviewFragment.profReviewVotes}
`;
