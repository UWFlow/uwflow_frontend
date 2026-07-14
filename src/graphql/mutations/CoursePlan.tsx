import { gql } from '@apollo/client';

export const INSERT_USER_COURSE_PLAN = gql`
  mutation insertUserCoursePlan(
    $user_id: Int!
    $course_id: Int!
    $term_id: Int!
  ) {
    insert_user_course_plan(
      objects: { user_id: $user_id, course_id: $course_id, term_id: $term_id }
    ) {
      affected_rows
    }
  }
`;

export const DELETE_USER_COURSE_PLAN = gql`
  mutation deleteUserCoursePlan($course_id: Int!, $term_id: Int!) {
    delete_user_course_plan(
      where: { course_id: { _eq: $course_id }, term_id: { _eq: $term_id } }
    ) {
      affected_rows
    }
  }
`;

// Both root fields run in a single Hasura transaction, so a move can't
// half-apply.
export const MOVE_USER_COURSE_PLAN = gql`
  mutation moveUserCoursePlan(
    $user_id: Int!
    $course_id: Int!
    $from_term_id: Int!
    $to_term_id: Int!
  ) {
    delete_user_course_plan(
      where: { course_id: { _eq: $course_id }, term_id: { _eq: $from_term_id } }
    ) {
      affected_rows
    }
    insert_user_course_plan(
      objects: {
        user_id: $user_id
        course_id: $course_id
        term_id: $to_term_id
      }
    ) {
      affected_rows
    }
  }
`;
