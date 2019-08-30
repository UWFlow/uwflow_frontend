import gql from 'graphql-tag';

const UserFragment = {
  userInfo: gql`
    fragment UserInfoFragment on user {
      id
      full_name
      program
    }
  `
};

export default UserFragment;
