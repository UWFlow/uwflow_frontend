import gql from 'graphql-tag';

import CourseFragment from '../../fragments/course/CourseFragment.jsx';
import ProfFragment from '../../fragments/prof/ProfFragment.jsx';

import { SEARCH_RESULTS_PER_PAGE } from '../../../constants/Search.jsx';

export const EXPLORE_COURSE_CODE_QUERY = gql`
  query EXPLORE_COURSE_CODE($code: String, $sort: String, $offset: Int) {
    course(
      limit: ${SEARCH_RESULTS_PER_PAGE},
      offset: $offset,
      order_by: {
        course_reviews_aggregate: {
          avg: {
            liked: asc
          }
        }
      },
      where: {code: { _ilike: $code${'%'} } }
    ) {
      ...CourseInfoFragment
    }
  }
  ${CourseFragment.courseInfo}
`;

export const EXPLORE_PROF_COURSE_CODE_QUERY = gql`
  query EXPLORE_PROFS_COURSE_CODE($code: String, $sort: String, $offset: Int) {
    prof(
      limit: ${SEARCH_RESULTS_PER_PAGE},
      offset: $offset,
      order_by: {
        course_reviews_aggregate: {
          avg: {
            liked: asc
          }
        }
      },
      where: {prof_courses: {course: {code: { _ilike: $code${'%'} } }
    ) {
      ...ProfInfoFragment
    }
  }
  ${ProfFragment.profInfo}
`;

export const EXPLORE_COURSES_QUERY = gql`
  query EXPLORE_ALL($query: String, $sort: String, $offset: Int) {
    course(
      limit: ${SEARCH_RESULTS_PER_PAGE},
      offset: $offset,
      order_by: {
        course_reviews_aggregate: {
          avg: {
            liked: asc
          }
        }
      },
      where: {_or: [
        {code: {_ilike: "${'%'}$query${'%'}"}},
        {name: {_ilike: "${'%'}$query${'%'}"}},
        {profs_teaching: {prof: {name: {_ilike: "${'%'}$query${'%'}"}}
      ]}
    ) {
      ...CourseInfoFragment
    }
  }
  ${CourseFragment.courseInfo}
`;

export const EXPLORE_PROFS_QUERY = gql`
  query EXPLORE_ALL($query: String, $sort: String, $offset: Int) {
    prof(
      limit: ${SEARCH_RESULTS_PER_PAGE},
      offset: $offset,
      order_by: {
        prof_reviews_aggregate: {
          avg: {
            liked: asc
          }
        }
      },
      where: {_or: [
        {name: {_ilike: "${'%'}$query${'%'}"}},
        {prof_courses: {course: {code: {_ilike: "${'%'}$query${'%'}"}}}}
        {prof_courses: {course: {name: {_ilike: "${'%'}$query${'%'}"}}}}
      ]}
    ) {
      ...ProfInfoFragment
    }
  }
  ${ProfFragment.profInfo}
`;