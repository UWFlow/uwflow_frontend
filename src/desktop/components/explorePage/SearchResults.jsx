import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

/* Styled Components */
import {
  SearchResultsWrapper
} from './styles/SearchResults';

import Table from '../common/Table';
import { courseColumns, profColumns } from './TableData';

const SearchResults = ({ filterState, results, courseSearch, ratingFilters }) => {
  const filterTypes = useMemo(() => ({
    courseCodes: (rows, id, filterValue) => {
      let regexString = '';
      for (let i = filterValue.length - 1; i >= 0; i--) {
        if (filterValue[i]) {
          regexString += `|${i < filterValue.length - 1 ? i + 1 : '[6-8]'}`;
        }
      }
      regexString = regexString === ''
        ? 'a^' : `(${regexString.slice(1)})([0-9]{2})`;

      const regex = new RegExp(regexString);
      return rows.filter(row => {
        const rowValue = String(row.values[id]);
        return regex.test(rowValue);
      })
    },
    numRatings: (rows, id, filterValue) => {
      return rows.filter(row => {
        const rowValue = row.values[id];
        return rowValue >= ratingFilters[filterValue];
      })
    }
  }), [ratingFilters])

  return (
    <SearchResultsWrapper>
      <Table
        columns={courseSearch ? courseColumns : profColumns}
        data={results}
        rightAlignIndex={courseSearch ? 2 : 1}
        filters={filterState}
        filterTypes={filterTypes}
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
  ratingFilters: PropTypes.arrayOf(PropTypes.number).isRequired
}

export default SearchResults;
