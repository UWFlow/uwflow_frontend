import gql from 'graphql-tag';

import ProfFragment from '../../fragments/ProfFragment.jsx';

export const GET_PROF = gql`
  query GET_PROF($code: String) {
    prof(where: { code: { _eq: $code } }) {
      ...ProfInfoFragment
      ...ProfCoursesTaughtFragment
      ...ProfRatingFragment
    }
  }
  ${ProfFragment.profInfo}
  ${ProfFragment.profCoursesTaught}
  ${ProfFragment.profRating}
`;
