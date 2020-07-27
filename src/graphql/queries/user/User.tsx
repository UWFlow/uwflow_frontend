import gql from 'graphql-tag';

import ReviewFragment from 'graphql/fragments/ReviewFragment';
import UserFragment from 'graphql/fragments/UserFragment';

// review and course taken were split up to improve Apollo cache performance
// this way when refetching reviews when a review is updated, the data structure
// is consistent across course, prof and profile pages for fast updates
export const GET_USER = gql`
  query GET_USER($id: Int) {
    user(where: { id: { _eq: $id } }) {
      ...UserInfoFragment
      ...UserShortlistFragment
      ...UserScheduleFragment
    }
    user_course_taken(where: { user_id: { _eq: $id } }) {
      ...UserCoursesTakenFragment
    }
    review(where: { user: { user_id: { _eq: $id } } }) {
      ...ReviewInfoFragment
    }
  }
  ${UserFragment.userInfo}
  ${UserFragment.userShortlist}
  ${UserFragment.userSchedule}
  ${UserFragment.userCoursesTaken}
  ${ReviewFragment.reviewInfo}
`;

export const REFETCH_USER_SHORTLIST = gql`
  query REFETCH_USER_SHORTLIST($id: Int) {
    user(where: { id: { _eq: $id } }) {
      id
      ...UserShortlistFragment
    }
  }
  ${UserFragment.userShortlist}
`;

export const REFETCH_USER_REVIEW = gql`
  query REFETCH_USER_REVIEW($id: Int) {
    review(where: { user: { user_id: { _eq: $id } } }) {
      ...ReviewInfoFragment
    }
  }
  ${ReviewFragment.reviewInfo}
`;
