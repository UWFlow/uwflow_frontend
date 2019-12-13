import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useTable, useSortBy } from 'react-table';
import { throttle } from 'lodash';

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
    const offset = 800;
    const top = bottomRef.current.getBoundingClientRect().top;
    const inView = top + offset >= 0 && top - offset <= window.innerHeight;
    setShouldFetchMore(inView);
  };

  const throttledSetFetchMore = throttle(setFetchMore, 100);

  useEffect(() => {
    window.addEventListener('scroll', () => throttledSetFetchMore());
    return window.removeEventListener('scroll', () => throttledSetFetchMore());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  const { getTableProps, headerGroups, rows, prepareRow } = useTable(
    {
      columns,
      data,
    },
    useSortBy,
  );

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
                  {column.sorted ? (column.sortedDesc ? ' ▲' : ' ▼') : ''}
                </SortArrow>
              </HeaderCell>
            ))}
          </HeaderRow>
        ))}
      </TableHeader>
      <TableBody>
        {rows.map(
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
        )}
        {(loading || shouldFetchMore) && !doneFetching && fetchMore !== null && (
          <Row>
            <LoadingSpinner size={48} strokeWidth={4} />
          </Row>
        )}
        <div ref={bottomRef} />
      </TableBody>
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
