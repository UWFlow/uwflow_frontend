import gql from 'graphql-tag';

import UserFragment from "../../fragments/user/UserFragment.jsx";

// review and course taken were split up to improve Apollo cache performance
// this way when refetching reviews when a review is updated, the data structure
// is consistent across course, prof and profile pages for fast updates
export const GET_USER = gql`
  query GET_USER($id: Int) {
    user(where: {id: {_eq: $id}}) {
      ...UserInfoFragment
      ...UserShortlistFragment
      ...UserScheduleFragment
    }
    course_review(where: {user: {user_id: {_eq: $id}}}) {
      ...UserCourseReviewFragment
    }
    prof_review(where: {user: {user_id: {_eq: $id}}}) {
      ...UserProfReviewFragment
    }
    user_course_taken(where: {user_id: {_eq: $id}}) {
      ...UserCoursesTakenFragment
    }
  }
  ${UserFragment.userInfo}
  ${UserFragment.userShortlist}
  ${UserFragment.userSchedule}
  ${UserFragment.userCoursesTaken}
  ${UserFragment.userCourseReview}
  ${UserFragment.userProfReview}
`;

export const USER_SHORTLIST_REFETCH_QUERY = gql`
  query GET_USER_SHORTLIST($id: Int) {
    user(where: {id: {_eq: $id}}) {
      id
      ...UserShortlistFragment
    }
  }
  ${UserFragment.userShortlist}
`;
