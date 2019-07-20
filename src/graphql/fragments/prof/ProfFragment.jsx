import gql from 'graphql-tag';

const ProfFragment = {
  profInfo: gql`
    fragment ProfInfoFragment on prof {
      name
      id
      prof_reviews_aggregate {
        aggregate {
          count(columns: text)
        }
      }
      prof_review_stats {
        clear
        engaging
        not_clear
        not_engaging
      }
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
  shallowProfInfo: gql`
    fragment ShallowProfInfoFragment on prof {
      id
      name
    }
  `,
};

export default ProfFragment;
