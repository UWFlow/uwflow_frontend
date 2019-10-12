import gql from 'graphql-tag';

const ProfFragment = {
  profInfo: gql`
    fragment ProfInfoFragment on prof {
      name
      id
      course_reviews_aggregate {
        aggregate {
          avg {
            liked
          }
          count(columns: liked)
        }
      }
    }
  `,
  profReviewsAggregate: gql`
    fragment ProfReviewsAggregateFragment on prof {
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
          count(columns: liked)
        }
      }
    }
  `,
};

export default ProfFragment;
