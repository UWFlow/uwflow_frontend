import gql from 'graphql-tag';

import SearchFragment from 'graphql/fragments/SearchFragment';

import { MAX_SEARCH_TERMS } from 'constants/Search';

const exploreAllQuery = gql`
  query EXPLORE_ALL {
    course_search_index {
      ...CourseSearchFragment
    }
    prof_search_index {
      ...ProfSearchFragment
    }
  }
  ${SearchFragment.courseSearch}
  ${SearchFragment.profSearch}
`;

export const buildExploreQuery = (query = '', codeOnly = false) => {
  if (query === '') {
    return exploreAllQuery;
  }

  const queryTerms = query
    .toLowerCase()
    .replace('-', ' ')
    // remove all special characters for postgres ts_query
    .replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>{}[\]\\/]/gi, '')
    .split(' ')
    .map((term) => term.trim())
    .filter((term) => term.length > 0)
    .slice(0, MAX_SEARCH_TERMS);

  const parsedQuery = codeOnly
    ? query
    : queryTerms.map((term) => `${term}:*`).join(' & ');

  return gql`
    query EXPLORE_QUERY {
      search_courses(args: {query: "${parsedQuery}", code_only: ${codeOnly}}) {
      ...CourseSearchFragment
      }
      search_profs(args: {query: "${parsedQuery}", code_only: ${codeOnly}}) {
        ...ProfSearchFragment
      }
    }
    ${SearchFragment.courseSearch}
    ${SearchFragment.profSearch}
  `;
};
