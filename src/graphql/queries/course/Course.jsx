import gql from 'graphql-tag';

import CourseFragment from '../../fragments/course/CourseFragment.jsx';

export const GET_COURSE = gql`
  query GET_COURSE($code: String) {
    course(where: { code: { _eq: $code } }) {
      ...CourseInfoFragment
      ...CourseSchedule
    }
  }
  ${CourseFragment.courseInfo}
  ${CourseFragment.courseSchedule}
`;
