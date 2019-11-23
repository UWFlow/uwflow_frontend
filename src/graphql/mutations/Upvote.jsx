import gql from 'graphql-tag';

export const INSERT_COURSE_REVIEW_VOTE = gql`
  mutation INSERT_COURSE_REVIEW_VOTE(
    $user_id: Int,
    $review_id: Int
  ) {
    insert_course_review_vote(objects: {review_id: $review_id, user_id: $user_id, vote: 1}) {
      affected_rows
    }
  }
`;

export const DELETE_COURSE_REVIEW_VOTE = gql`
  mutation DELETE_COURSE_REVIEW_VOTE(
    $user_id: Int,
    $review_id: Int
  ) {
    delete_course_review_vote(where: {user_id: {_eq: $user_id}, review_id: {_eq: $review_id}}) {
      affected_rows
    }
  }
`;

export const INSERT_PROF_REVIEW_VOTE = gql`
  mutation INSERT_PROF_REVIEW_VOTE(
    $user_id: Int,
    $review_id: Int
  ) {
    insert_prof_review_vote(objects: {review_id: $review_id, user_id: $user_id, vote: 1}) {
      affected_rows
    }
  }
`;

export const DELETE_PROF_REVIEW_VOTE = gql`
  mutation DELETE_PROF_REVIEW_VOTE(
    $user_id: Int,
    $review_id: Int
  ) {
    delete_prof_review_vote(where: {user_id: {_eq: $user_id}, review_id: {_eq: $review_id}}) {
      affected_rows
    }
  }
`;
