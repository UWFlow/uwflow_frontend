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
      id
      shortlist {
        course_id
        user_id
        course {
          code
          name
        }
      }
    }
  `,
  userSchedule: gql`
    fragment UserScheduleFragment on user {
      id
      schedule {
        user_id
        section_id
        section {
          id
          campus
        }
      }
    }
  `,
  userCoursesTaken: gql`
    fragment UserCoursesTakenFragment on user_course_taken {
      term
      course_id
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
            id
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
  `,
  userCourseReview: gql`
    fragment UserCourseReviewFragment on course_review {
      id
      easy
      liked
      useful
      text
      public
      course_id
    }
  `,
  userProfReview: gql`
  fragment UserProfReviewFragment on prof_review {
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
  `
};

export default UserFragment;
