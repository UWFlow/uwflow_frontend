import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

/* Styled Components */
import {
  SearchResultsWrapper
} from './styles/SearchResults';

import Table from '../common/Table';

const courseColumns = [
  {
    Header: 'Course code',
    accessor: 'code',
    align: 'left'
  },
  {
    Header: 'Course Name',
    accessor: 'name',
    align: 'left'
  },
  {
    Header: 'Ratings',
    accessor: 'ratings',
    align: 'right'
  },
  {
    Header: 'Useful',
    accessor: 'useful',
    align: 'right'
  },
  {
    Header: 'Easy',
    accessor: 'easy',
    align: 'right'
  },
  {
    Header: 'Liked',
    accessor: 'liked',
    align: 'right'
  }
];

const profColumns = [
  {
    Header: 'Professor name',
    accessor: 'name',
    align: 'left'
  },
  {
    Header: 'Ratings',
    accessor: 'ratings',
    align: 'left'
  },
  {
    Header: 'Clear',
    accessor: 'clear',
    align: 'right'
  },
  {
    Header: 'Engaging',
    accessor: 'engaging',
    align: 'right'
  },
  {
    Header: 'Liked',
    accessor: 'liked',
    align: 'right'
  }
];

const SearchResults = ({ results, courseSearch }) => {
  // TODO fetch actual data
  const data = useMemo(() => courseSearch ? [
      {
        code: 'ECE 105',
        name: 'Electricity and Magnetism',
        ratings: 1295,
        useful: '22%',
        easy: '5%',
        liked: '15%'
      },
      {
        code: 'MATH 239',
        name: 'Introduction to Combinatorics',
        ratings: 1035,
        useful: '89%',
        easy: '32%',
        liked: '65%'
      }
    ] : [
      {
        name: 'Firas Mansour',
        ratings: 125,
        clear: '22%',
        engaging: '5%',
        liked: '15%'
      },
      {
        name: 'Karen Yeats',
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
  results: PropTypes.arrayOf(PropTypes.object).isRequired,
  courseSearch: PropTypes.bool.isRequired
}

export default SearchResults;
