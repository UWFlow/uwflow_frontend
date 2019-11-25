import gql from 'graphql-tag';

import ReviewFragment from '../../fragments/ReviewFragment';

export const GET_COURSE_REVIEW = gql`
  query GET_COURSE_REVIEW($id: Int) {
    review(where: {
      course_id: { _eq: $id },
      course_comment: { _is_null: false }
    }) {
      ...ReviewInfoFragment
      ...CourseReviewVotesFragment
      ...ProfReviewVotesFragment
    }
    review_aggregate(where: { course_id: { _eq: $id } }) {
      ...ReviewAggregateFragment
    }
  }
  ${ReviewFragment.reviewInfo}
  ${ReviewFragment.courseReviewVotes}
  ${ReviewFragment.profReviewVotes}
  ${ReviewFragment.reviewAggregate}
`;

export const REFETCH_COURSE_REVIEW_UPVOTE = gql`
  query REFETCH_COURSE_REVIEW_UPVOTE($review_id: Int) {
    review(where: {id: {_eq: $review_id}}) {
      ...CourseReviewVotesFragment
    }
  }
  ${ReviewFragment.courseReviewVotes}
`;
