import gql from 'graphql-tag';

import ProfFragment from '../../fragments/prof/ProfFragment.jsx';

export const GET_PROF = gql`
  query GET_PROF($code: String) {
    prof(where: { code: { _eq: $code } }) {
      ...ProfInfoFragment
      ...ProfProfReviewsAggregateFragment
      ...ProfCourseReviewsAggregateFragment
      ...ProfCoursesTaughtFragment
    }
  }
  ${ProfFragment.profInfo}
  ${ProfFragment.profProfReviewsAggregate}
  ${ProfFragment.profCourseReviewsAggregate}
  ${ProfFragment.profCoursesTaught}
`;
