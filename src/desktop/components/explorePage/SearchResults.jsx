import React, { useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';

/* Styled Components */
import {
  SearchResultsWrapper
} from './styles/SearchResults';

import Table from '../common/Table';
import { courseColumns, profColumns } from './TableData';

const SearchResults = ({
  filterState,
  results,
  courseSearch,
  ratingFilters,
  profCourses
}) => {
  const courseCodeRegex = useCallback(() => {
    let regexStr = '';
    for (let i = filterState.courseCodes.length - 1; i >= 0; i--) {
      if (filterState.courseCodes[i]) {
        regexStr += `|${i < filterState.courseCodes.length - 1 ? i + 1 : '[6-8]'}`;
      }
    }
    regexStr = regexStr === '' ? 'a^' : `(${regexStr.slice(1)})([0-9]{2})`;
    return new RegExp(regexStr);
  }, [filterState]);

  const filterCourses = (results = []) => {
    const regex = courseCodeRegex();
    return results.filter(
      (res) => regex.test(res.code)
        && res.ratings >= ratingFilters[filterState.numRatings]
    );
  };

  const filterProfs = (results = []) => {
    return results.filter(res =>
      res.ratings >= ratingFilters[filterState.numRatings]
        && (filterState.courseTaught === 0
            || res.courses.includes(profCourses[filterState.courseTaught]))
    )
  };

  return (
    <SearchResultsWrapper>
      <Table
        data={courseSearch ? filterCourses(results) : filterProfs(results)}
        columns={courseSearch ? courseColumns : profColumns}
        rightAlignIndex={courseSearch ? 2 : 1}
        sortable
      />
    </SearchResultsWrapper>
  );
};

SearchResults.propTypes = {
  filterState: PropTypes.shape({
    courseCodes: PropTypes.arrayOf(PropTypes.bool),
    numRatings: PropTypes.number,
    currentTerm: PropTypes.bool,
    nextTerm: PropTypes.bool,
    courseTaught: PropTypes.number,
  }).isRequired,
  results: PropTypes.arrayOf(PropTypes.object).isRequired,
  courseSearch: PropTypes.bool.isRequired,
  ratingFilters: PropTypes.arrayOf(PropTypes.number).isRequired,
  profCourses: PropTypes.arrayOf(PropTypes.string).isRequired,
}

export default SearchResults;
