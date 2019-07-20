import gql from 'graphql-tag';

const ProfReviewFragment = {
  profCoursesReviewInfo: gql`
    fragment ProfReviewInfoFragment on course_review {
      course {
        code
      }
      easy
      id
      liked
      prof {
        name
      }
      text
      useful
      user {
        name
        program
      }
      course_review_votes_aggregate {
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
