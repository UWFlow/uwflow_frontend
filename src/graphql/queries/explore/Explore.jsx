import gql from 'graphql-tag';

import CourseFragment from '../../fragments/CourseFragment.jsx';
import ProfFragment from '../../fragments/ProfFragment.jsx';

import { MAX_SEARCH_TERMS } from '../../../constants/Search.jsx';
import { formatCourseCode } from '../../../utils/Misc.jsx';

export const buildExploreCodeQuery = (query = '') => gql`
  query EXPLORE_COURSE_CODE {
    course(where: {code: {_ilike: "${query}%"}}) {
      ...CourseInfoFragment
      ...CourseTermFragment
      ...CourseRatingFragment
    }
    prof(where: {prof_courses: {course: {code: {_ilike: "${query}%"}}}}) {
      ...ProfInfoFragment
      ...ProfCoursesTaughtFragment
      ...ProfRatingFragment
    }
  }
  ${CourseFragment.courseInfo}
  ${CourseFragment.courseTerm}
  ${CourseFragment.courseRating}
  ${ProfFragment.profInfo}
  ${ProfFragment.profCoursesTaught}
  ${ProfFragment.profRating}
`;

export const buildExploreQuery = (query = '') => {
  const queryTerms = query
    .replace('-', ' ')
    .split(' ')
    .map(term => formatCourseCode(term))
    .map(term => term.trim())
    .filter(term => term.length > 0)
    .slice(0, MAX_SEARCH_TERMS);

  const courseQueries = queryTerms.map(
    term => `{_or: [
    {code: {_ilike: "%${term}%"}},
    {name: {_ilike: "%${term}%"}},
    {profs_teaching: {prof: {name: {_ilike: "%${term}%"}}}},
  ]},`,
  );

  const profQueries = queryTerms.map(
    term => `{_or: [
    {name: {_ilike: "%${term}%"}},
    {prof_courses: {course: {code: {_ilike: "%${term}%"}}}}
    {prof_courses: {course: {name: {_ilike: "%${term}%"}}}}
  ]},`,
  );

  const parsedCourseQuery = `{_and: [
    ${courseQueries.join('')}
  ]}`;

  const parsedProfQuery = `{_and: [
    ${profQueries.join('')}
  ]}`;

  return gql`
    query EXPLORE_ALL($query: String) {
      course(where: ${parsedCourseQuery}) {
        ...CourseInfoFragment
        ...CourseTermFragment
        ...CourseRatingFragment
      }
      prof(where: ${parsedProfQuery}) {
        ...ProfInfoFragment
        ...ProfCoursesTaughtFragment
        ...ProfRatingFragment
      }
    }
    ${CourseFragment.courseInfo}
    ${CourseFragment.courseTerm}
    ${CourseFragment.courseRating}
    ${ProfFragment.profInfo}
    ${ProfFragment.profCoursesTaught}
    ${ProfFragment.profRating}
  `;
};
