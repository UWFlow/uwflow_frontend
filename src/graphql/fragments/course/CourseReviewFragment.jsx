import gql from 'graphql-tag';

const CourseReviewFragment = {
  courseReviewInfo: gql`
    fragment CourseReviewInfoFragment on course_review {
      id
      easy
      liked
      text
      useful
      updated_at
      course {
        id
        code
      }
      prof {
        id
        code
        name
      }
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
      clear
      engaging
      text
      updated_at
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
