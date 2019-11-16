import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useTable, useSortBy } from 'react-table';

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
  TableBottom,
} from './styles/Table';

import LoadingSpinner from '../display/LoadingSpinner';

const Table = ({ columns, data, sortable = false, loading = false, fetchMore = () => {} }) => {
  const [shouldFetchMore, setShouldFetchMore] = useState(false);
  const bottomRef = useRef(null);

  const setFetchMore = () => {
    if (bottomRef.current) {
      const distanceFromBottom = bottomRef.current.offsetTop - window.scrollY;
      if (distanceFromBottom < 1000 && !loading) {
        setShouldFetchMore(true);
      }
    }
  }

  useEffect(() => {
    if (shouldFetchMore) {
      fetchMore();
      setShouldFetchMore(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldFetchMore, fetchMore]);

  useEffect(() => {
    window.addEventListener('scroll', () => setFetchMore());
    return window.removeEventListener('scroll', () => setFetchMore());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bottomRef, loading]);

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
                    align={cell.column.align}
                    style={cell.column.style}
                  >
                    {cell.render('Cell')}
                  </Cell>
                ))}
              </Row>
            ),
        )}
        {loading && (
          <Row>
            <Cell colSpan={columns.length} style={{padding: 0}}>
              <LoadingSpinner margin={"4px auto"} />
            </Cell>
          </Row>
        )}
        <TableBottom ref={bottomRef} />
      </TableBody>
    </TableWrapper>
  );
};

Table.propTypes = {
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
