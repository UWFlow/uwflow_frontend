import gql from 'graphql-tag';

import ReviewFragment from '../../fragments/ReviewFragment';

export const buildProfReviewQuery = loggedIn => gql`
  query PROF_REVIEWS($id: Int) {
    review(where: { prof_id: { _eq: $id }, prof_comment: { _is_null: false } }) {
      ...ReviewInfoFragment
      ...ReviewVoteCountsFragment
      ${loggedIn ? `...UserReviewFieldsFragment` : ''}
    }
  }
  ${ReviewFragment.reviewInfo}
  ${ReviewFragment.reviewVoteCounts}
  ${ReviewFragment.userReviewFields}
`;

export const REFETCH_PROF_REVIEW_UPVOTE = gql`
  query REFETCH_PROF_REVIEW_UPVOTE($review_id: Int) {
    review(where: { id: { _eq: $review_id } }) {
      ...ReviewVoteCountsFragment
    }
  }
  ${ReviewFragment.reviewVoteCounts}
`;
