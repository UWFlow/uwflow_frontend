import gql from 'graphql-tag';

const CourseReviewFragment = {
  courseReviewInfo: gql`
    fragment CourseReviewInfoFragment on course_review {
      id
      course {
        id
        code
      }
      easy
      liked
      prof {
        id
        code
        name
      }
      text
      useful
      user {
        id
        full_name
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
  profReviewInfo: gql`
    fragment ProfReviewInfoFragment on prof_review {
      id
      prof {
        id
        code
        name
        course_reviews_aggregate {
          aggregate {
            avg {
              liked
            }
          }
        }
      }
      clear
      engaging
      text
      user {
        id
        full_name
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

export default CourseReviewFragment;
