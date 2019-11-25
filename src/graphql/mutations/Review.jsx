import gql from 'graphql-tag';

export const UPSERT_REVIEW = gql`
  mutation UPSERT_REVIEW(
    $user_id: Int,
    $course_id: Int,
    $prof_id: Int,
    $liked: smallint
    $easy: smallint,
    $useful: smallint,
    $clear: smallint,
    $engaging: smallint,
    $course_comment: String,
    $prof_comment: String,
    $public: Boolean
  ) {
    upsert_review(
      objects: {
        user_id: $user_id,
        course_id: $course_id,
        prof_id: $prof_id
        liked: $liked,
        course_easy: $easy,
        course_useful: $useful,
        course_comment: $course_comment,
        prof_clear: $clear,
        prof_engaging: $engaging,
        prof_comment: $prof_comment,
        public: $public
      }
    ) {
      affected_rows
    }
  }
`;

export const DELETE_REVIEW = gql`
  mutation DELETE_REVIEW($review_id: Int) {
    delete_review(where: {id: {_eq: $review_id}}) {
      affected_rows
    }
  }
`;

export const INSERT_LIKED_REVIEW = gql`
  mutation INSERT_LIKED_REVIEW(
    $user_id: Int,
    $course_id: Int,
    $liked: smallint,
    $public: Boolean
  ) {
    insert_course_review(
      objects: {
        user_id: $user_id,
        course_id: $course_id,
        prof_id: null,
        easy: null,
        liked: $liked,
        useful: null,
        text: null,
        public: $public
      }
    ) {
      affected_rows
    }
  }
`;

export const UPDATE_LIKED = gql`
  mutation UPDATE_LIKED($review_id: Int, $liked: smallint) {
    update_course_review(_set: { liked: $liked }, where: {id: {_eq: $review_id}}) {
      affected_rows
    }
  }
`;
