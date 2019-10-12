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
          name
          code
        }
      }
    }
  `,
  userCoursesTaken: gql`
    fragment UserCoursesTakenFragment on user {
      courses_taken {
        term
        course {
          name
          code
          id
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
  `
};

export default UserFragment;
