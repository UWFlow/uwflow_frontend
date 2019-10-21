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
          avg {
            easy
            liked
            useful
          }
          count(columns: liked)
          text_count: count(columns: text)
        }
      }
    }
  `,
  courseTerm: gql`
    fragment CourseTermFragment on course {
      sections {
        term
      }
    }
  `,
  courseSchedule: gql`
    fragment CourseScheduleFragment on course {
      sections {
        id
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
        exams {
          date
          day
          end_seconds
          is_tba
          location
          section_id
          start_seconds
        }
      }
    }
  `,
  courseRequirements: gql`
  fragment CourseRequirementsFragment on course {
    antireqs
    coreqs
    prereqs
    prerequisites {
      course {
        id
        code
        name
      }
    }
    postrequisites {
      course {
        id
        code
        name
      }
    }
  }
  `
};

export default CourseFragment;
