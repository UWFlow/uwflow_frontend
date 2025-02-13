import gql from 'graphql-tag';

import ProfFragment from 'graphql/fragments/ProfFragment';

export const GET_PROF = gql`
  query getProf($code: String) {
    prof(where: { code: { _eq: $code } }) {
      ...ProfInfo
      ...ProfCoursesTaught
      ...ProfRating
      ...ProfReviewDistribution
    }
  }
  ${ProfFragment.profInfo}
  ${ProfFragment.profCoursesTaught}
  ${ProfFragment.profRating}
  ${ProfFragment.profReviewDistribution}
`;

export const ONLY_PROF_QUERY = gql`
  query getAllProfs {
    prof(order_by: { name: asc }) {
      ...ProfInfo
    }
  }
  ${ProfFragment.profInfo}
`;
