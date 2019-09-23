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
      sections {
        enrollment_capacity
        enrollment_total
        class_number
        campus
        section
        term
        meetings {
          days
          start_date
          end_date
          start_seconds
          end_seconds
          location
          prof {
            id
            name
          }
          is_closed
          is_cancelled
        }
      }
      id
    }
  `,
};

export default CourseFragment;
