import gql from 'graphql-tag';

import CourseFragment from '../../fragments/course/CourseFragment.jsx';

export const buildCourseQuery = (fetchUserData = false, userId = null) => {
  return gql`
    query GET_COURSE($code: String) {
      course(where: { code: { _eq: $code } }) {
        ...CourseInfoFragment
        ...CourseScheduleFragment
        ...CourseRequirementsFragment
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
        course_review(where: {course: {code: {_eq: $code}}, user: {user_id: {_eq: ${userId}}}}) {
          id
          easy
          liked
          useful
          text
          public
          course {
            profs_teaching {
              prof {
                id,
                name
              }
            }
          }
        }
        prof_review(where: {course: {code: {_eq: $code}}, user: {user_id: {_eq: ${userId}}}}) {
          id
          text
          clear
          engaging
          public
          course_id
          prof {
            id
            name
          }
        }            
        ` : ''
      }
    }
    ${CourseFragment.courseInfo}
    ${CourseFragment.courseSchedule}
    ${CourseFragment.courseRequirements}
  `;
}