import { gql } from '@apollo/client';

import SharedGroupFragment from 'graphql/fragments/SharedGroupFragment';

export const LIST_GROUPS = gql`
  query listGroups($userId: Int!) {
    shared_group(order_by: { created_at: desc }) {
      ...GroupSummary
    }
  }
  ${SharedGroupFragment.groupSummary}
`;
