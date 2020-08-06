import gql from 'graphql-tag';

import ReviewFragment from 'graphql/fragments/ReviewFragment';

export const COURSE_REVIEWS = gql`
  query courseReviews($id: Int) {
    review(
      where: {
        course_id: { _eq: $id }
        _or: [
          { course_comment: { _is_null: false } }
          { prof_comment: { _is_null: false } }
        ]
      }
    ) {
      ...ReviewInfo
      ...ReviewVoteCounts
    }
  }
  ${ReviewFragment.reviewInfo}
  ${ReviewFragment.reviewVoteCounts}
`;

export const COURSE_REVIEWS_WITH_USER_DATA = gql`
  query courseReviewsWithUserData($id: Int) {
    review(
      where: {
        course_id: { _eq: $id }
        _or: [
          { course_comment: { _is_null: false } }
          { prof_comment: { _is_null: false } }
        ]
      }
    ) {
      ...ReviewInfo
      ...ReviewVoteCounts
      ...UserReviewFields
    }
  }
  ${ReviewFragment.reviewInfo}
  ${ReviewFragment.reviewVoteCounts}
  ${ReviewFragment.userReviewFields}
`;

export const REFETCH_COURSE_REVIEW_UPVOTE = gql`
  query refetchCourseReviewUpvote($review_id: Int) {
    review(where: { id: { _eq: $review_id } }) {
      ...ReviewVoteCounts
    }
  }
  ${ReviewFragment.reviewVoteCounts}
`;

export const COURSE_REVIEW_PROFS = gql`
  query courseReviewProfs($id: [Int!]) {
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
