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
          name
        }
      }
    }
  `,
  courseTerm: gql`
    fragment CourseTermFragment on course {
      id
      sections {
        id
        term
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
  courseReviewAggregate: gql`
  fragment CourseReviewAggregateFragment on course {
    id
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
  courseRequirements: gql`
  fragment CourseRequirementsFragment on course {
    id
    antireqs
    coreqs
    prereqs
    prerequisites {
      prerequisite {
        id
        code
        name
      }
    }
    postrequisites {
      postrequisite {
        id
        code
        name
      }
    }
  }
  `
};

export default CourseFragment;
