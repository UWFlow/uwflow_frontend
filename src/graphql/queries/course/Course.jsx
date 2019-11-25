import gql from 'graphql-tag';

import CourseFragment from '../../fragments/CourseFragment.jsx';
import ReviewFragment from '../../fragments/ReviewFragment.jsx';

export const buildCourseQuery = (fetchUserData = false, userId = null) => {
  return gql`
    query GET_COURSE($code: String) {
      course(where: {code: {_eq: $code}}) {
        ...CourseInfoFragment
        ...CourseScheduleFragment
        ...CourseRequirementsFragment
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
        user_course_taken(where: {course: {code: {_eq: $code}}, user_id: {_eq: ${userId}}}) {
          term
          course_id
        }
        review(where: {course: {code: {_eq: $code}}, user: {user_id: {_eq: ${userId}}}}) {
          ...ReviewInfoFragment
        }
        ` : ''
      }
    }
    ${CourseFragment.courseInfo}
    ${CourseFragment.courseSchedule}
    ${CourseFragment.courseRequirements}
    ${ReviewFragment.courseReviewAggregate}
    ${ReviewFragment.reviewInfo}
  `;
}

export const REFETCH_COURSE_SHORTLIST = gql`
  query REFETCH_COURSE_SHORTLIST($course_id: Int, $user_id: Int) {
    user_shortlist(where: {
      user_id: {_eq: $user_id},
      course_id: {_eq: $course_id}
    }) {
      course_id
      user_id
    }
  }
`;

export const REFETCH_REVIEW = gql`
  query COURSE_REVIEW_REFETCH_QUERY($course_id: Int, $user_id: Int) {
    course(where: {id: {_eq: $course_id}}) {
      ...CourseReviewAggregateFragment
    }
    prof(where: {id: {_eq: $prof_id}}) {
      ...ProfReviewAggregateFragment
    }
    review(where: {course_id: {_eq: $course_id}, user: {user_id: {_eq: $user_id}}}) {
      ...ReviewInfoFragment
    }
  }
  ${ReviewFragment.courseReviewAggregate}
  ${ReviewFragment.profReviewAggregate}
  ${ReviewFragment.reviewInfo}
`;

export const REFETCH_LIKED = gql`
  query COURSE_LIKED_REFETCH_QUERY($course_id: Int, $user_id: Int) {
    course(where: {id: {_eq: $course_id}}) {
      ...CourseReviewAggregateFragment
    }
    prof(where: {id: {_eq: $prof_id}}) {
      ...ProfReviewAggregateFragment
    }
    review(where: {course_id: {_eq: $course_id}, user: {user_id: {_eq: $user_id}}}) {
      id
      liked
    }
  }
  ${ReviewFragment.courseReviewAggregate}
  ${ReviewFragment.profReviewAggregate}
`;
