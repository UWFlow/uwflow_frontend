import React from 'react';
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
} from './styles/Table';

const Table = ({ columns, data, sortable = false }) => {
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
