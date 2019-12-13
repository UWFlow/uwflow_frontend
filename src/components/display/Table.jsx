import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useTable, useSortBy } from 'react-table';
import { throttle } from 'lodash';
import { ChevronUp, ChevronDown } from 'react-feather';

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
} from './styles/Table';

import LoadingSpinner from '../display/LoadingSpinner';

const Table = ({
  cellPadding,
  columns,
  data,
  sortable = false,
  loading = false,
  doneFetching = false,
  fetchMore = null,
  fetchOffset = 1000,
}) => {
  const [shouldFetchMore, setShouldFetchMore] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    if (!shouldFetchMore || !fetchMore || loading) {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldFetchMore]);

  const setFetchMore = () => {
    if (loading || shouldFetchMore || !bottomRef.current || !fetchMore) {
      return;
    }
    const top = bottomRef.current.getBoundingClientRect().top;
    const inView =
      top + fetchOffset >= 0 && top - fetchOffset <= window.innerHeight;
    setShouldFetchMore(inView);
  };

  const throttledSetFetchMore = throttle(setFetchMore, 100);

  useEffect(() => {
    window.addEventListener('scroll', () => throttledSetFetchMore());
    return window.removeEventListener('scroll', () => throttledSetFetchMore());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
    },
    useSortBy,
  );

  const renderRows = () =>
    rows.map(
      row =>
        prepareRow(row) || (
          <Row {...row.getRowProps()}>
            {row.cells.map(cell => (
              <Cell
                {...cell.getCellProps()}
                padding={cellPadding}
                align={cell.column.align}
                style={cell.column.style}
              >
                {cell.render('Cell')}
              </Cell>
            ))}
          </Row>
        ),
    );

  const isLoading =
    (loading || shouldFetchMore) && !doneFetching && fetchMore !== null;

  return (
    <TableWrapper {...getTableProps()}>
      <TableHeader>
        {headerGroups.map(headerGroup => (
          <HeaderRow {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <HeaderCell
                {...column.getHeaderProps(
                  sortable && column.getSortByToggleProps(),
                )}
                align={column.align}
                maxWidth={column.maxWidth}
              >
                <HeaderText sortable={sortable}>
                  {column.render('Header')}
                </HeaderText>
                <SortArrow>
                  {column.isSorted ? (
                    column.isSortedDesc ? (
                      <ChevronUp size={14} strokeWidth={4} />
                    ) : (
                      <ChevronDown size={14} strokeWidth={4} />
                    )
                  ) : (
                    ''
                  )}
                </SortArrow>
              </HeaderCell>
            ))}
          </HeaderRow>
        ))}
      </TableHeader>
      <TableBody {...getTableBodyProps()}>{renderRows()}</TableBody>
      {isLoading && (
        <LoadingRow>
          <LoadingSpinner size={48} strokeWidth={4} />
        </LoadingRow>
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
