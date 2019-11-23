import gql from 'graphql-tag';

export const INSERT_COURSE_REVIEW = gql`
  mutation INSERT_COURSE_REVIEW(
    $user_id: Int,
    $course_id: Int,
    $easy: smallint,
    $liked: smallint,
    $useful: smallint,
    $text: String,
    $public: Boolean
  ) {
    insert_course_review(
      objects: {
        user_id: $user_id,
        course_id: $course_id,
        easy: $easy,
        liked: $liked,
        useful: $useful,
        text: $text,
        public: $public
      }
    ) {
      affected_rows
    }
  }
`;

export const UPDATE_COURSE_REVIEW = gql`
  mutation UPDATE_COURSE_REVIEW(
    $review_id: Int,
    $liked: smallint,
    $easy: smallint,
    $useful: smallint,
    $text: String,
    $public: Boolean
  ) {
    update_course_review(
      where: {id: {_eq: $review_id}},
      _set: {
        easy: $easy,
        liked: $liked,
        useful: $useful,
        text: $text,
        public: $public
      }
    ) {
      affected_rows
    }
  }
`;

export const INSERT_PROF_REVIEW = gql`
  mutation INSERT_PROF_REVIEW(
    $user_id: Int,
    $course_id: Int,
    $prof_id: Int,
    $clear: smallint,
    $engaging: smallint,
    $text: String,
    $public: Boolean
  ) {
    insert_prof_review(
      objects: {
        user_id: $user_id,
        course_id: $course_id,
        prof_id: $prof_id,
        clear: $clear,
        engaging: $engaging,
        text: $text,
        public: $public
      }
    ) {
      affected_rows
    }
  }
`;

export const UPDATE_PROF_REVIEW = gql`
  mutation UPDATE_PROF_REVIEW(
    $review_id: Int,
    $course_id: Int,
    $prof_id: Int,
    $clear: smallint,
    $engaging: smallint,
    $text: String,
    $public: Boolean
  ) {
    update_prof_review(
      where: {id: {_eq: $review_id}},
      _set: {
        course_id: $course_id,
        prof_id: $prof_id,
        clear: $clear,
        engaging: $engaging,
        text: $text,
        public: $public
      }
    ) {
      affected_rows
    }
  }
`;

export const DELETE_REVIEW = gql`
  mutation DELETE_REVIEW($course_review_id: Int, $prof_review_id: Int) {
    delete_course_review(where: {id: {_eq: $course_review_id}}) {
      affected_rows
    }
    delete_prof_review(where: {id: {_eq: $prof_review_id}}) {
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
