import gql from 'graphql-tag';

import ProfFragment from '../../fragments/ProfFragment.jsx';
import ReviewFragment from '../../fragments/ReviewFragment.jsx';

export const GET_PROF = gql`
  query GET_PROF($code: String) {
    prof(where: { code: { _eq: $code } }) {
      ...ProfInfoFragment
      ...ProfCoursesTaughtFragment
      ...ProfReviewAggregateFragment
    }
  }
  ${ProfFragment.profInfo}
  ${ProfFragment.profCoursesTaught}
  ${ReviewFragment.profReviewAggregate}
`;
