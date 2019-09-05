import gql from 'graphql-tag';

import CourseFragment from '../../fragments/course/CourseFragment.jsx';

export const GET_COURSE = gql`
  query GET_COURSE($id: Int) {
    course(where: { id: { _eq: $id } }) {
      ...CourseInfoFragment
    }
    aggregate_course_easy_buckets_aggregate(
      where: { course_id: { _eq: $id } }
    ) {
      aggregate {
        avg {
          easy
        }
      }
    }
    aggregate_course_liked_buckets_aggregate(
      where: { course_id: { _eq: $id }, liked: { _is_null: false } }
    ) {
      aggregate {
        avg {
          liked
        }
        sum {
          count
        }
      }
    }
    aggregate_course_useful_buckets_aggregate(
      where: { course_id: { _eq: $id } }
    ) {
      aggregate {
        avg {
          useful
        }
      }
    }
  }
  ${CourseFragment.courseInfo}
`;

export const GET_ALL_COURSES_SHALLOW = gql`
  query GET_ALL_COURSES_SHALLOW {
    course {
      ...ShallowCourseInfoFragment
    }
  }
  ${CourseFragment.shallowCourseInfo}
`;

export const GET_COURSE_SCHEDULE = gql`
  query GET_COURSE_SCHEDULE($id: Int) {
    course(where: { id: { _eq: $id } }) {
      ...CourseSchedule
    }
  }
  ${CourseFragment.courseSchedule}
`;
