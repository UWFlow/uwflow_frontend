import { gql } from '@apollo/client';

const SharedGroupFragment = {
  groupSummary: gql`
    fragment GroupSummary on shared_group {
      id
      name
      members(where: { user_id: { _eq: $userId } }) {
        status
      }
      members_aggregate(where: { status: { _eq: "member" } }) {
        aggregate {
          count
        }
      }
    }
  `,
};

export default SharedGroupFragment;
