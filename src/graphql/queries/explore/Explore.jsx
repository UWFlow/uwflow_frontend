import gql from 'graphql-tag';

import CourseFragment from '../../fragments/CourseFragment.jsx';
import ProfFragment from '../../fragments/ProfFragment.jsx';
import ReviewFragment from '../../fragments/ReviewFragment.jsx';

import { SEARCH_RESULTS_PER_PAGE, MAX_SEARCH_TERMS } from '../../../constants/Search.jsx';
import { splitCourseCode } from '../../../utils/Misc.jsx';

export const buildExploreCodeQuery = (sort, query) => gql`
  query EXPLORE_COURSE_CODE($course_offset: Int, $prof_offset: Int) {
    course(
      offset: $course_offset,
      limit: ${SEARCH_RESULTS_PER_PAGE},
      order_by: ${sort},
      where: {code: {_ilike: "${query}%"}}
    ) {
      ...CourseInfoFragment
      ...CourseTermFragment
      ...CourseReviewAggregateFragment
    }
    course_aggregate(where: {code: {_ilike: "${query}%"}}) {
      aggregate {
        count
      }
    }
    prof(
      offset: $prof_offset,
      limit: ${SEARCH_RESULTS_PER_PAGE}
      where: {prof_courses: {course: {code: {_ilike: "${query}%"}}}}
    ) {
      ...ProfInfoFragment
      ...ProfCoursesTaughtFragment
      ...ProfReviewsAggregateFragment
    }
    prof_aggregate(where: {prof_courses: {course: {code: {_ilike: "${query}%"}}}}) {
      aggregate {
        count
      }
    }
  }
  ${CourseFragment.courseInfo}
  ${CourseFragment.courseTerm}
  ${ProfFragment.profInfo}
  ${ProfFragment.profCoursesTaught}
  ${ReviewFragment.courseReviewAggregate}
  ${ReviewFragment.profReviewAggregate}
`;

export const buildExploreQuery = (sort, query) => {
  const queryTerms = query
    .replace('-', ' ')
    .split(' ')
    .map(term => splitCourseCode(term))
    .map(term => term.trim())
    .filter(term => term.length > 0)
    .slice(0, MAX_SEARCH_TERMS);

  const courseQueries = queryTerms.map(term => `{_or: [
    {code: {_ilike: "%${term}%"}},
    {name: {_ilike: "%${term}%"}},
    {profs_teaching: {prof: {name: {_ilike: "%${term}%"}}}},
  ]},`);

  const profQueries = queryTerms.map(term => `{_or: [
    {name: {_ilike: "%${term}%"}},
    {prof_courses: {course: {code: {_ilike: "%${term}%"}}}}
    {prof_courses: {course: {name: {_ilike: "%${term}%"}}}}
  ]},`);

  const parsedCourseQuery = `{_and: [
    ${courseQueries.join('')}
  ]}`;

  const parsedProfQuery = `{_and: [
    ${profQueries.join('')}
  ]}`;

  return gql`
    query EXPLORE_ALL($query: String, $course_offset: Int, $prof_offset: Int) {
      course(
        offset: $course_offset,
        limit: ${SEARCH_RESULTS_PER_PAGE},
        order_by: ${sort},
        where: ${parsedCourseQuery}
      ) {
        ...CourseInfoFragment
        ...CourseTermFragment
        ...CourseReviewAggregateFragment
      }
      course_aggregate(where: ${parsedCourseQuery}) {
        aggregate {
          count
        }
      }
      prof(
        offset: $prof_offset,
        limit: ${SEARCH_RESULTS_PER_PAGE}
        where: ${parsedProfQuery}
      ) {
        ...ProfInfoFragment
        ...ProfProfReviewsAggregateFragment
        ...ProfCourseReviewsAggregateFragment
        ...ProfCoursesTaughtFragment
      }
      prof_aggregate(where: ${parsedProfQuery}) {
        aggregate {
          count
        }
      }
    }
    ${CourseFragment.courseInfo}
    ${CourseFragment.courseTerm}
    ${ProfFragment.profInfo}
    ${ProfFragment.profCoursesTaught}
    ${ReviewFragment.courseReviewAggregate}
    ${ReviewFragment.profReviewAggregate}
  `
};
