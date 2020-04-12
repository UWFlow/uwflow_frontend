import gql from 'graphql-tag';

const CourseFragment = {
  courseInfo: gql`
    fragment CourseInfoFragment on course {
      id
      code
      name
      description
      profs_teaching {
        prof {
          id
          code
          name
          rating {
            liked
            comment_count
          }
        }
      }
    }
  `,
  courseTerm: gql`
    fragment CourseTermFragment on course {
      id
      sections {
        id
        term_id
      }
    }
  `,
  courseSchedule: gql`
    fragment CourseScheduleFragment on course {
      id
      sections {
        id
        enrollment_capacity
        enrollment_total
        class_number
        campus
        section_name
        term_id
        meetings {
          days
          start_date
          end_date
          start_seconds
          end_seconds
          location
          prof {
            id
            code
            name
          }
          is_closed
          is_cancelled
          is_tba
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
      id
      antireqs
      prereqs
      coreqs
      postrequisites {
        postrequisite {
          id
          code
          name
        }
      }
    }
  `,
  courseRating: gql`
    fragment CourseRatingFragment on course {
      id
      rating {
        liked
        easy
        useful
        filled_count
        comment_count
      }
    }
  `,
};

export default CourseFragment;
