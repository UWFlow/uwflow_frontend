import { gql } from '@apollo/client';

export const CREATE_GROUP = gql`
  mutation createGroup($name: String!) {
    insert_shared_group(
      objects: { name: $name, members: { data: [{ status: "member" }] } }
    ) {
      returning {
        id
        name
      }
    }
  }
`;

export const ACCEPT_INVITE = gql`
  mutation acceptInvite($groupId: Int!, $userId: Int!) {
    update_shared_group_member(
      where: {
        group_id: { _eq: $groupId }
        user_id: { _eq: $userId }
        status: { _eq: "pending" }
      }
      _set: { status: "member" }
    ) {
      affected_rows
    }
  }
`;

export const DECLINE_INVITE = gql`
  mutation declineInvite($groupId: Int!, $userId: Int!) {
    delete_shared_group_member(
      where: {
        group_id: { _eq: $groupId }
        user_id: { _eq: $userId }
        status: { _eq: "pending" }
      }
    ) {
      affected_rows
    }
  }
`;

export const LEAVE_GROUP = gql`
  mutation leaveGroup($groupId: Int!, $userId: Int!) {
    delete_shared_group_member(
      where: { group_id: { _eq: $groupId }, user_id: { _eq: $userId } }
    ) {
      affected_rows
    }
  }
`;

export const DELETE_GROUP = gql`
  mutation deleteGroup($groupId: Int!) {
    delete_shared_group(where: { id: { _eq: $groupId } }) {
      affected_rows
    }
  }
`;
