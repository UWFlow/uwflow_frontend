import gql from 'graphql-tag';

import CourseFragment from 'graphql/fragments/CourseFragment';
import ProfFragment from 'graphql/fragments/ProfFragment';
import ReviewFragment from 'graphql/fragments/ReviewFragment';

export const buildCourseQuery = (fetchUserData = false) => {
  return gql`
    query GET_COURSE($code: String, $user_id: Int) {
      course(where: {code: {_eq: $code}}) {
        ...CourseInfoFragment
        ...CourseScheduleFragment
        ...CourseRequirementsFragment
        ...CourseRatingFragment
      }
      ${
        fetchUserData
          ? `user_shortlist(where: {
          user_id: {_eq: $user_id},
          course: {code: {_eq: $code}}
        }) {
          course_id
          user_id
        }
        user_course_taken(where: {course: {code: {_eq: $code}}, user_id: {_eq: $user_id}}) {
          term_id
          course_id
        }
        queue_section_subscribed(where: {section: {course: {code: {_eq: $code}}}, user_id: {_eq: $user_id}}) {
          section_id
          user_id
        }
        review(where: {course: {code: {_eq: $code}}, user: {user_id: {_eq: $user_id}}}) {
          ...ReviewInfoFragment
        }
        user {
          email
        }
        `
          : ''
      }
    }
    ${CourseFragment.courseInfo}
    ${CourseFragment.courseSchedule}
    ${CourseFragment.courseRequirements}
    ${CourseFragment.courseRating}
    ${ReviewFragment.reviewInfo}
  `;
};

export const REFETCH_COURSE_SHORTLIST = gql`
  query REFETCH_COURSE_SHORTLIST($code: String, $user_id: Int) {
    user_shortlist(
      where: { user_id: { _eq: $user_id }, course: { code: { _eq: $code } } }
    ) {
      course_id
      user_id
    }
  }
`;

export const REFETCH_RATINGS = gql`
  query REFETCH_RATINGS($course_id: Int, $prof_id: Int) {
    course(where: { id: { _eq: $course_id } }) {
      ...CourseRatingFragment
    }
    prof(where: { id: { _eq: $prof_id } }) {
      ...ProfRatingFragment
    }
  }
  ${CourseFragment.courseRating}
  ${ProfFragment.profRating}
`;

export const REFETCH_SECTION_SUBSCRIPTIONS = gql`
  query REFETCH_SECTION_SUBSCRIPTIONS($course_id: Int, $user_id: Int) {
    queue_section_subscribed(
      where: {
        section: { course_id: { _eq: $course_id } }
        user_id: { _eq: $user_id }
      }
    ) {
      section_id
      user_id
    }
  }
`;

export const REFETCH_COURSE_REVIEWS = gql`
  query GET_COURSE($code: String, $user_id: Int) {
    review(
      where: {
        course: { code: { _eq: $code } }
        user: { user_id: { _eq: $user_id } }
      }
    ) {
      ...ReviewInfoFragment
    }
  }
  ${ReviewFragment.reviewInfo}
`;
