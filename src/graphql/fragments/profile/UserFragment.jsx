import gql from 'graphql-tag';

const UserFragment = {
  userInfo: gql`
    fragment UserInfoFragment on user {
      id
      name
      program
    }
  `
};

export default UserFragment;
