import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

/* Styled Components */
import {
  SearchResultsWrapper,
  CourseCode,
  ProfName
} from './styles/SearchResults';

import Table from '../common/Table';
import { courseColumns, profColumns } from './TableData';

const SearchResults = ({ filterState, results, courseSearch }) => {
  // TODO fetch actual data
  const data = useMemo(() => courseSearch ? [
      {
        code: <CourseCode to="/course/100">ECE 105</CourseCode>,
        name: 'Electricity and Magnetism',
        ratings: 1295,
        useful: '22%',
        easy: '5%',
        liked: '15%'
      },
      {
        code: <CourseCode to="/course/100">MATH 239</CourseCode>,
        name: 'Introduction to Combinatorics',
        ratings: 1035,
        useful: '89%',
        easy: '32%',
        liked: '65%'
      }
    ] : [
      {
        name: <ProfName to="/prof/1">Firas Mansour</ProfName>,
        ratings: 125,
        clear: '22%',
        engaging: '5%',
        liked: '15%'
      },
      {
        name: <ProfName to="/prof/1">Karen Yeats</ProfName>,
        ratings: 249,
        clear: '89%',
        engaging: '32%',
        liked: '65%'
      }
    ], []);

  return (
    <SearchResultsWrapper>
      <Table
        columns={courseSearch ? courseColumns : profColumns}
        data={data}
        rightAlignIndex={courseSearch ? 2 : 1}
        sortable
      />
    </SearchResultsWrapper>
  );
};

SearchResults.propTypes = {
  filterState: PropTypes.shape({
    courseNumbers: PropTypes.arrayOf(PropTypes.bool),
    numRatings: PropTypes.number,
    currentTerm: PropTypes.bool,
    nextTerm: PropTypes.bool,
    courseTaught: PropTypes.number,
  }).isRequired,
  results: PropTypes.arrayOf(PropTypes.object).isRequired,
  courseSearch: PropTypes.bool.isRequired
}

export default SearchResults;
