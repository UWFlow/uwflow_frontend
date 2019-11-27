import gql from 'graphql-tag';

import ReviewFragment from '../../fragments/ReviewFragment';

export const buildCourseReviewQuery = (loggedIn) => gql`
  query COURSE_REVIEWS($id: Int) {
    review(where: {
      course_id: { _eq: $id },
      course_comment: { _is_null: false }
    }) {
      ...ReviewInfoFragment
      ...ReviewVoteCountsFragment
      ${loggedIn ? `...UserReviewFieldsFragment` : ''}
    }
    review_aggregate(where: { course_id: { _eq: $id } }) {
      ...ReviewAggregateFragment
    }
  }
  ${ReviewFragment.reviewInfo}
  ${ReviewFragment.reviewVoteCounts}
  ${ReviewFragment.reviewAggregate}
  ${ReviewFragment.userReviewFields}
`;

export const REFETCH_COURSE_REVIEW_UPVOTE = gql`
  query REFETCH_COURSE_REVIEW_UPVOTE($review_id: Int) {
    review(where: {id: {_eq: $review_id}}) {
      ...ReviewVoteCountsFragment
    }
  }
  ${ReviewFragment.reviewVoteCounts}
`;
