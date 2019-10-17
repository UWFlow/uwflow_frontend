import gql from 'graphql-tag';

import ProfFragment from '../../fragments/prof/ProfFragment.jsx';

export const GET_PROF = gql`
  query GET_PROF($id: Int) {
    prof(where: { id: { _eq: $id } }) {
      ...ProfInfoFragment
      ...ProfCourseReviewsAggregateFragment
    }
  }
  ${ProfFragment.profInfo}
  ${ProfFragment.profCourseReviewsAggregate}
`;
