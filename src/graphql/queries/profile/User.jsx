import gql from 'graphql-tag';

import UserFragment from "../../fragments/profile/UserFragment.jsx";

export const GET_USER = gql`
  query GET_USER {
    user {
      ...UserInfoFragment
    }
  }
  ${UserFragment.userInfo}
`;
