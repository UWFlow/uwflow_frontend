import gql from 'graphql-tag';

export const INSERT_SECTION_SUBSCRIPTION = gql`
  mutation INSERT_SECTION_SUBSCRIPTION($section_id: Int, $user_id: Int) {
    insert_section_subscription(objects: {section_id: $section_id, user_id: $user_id}) {
      affected_rows
    }
  }
`;

export const DELETE_SECTION_SUBSCRIPTION = gql`
  mutation DELETE_SECTION_SUBSCRIPTION($section_id: Int) {
    delete_section_subscription(where: {section_id: {_eq: $section_id}}) {
      affected_rows
    }
  }
`;
