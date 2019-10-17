import gql from 'graphql-tag';

import CourseFragment from '../../fragments/course/CourseFragment.jsx';

export const GET_COURSE = gql`
  query GET_COURSE($code: String) {
    course(where: { code: { _eq: $code } }) {
      ...CourseInfoFragment
      ...CourseSchedule
      ...CourseRequirements
    }
  }
  ${CourseFragment.courseInfo}
  ${CourseFragment.courseSchedule}
  ${CourseFragment.courseRequirements}
`;
