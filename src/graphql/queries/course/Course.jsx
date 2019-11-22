import gql from 'graphql-tag';

import CourseFragment from '../../fragments/course/CourseFragment.jsx';
import UserFragment from '../../fragments/user/UserFragment.jsx';

export const buildCourseQuery = (fetchUserData = false, userId = null) => {
  return gql`
    query GET_COURSE($code: String) {
      course(where: {code: {_eq: $code}}) {
        ...CourseInfoFragment
        ...CourseScheduleFragment
        ...CourseRequirementsFragment
      }
      course_review_aggregate(where: {course: {code: {_eq: $code}}}) {
        ...CourseReviewAggregateFragment
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
          ...UserCourseReviewFragment
        }
        prof_review(where: {course: {code: {_eq: $code}}, user: {user_id: {_eq: ${userId}}}}) {
          ...UserProfReviewFragment
        }
        user_course_taken(where: {course: {code: {_eq: $code}}, user_id: {_eq: ${userId}}}) {
          term
          course_id
        }
        ` : ''
      }
    }
    ${CourseFragment.courseInfo}
    ${CourseFragment.courseSchedule}
    ${CourseFragment.courseRequirements}
    ${CourseFragment.courseReviewAggregate}
    ${UserFragment.userCourseReview}
    ${UserFragment.userProfReview}
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

export const COURSE_REVIEW_REFETCH_QUERY = gql`
  query COURSE_REVIEW_REFETCH_QUERY($course_id: Int, $user_id: Int) {
    course_review(where: {course_id: {_eq: $course_id}, user: {user_id: {_eq: $user_id}}}) {
      id
      easy
      liked
      useful
      text
      public
      course_id
    }
    course_review_aggregate(where: { course_id: { _eq: $course_id } }) {
      ...CourseReviewAggregateFragment
    }
  }
  ${CourseFragment.courseReviewAggregate}
`;

export const PROF_REVIEW_REFETCH_QUERY = gql`
  query PROF_REVIEW_REFETCH_QUERY($course_id: Int, $user_id: Int) {
    prof_review(where: {course_id: {_eq: $course_id}, user: {user_id: {_eq: $user_id}}}) {
      id
      text
      clear
      engaging
      public
      course_id
      prof_id
    }
  }
`;

export const COURSE_LIKED_REFETCH_QUERY = gql`
  query COURSE_LIKED_REFETCH_QUERY($course_id: Int, $user_id: Int) {
    course_review(where: {course_id: {_eq: $course_id}, user: {user_id: {_eq: $user_id}}}) {
      id
      liked
    }
    course_review_aggregate(where: { course_id: { _eq: $course_id } }) {
      aggregate {
        avg {
          liked
        }
      }
    }
  }
`;
