import gql from 'graphql-tag';

const ProfReviewFragment = {
  profCoursesReviewInfo: gql`
    fragment ProfReviewInfoFragment on prof_review {
      text
      course {
        id
        name
        course_reviews_aggregate {
          aggregate {
            avg {
              liked
            }
          }
        }
      }
      engaging
      clear
      user {
        name
        program
      }
      prof_review_votes_aggregate {
        aggregate {
          sum {
            vote
          }
        }
      }
    }
  `,
};

export default ProfReviewFragment;
