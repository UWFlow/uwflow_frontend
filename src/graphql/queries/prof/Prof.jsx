import gql from 'graphql-tag';

import ProfFragment from '../../fragments/prof/ProfFragment.jsx';

export const GET_PROF = gql`
  query GET_PROF($id: Int) {
    prof(where: { id: { _eq: $id } }) {
      ...ProfInfoFragment
    }
    prof_review_aggregate(where: { id: { _eq: $id } }) {
      ...ProfReviewAggregateFragment
    }
  }
  ${ProfFragment.profInfo}
  ${ProfFragment.profReviewAggregate}
`;

export const GET_ALL_PROFS_SHALLOW = gql`
  query GET_ALL_PROFS_SHALLOW {
    course {
      ...ShallowProfInfoFragment
    }
  }
  ${ProfFragment.shallowProfInfo}
`;
