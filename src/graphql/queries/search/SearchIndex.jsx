import gql from 'graphql-tag';

import CourseFragment from "../../fragments/course/CourseFragment.jsx";
import ProfFragment from '../../fragments/prof/ProfFragment.jsx';

export const GET_SEARCH_INDEX_DATA = gql`
  query GET_SEARCH_INDEX_DATA {
    course {
      ...CourseSearchInfoFragment
    }
    prof {
      ...ProfSearchInfoFragment
    }
  }
  ${CourseFragment.courseSearchInfo}
  ${ProfFragment.profSearchInfo}
`;
