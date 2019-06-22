import { gql } from 'graphql-tag';

export const CourseInfoFragment = gql`
  fragment CourseInfoFragment on course {
    id
    code
    name
    description
    course_review_stats {
      easy
      liked
      not_easy
      not_liked
      not_useful
      useful
    }
  }
`;

export const ShallowCourseInfoFragment = gql`
  fragment ShallowCourseInfoFragment on course {
    id
    code
    name
  }
`;