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
          id
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
        reviews_aggregate {
          aggregate {
            avg {
              liked
            }
          }
        }
        profs_teaching {
          prof {
            id
            code
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
};

export default UserFragment;
