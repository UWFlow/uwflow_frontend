import React from 'react';
import PropTypes from 'prop-types';
import { useTable, useSortBy, useFilters, useTableState } from 'react-table';

import {
  TableWrapper,
  TableHeader,
  TableBody,
  HeaderRow,
  Row,
  Cell,
  HeaderCell,
  SortArrow,
  HeaderText
} from './styles/Table';

const Table = ({
  columns,
  data,
  sortable = false,
  filters = {},
  filterTypes = {}
}) => {
  const state = useTableState({}, { filters });
  const { getTableProps, headerGroups, rows, prepareRow } = useTable(
    {
      columns,
      data,
      state,
      filterTypes,  
    },
    useSortBy,
    useFilters
  );
  
  return (
    <TableWrapper {...getTableProps()}>
      <TableHeader>
        {headerGroups.map(headerGroup => (
          <HeaderRow {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <HeaderCell
                {...column.getHeaderProps(sortable && column.getSortByToggleProps())}
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
          (row) =>
            prepareRow(row) || (
              <Row {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <Cell {...cell.getCellProps()} align={cell.column.align}>
                    {cell.render('Cell')}
                  </Cell>
                ))}
              </Row>
            )
        )}
      </TableBody>
    </TableWrapper>
  );
};

Table.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.shape({
    Header: PropTypes.string.isRequired,
    accessor: PropTypes.string,
    align: PropTypes.string,
    maxWidth: PropTypes.number,
    id: PropTypes.string,
    filter: PropTypes.string,
    Cell: PropTypes.func
  })).isRequired,
  data: PropTypes.arrayOf(PropTypes.object),
  sortable: PropTypes.bool,
  filters: PropTypes.object,
  filtersTypes: PropTypes.object,
};

export default Table;
