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
          course: {code: {_eq: $code}}
        }) {
          course_id
          user_id
        }
        course_review(where: {course: {code: {_eq: $code}}, user: {user_id: {_eq: ${userId}}}}) {
          id
          easy
          liked
          useful
          text
          public
          course_id
          prof_id
          course {
            id
            profs_teaching {
              prof {
                id
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
          prof_id
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

export const COURSE_SHORTLIST_REFETCH_QUERY = gql`
  query SHORTLIST_REFETCH_QUERY($course_id: Int, $user_id: Int) {
    user_shortlist(where: {
      user_id: {_eq: $user_id},
      course_id: {_eq: $course_id}
    }) {
      course_id
      user_id
    }
  }
`;

export const COURSE_LIKED_REFETCH_QUERY = gql`
  query COURSE_LIKED_REFETCH_QUERY($code: String, $course_id: Int) {
    course(where: { code: { _eq: $code } }) {
      id
      course_reviews_aggregate {
        aggregate {
          avg {
            liked
          }
          count(columns: liked)
          text_count: count(columns: text)
        }
      }
    }
    course_review(where: {course: {code: {_eq: $code}}}) {
      id
      liked
    }
    course_review_aggregate(where: { course_id: { _eq: $course_id } }) {
      aggregate {
        count(columns: text)
      }
    }
  }
`;
