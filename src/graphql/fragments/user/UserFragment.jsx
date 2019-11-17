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
          profs_teaching {
            prof {
              id,
              name
            }
          }
          sections {
            id
            term
            exams {
              date
              day
              end_seconds
              is_tba
              location
              section_id
              start_seconds
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
        easy
        liked
        useful
        text
        public
        course_id
        prof_id
      }
      prof_reviews {
        id
        clear
        engaging
        text
        public
        course_id
        prof_id
        prof {
          id
          name
        }
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
