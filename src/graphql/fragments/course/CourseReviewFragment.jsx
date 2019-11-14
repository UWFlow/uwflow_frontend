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
      author {
        full_name
        program
        picture_url
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
      author {
        full_name
        program
        picture_url
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
