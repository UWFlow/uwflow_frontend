import gql from 'graphql-tag';

import ReviewFragment from '../../fragments/ReviewFragment';

export const GET_COURSE_REVIEW = gql`
  query GET_COURSE_REVIEW($id: Int) {
    review(where: {
      course_id: { _eq: $id },
      _or: { course_comment: { _is_null: false } }
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
