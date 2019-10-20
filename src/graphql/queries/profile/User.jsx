import gql from 'graphql-tag';

import UserFragment from "../../fragments/profile/UserFragment.jsx";

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
