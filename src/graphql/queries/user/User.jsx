import gql from 'graphql-tag';

import UserFragment from "../../fragments/user/UserFragment.jsx";

export const GET_USER = gql`
  query GET_USER($id: Int) {
    user(where: {id: {_eq: $id}}) {
      ...UserInfoFragment
      ...UserShortlistFragment
      ...UserCoursesTakenFragment
      ...UserReviewsFragment
      ...UserScheduleFragment
    }
  }
  ${UserFragment.userInfo}
  ${UserFragment.userShortlist}
  ${UserFragment.userCoursesTaken}
  ${UserFragment.userReviews}
  ${UserFragment.userSchedule}
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
