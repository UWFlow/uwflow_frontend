import gql from 'graphql-tag';

import CourseFragment from '../../fragments/course/CourseFragment.jsx';
import ProfFragment from '../../fragments/prof/ProfFragment.jsx';

import { SEARCH_RESULTS_PER_PAGE } from '../../../constants/Search.jsx';

export const buildExploreCodeQuery = (sort) => {

  return gql`
    query EXPLORE_COURSE_CODE($query: String, $course_offset: Int, $prof_offset: Int) {
      course(
        offset: $course_offset,
        limit: ${SEARCH_RESULTS_PER_PAGE},
        order_by: ${sort},
        where: {code: {_ilike: $query}}
      ) {
        ...CourseInfoFragment
      }
      course_aggregate(where: {code: {_ilike: $query}}) {
        aggregate {
          count
        }
      }
      prof(
        offset: $prof_offset,
        limit: ${SEARCH_RESULTS_PER_PAGE}
        where: {prof_courses: {course: {code: {_ilike: $query}}}}
      ) {
        ...ProfInfoFragment
        ...ProfCourseReviewsAggregateFragment
      }
      prof_aggregate(where: {prof_courses: {course: {code: {_ilike: $query}}}}) {
        aggregate {
          count
        }
      }  
    }
    ${CourseFragment.courseInfo}
    ${ProfFragment.profInfo}
    ${ProfFragment.profCourseReviewsAggregate}  
  `
};

export const buildExploreQuery = (sort) => {

  return gql`
    query EXPLORE_ALL($query: String, $course_offset: Int, $prof_offset: Int) {
      course(
        offset: $course_offset,
        limit: ${SEARCH_RESULTS_PER_PAGE},
        order_by: ${sort},
        where: {_or: [
          {code: {_ilike: $query}},
          {name: {_ilike: $query}},
          {profs_teaching: {prof: {name: {_ilike: $query}}}}
        ]}
      ) {
        ...CourseInfoFragment
      }
      course_aggregate(where: {_or: [
        {code: {_ilike: $query}},
        {name: {_ilike: $query}},
        {profs_teaching: {prof: {name: {_ilike: $query}}}}
      ]}) {
        aggregate {
          count
        }
      }
      prof(
        offset: $prof_offset,
        limit: ${SEARCH_RESULTS_PER_PAGE}
        where: {_or: [
          {name: {_ilike: $query}},
          {prof_courses: {course: {code: {_ilike: $query}}}}
          {prof_courses: {course: {name: {_ilike: $query}}}}
        ]}
      ) {
        ...ProfInfoFragment
        ...ProfCourseReviewsAggregateFragment
      }
      prof_aggregate(where: {_or: [
        {name: {_ilike: $query}},
        {prof_courses: {course: {code: {_ilike: $query}}}}
        {prof_courses: {course: {name: {_ilike: $query}}}}
      ]}) {
        aggregate {
          count
        }
      }
    }
    ${CourseFragment.courseInfo}
    ${ProfFragment.profInfo}
    ${ProfFragment.profCourseReviewsAggregate}
  `
};
