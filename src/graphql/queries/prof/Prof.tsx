import gql from 'graphql-tag';

import ProfFragment from 'graphql/fragments/ProfFragment';

export const GET_PROF = gql`
  query getProf($code: String) {
    prof(where: { code: { _eq: $code } }) {
      ...ProfInfo
      ...ProfCoursesTaught
      ...ProfRating
    }
  }
  ${ProfFragment.profInfo}
  ${ProfFragment.profCoursesTaught}
  ${ProfFragment.profRating}
`;

export const ONLY_PROF_QUERY = gql`
  query getAllProfs {
    prof(order_by: { name: asc }) {
      ...ProfInfo
    }
  }
  ${ProfFragment.profInfo}
`;
