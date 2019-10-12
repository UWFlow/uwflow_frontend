import gql from 'graphql-tag';

import CourseFragment from '../../fragments/course/CourseFragment.jsx';

export const EXPLORE_CODE_QUERY = gql`
  query EXPLORE_COURSES($codes: [String]) {
    course(where: { code: { _ilike: $code% } }) {
      ...CourseInfoFragment
    }
  }
  ${CourseFragment.courseInfo}
`;
