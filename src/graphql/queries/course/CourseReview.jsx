import gql from 'graphql-tag';

import ReviewFragment from 'graphql/fragments/ReviewFragment';

export const buildCourseReviewQuery = (loggedIn) => gql`
  query COURSE_REVIEWS($id: Int) {
    review(where: {
      course_id: { _eq: $id },
      _or: [{course_comment: { _is_null: false }}, {prof_comment: {_is_null: false}}],
    }) {
      ...ReviewInfoFragment
      ...ReviewVoteCountsFragment
      ${loggedIn ? `...UserReviewFieldsFragment` : ''}
    }
  }
  ${ReviewFragment.reviewInfo}
  ${ReviewFragment.reviewVoteCounts}
  ${ReviewFragment.userReviewFields}
`;

export const REFETCH_COURSE_REVIEW_UPVOTE = gql`
  query REFETCH_COURSE_REVIEW_UPVOTE($review_id: Int) {
    review(where: { id: { _eq: $review_id } }) {
      ...ReviewVoteCountsFragment
    }
  }
  ${ReviewFragment.reviewVoteCounts}
`;

export const COURSE_REVIEW_PROFS = gql`
  query COURSE_REVIEW_PROFS($id: [Int!]) {
    review(
      where: {
        course_id: { _in: $id }
        prof_id: { _is_null: false }
        prof_comment: { _is_null: false }
      }
    ) {
      ...ReviewProfs
    }
  }
  ${ReviewFragment.reviewProfs}
`;
