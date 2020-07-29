import gql from 'graphql-tag';

import ProfFragment from 'graphql/fragments/ProfFragment';

export const GET_PROF = gql`
  query GET_PROF($code: String) {
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
