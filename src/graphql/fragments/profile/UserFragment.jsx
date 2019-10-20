import gql from 'graphql-tag';

const UserFragment = {
  userInfo: gql`
    fragment UserInfoFragment on user {
      id
      full_name
      program
      picture_url
    }
  `,
  userShortlist: gql`
    fragment UserShortlistFragment on user {
      shortlist {
        course {
          id
          code
          name
        }
      }
    }
  `,
  userCoursesTaken: gql`
    fragment UserCoursesTakenFragment on user {
      courses_taken {
        term
        course {
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
      }
    }
  `,
  userReviews: gql`
    fragment UserReviewsFragment on user {
      course_reviews {
        id
        course_id
        prof_id
        easy
        liked
        useful
        text  
      }
      prof_reviews {
        id
        course_id
        prof_id
        clear
        engaging
        text
      }
    }
  `,
  userSchedule: gql`
    fragment UserScheduleFragment on user {
      schedule {
        user_id,
        section_id,
        section {
          id,
          campus
        }
      }
    }
  `
};

export default UserFragment;
