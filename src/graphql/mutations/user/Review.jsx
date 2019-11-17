import gql from 'graphql-tag';

export const INSERT_REVIEW = gql`
  mutation INSERT_REVIEW($user_id: Int, $course_id: Int, $prof_id: Int) {
    insert_course_review(objects: {course_id: $course_id, user_id: $user_id}) {
      affected_rows
    }
    insert_prof_review {
      affected_rows
    }
  }
`;

export const UPDATE_REVIEW = gql`
  mutation UPDATE_REVIEW($$course_id: Int, $prof_id: Int) {
    update_course_review {
      affected_rows
    }
    update_prof_review {
      affected_rows
    }
  }
`;

export const DELETE_REVIEW = gql`
  mutation DELETE_REVIEW($course_id: Int, $prof_id: Int) {
    delete_course_review(where: {course_id: {_eq: $course_id}}) {
      affected_rows
    }
    delete_prof_review(where: {prof_id: {_eq: $prof_id}}) {
      affected_rows
    }  
  }
`;

export const INSERT_LIKED = gql`
  mutation INSERT_LIKED($user_id: Int, $course_id: Int, $liked: Int) {
    insert_course_review(objects: {course_id: $course_id, user_id: $user_id, liked: $liked}) {
      affected_rows
    }
  }
`;

export const UPDATE_LIKED = gql`
  mutation UPDATE_LIKED($course_id: Int, $liked: Int) {
    update_course_review(_set: { liked: $liked }, where:) {
      affected_rows
    }
  }
`;
