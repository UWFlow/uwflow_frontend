import gql from 'graphql-tag';

import CourseFragment from '../../fragments/course/CourseFragment.jsx';

export const buildCourseQuery = (fetchUserData = false, userId = null) => {
  return gql`
    query GET_COURSE($code: String) {
      course(where: { code: { _eq: $code } }) {
        ...CourseInfoFragment
        ...CourseSchedule
        ...CourseRequirements
      }
      ${fetchUserData ?
        `user_shortlist(where: {
          user_id: {_eq: ${userId}},
          course: {code: {_eq: $code}}}
        ) {
          user_id
          course {
            code
          }
        }
        course_review(where: {
          user_id: {_eq: ${userId}},
          course: {code: {_eq: $code}}}
        ) {
          id
          user_id
        }` : ''
      }
    }
    ${CourseFragment.courseInfo}
    ${CourseFragment.courseSchedule}
    ${CourseFragment.courseRequirements}
  `;
}