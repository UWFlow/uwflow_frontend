import gql from 'graphql-tag';

const ProfFragment = {
  profInfo: gql`
    fragment ProfInfoFragment on prof {
      id
      name
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
      course_reviews_aggregate {
        aggregate {
          avg {
            liked
          }
        }
      }
    }
  `,
};

export default ProfFragment;
