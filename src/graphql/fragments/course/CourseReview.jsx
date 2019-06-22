import { gql } from 'graphql-tag';

export const CourseReviewInfoFragment = gql`
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
`;