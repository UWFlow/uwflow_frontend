import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useTable, useSortBy } from 'react-table';
import { throttle } from 'lodash';
import { ChevronUp, ChevronDown } from 'react-feather';

/* Styled Components */
import {
  TableWrapper,
  TableHeader,
  TableBody,
  HeaderRow,
  Row,
  Cell,
  HeaderCell,
  SortArrow,
  HeaderText,
  LoadingRow,
  NoResultsRow,
} from './styles/Table';

/* Child Components */
import LoadingSpinner from './LoadingSpinner';

const Table = ({
  cellPadding,
  columns,
  data,
  sortable = false,
  manualSortBy = false,
  setTableState = () => {},
  loading = false,
  doneFetching = false,
  fetchMore = null,
  initialState = {},
  fetchOffset = 400,
  showNoResults = false,
  getRowProps,
}) => {
  const [shouldFetchMore, setShouldFetchMore] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    if (!shouldFetchMore || !fetchMore || loading || doneFetching) {
      return;
    }

    if (shouldFetchMore) {
      const fetchMorePromise = fetchMore();
      if (!fetchMorePromise) {
        setShouldFetchMore(false);
      } else {
        fetchMorePromise.then(() => {
          setShouldFetchMore(false);
        });
      }
    }
  }, [shouldFetchMore]);

  const setFetchMore = () => {
    if (loading || shouldFetchMore || !bottomRef.current || !fetchMore) {
      return;
    }

    const { top } = bottomRef.current.getBoundingClientRect();
    const inView =
      top + fetchOffset >= 0 && top - fetchOffset <= window.innerHeight;
    setShouldFetchMore(inView);
  };

  const throttledSetFetchMore = throttle(setFetchMore, 100);

  useEffect(() => {
    window.document.addEventListener('scroll', () => throttledSetFetchMore());
    return window.document.removeEventListener('scroll', () =>
      throttledSetFetchMore(),
    );
  }, [loading]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state: tableState,
  } = useTable(
    {
      columns,
      data,
      initialState,
      manualSortBy,
    },
    useSortBy,
  );

  useEffect(() => {
    setTableState(tableState);
  }, [tableState]);

  const renderRows = () =>
    rows.map((row, index) => {
      const additionalRowProps = getRowProps ? getRowProps(row) : {};
      return (
        prepareRow(row) || (
          <Row
            {...{ ...row.getRowProps(), ...additionalRowProps }}
            odd={index % 2}
          >
            {row.cells.map((cell, idx) => (
              <Cell
                {...cell.getCellProps()}
                padding={cellPadding}
                align={cell.column.align}
                style={cell.column.style}
                maxWidth={cell.column.maxWidth}
                key={idx}
              >
                {cell.render('Cell')}
              </Cell>
            ))}
          </Row>
        )
      );
    });

  const isLoading =
    (loading || shouldFetchMore) && !doneFetching && fetchMore !== null;

  return (
    <TableWrapper {...getTableProps()}>
      <TableHeader>
        {headerGroups.map((headerGroup, groupIdx) => (
          <HeaderRow {...headerGroup.getHeaderGroupProps()} key={groupIdx}>
            {headerGroup.headers.map((column, idx) => (
              <HeaderCell
                align={column.align}
                minWidth={column.minWidth}
                maxWidth={column.maxWidth}
                {...column.getHeaderProps()}
                key={idx}
              >
                <HeaderText
                  sortable={sortable}
                  {...column.getHeaderProps(
                    sortable && column.getSortByToggleProps(),
                  )}
                >
                  {column.render('Header')}
                </HeaderText>
                {column.isSorted && (
                  <SortArrow
                    {...column.getHeaderProps(
                      sortable && column.getSortByToggleProps(),
                    )}
                    key="arrow"
                  >
                    {column.isSortedDesc ? (
                      <ChevronUp size={14} strokeWidth={4} />
                    ) : (
                      <ChevronDown size={14} strokeWidth={4} />
                    )}
                  </SortArrow>
                )}
              </HeaderCell>
            ))}
          </HeaderRow>
        ))}
      </TableHeader>
      <TableBody {...getTableBodyProps()}>{renderRows()}</TableBody>
      {isLoading && (
        <LoadingRow>
          <LoadingSpinner />
        </LoadingRow>
      )}
      {!isLoading && showNoResults && rows.length === 0 && (
        <NoResultsRow>No results found</NoResultsRow>
      )}
      <div ref={bottomRef} />
    </TableWrapper>
  );
};

Table.propTypes = {
  cellPadding: PropTypes.string,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      Header: PropTypes.string.isRequired,
      accessor: PropTypes.string,
      align: PropTypes.string,
      maxWidth: PropTypes.number,
      id: PropTypes.string,
      Cell: PropTypes.func,
    }),
  ).isRequired,
  data: PropTypes.arrayOf(PropTypes.object),
  sortable: PropTypes.bool,
};

export default Table;
