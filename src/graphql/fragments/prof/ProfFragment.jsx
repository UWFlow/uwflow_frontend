import gql from 'graphql-tag';

const ProfFragment = {
  profInfo: gql`
    fragment ProfInfoFragment on prof {
      id
      name
      code
    }
  `,
  profProfReviewsAggregate: gql`
    fragment ProfProfReviewsAggregateFragment on prof {
      id
      prof_reviews_aggregate {
        aggregate {
          avg {
            clear
            engaging
          }
          count
          text_count: count(columns: text)
        }
      }
    }
  `,
  profCourseReviewsAggregate: gql`
    fragment ProfCourseReviewsAggregateFragment on prof {
      id
      course_reviews_aggregate {
        aggregate {
          avg {
            liked
          }
        }
      }
    }
  `,
  profCoursesTaught: gql`
    fragment ProfCoursesTaughtFragment on prof {
      id
      prof_courses {
        course {
          id
          code
        }
      }
    }
  `
};

export default ProfFragment;
