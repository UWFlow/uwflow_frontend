import gql from 'graphql-tag';

const ProfReviewFragment = {
  profCoursesReviewInfo: gql`
    fragment ProfReviewInfoFragment on prof_review {
      id
      engaging
      clear
      text
      created_at
      course {
        id
        name
        code
        course_reviews_aggregate {
          aggregate {
            avg {
              liked
            }
          }
        }
      }
      author {
        full_name
        program
        picture_url
      } 
      prof_review_votes {
        user_id
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
