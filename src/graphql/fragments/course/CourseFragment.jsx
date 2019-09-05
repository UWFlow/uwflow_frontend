import gql from 'graphql-tag';

const CourseFragment = {
  courseInfo: gql`
    fragment CourseInfoFragment on course {
      id
      code
      name
      description
      course_reviews_aggregate {
        aggregate {
          count(columns: text)
        }
      }
      antireqs
      coreqs
      textbooks
      sections
      prereqs
    }
  `,
  shallowCourseInfo: gql`
    fragment ShallowCourseInfoFragment on course {
      id
      code
      name
    }
  `,
  courseSchedule: gql`
    fragment CourseSchedule on course {
      sections
    }
  `,
};

export default CourseFragment;
