import gql from 'graphql-tag';

const CourseReviewFragment = {
  courseReviewInfo: gql`
    fragment CourseReviewInfoFragment on course_review {
      id
      easy
      liked
      useful
      user {
        id
        program
      }
      text
    }
  `
};

export default CourseReviewFragment;