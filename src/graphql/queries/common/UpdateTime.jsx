import gql from 'graphql-tag';

export const UPDATE_TIME_QUERY = gql`
  query UPDATE_TIME_QUERY {
    update_time {
      time
      term_id
    }
  }
`;
