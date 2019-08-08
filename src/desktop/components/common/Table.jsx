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
  HeaderCell
} from './styles/Table';

const Table = ({ columns, data, rightAlignIndex, sortable = false, filters = {} }) => {
  const { getTableProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
  });

  return (
    <TableWrapper {...getTableProps()}>
      <TableHeader>
        {headerGroups.map(headerGroup => (
          <HeaderRow {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column, idx) => (
              <HeaderCell
                {...column.getHeaderProps()}
                sortable={sortable}
                rightAlign={idx >= rightAlignIndex}
              >
                {column.render('Header')}
              </HeaderCell>
            ))}
          </HeaderRow>
        ))}
      </TableHeader>
      <TableBody>
        {rows.map(
          (row, i) =>
            prepareRow(row) || (
              <Row {...row.getRowProps()}>
                {row.cells.map((cell, idx) => (
                  <Cell
                    {...cell.getCellProps()}
                    rightAlign={idx >= rightAlignIndex}
                  >
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
    Header: PropTypes.string,
    accessor: PropTypes.string
  })).isRequired,
  data: PropTypes.arrayOf(PropTypes.object),
  sortable: PropTypes.bool,
  filters: PropTypes.object,
  rightAlignIndex: PropTypes.number.isRequired, // all columns after this index will be right aligned
};

export default Table;
