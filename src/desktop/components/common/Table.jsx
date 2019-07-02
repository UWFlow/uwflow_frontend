import React from 'react';
import PropTypes from 'prop-types';

import { TableWrapper, HeaderRow, Row, Cell } from './styles/Table';

const Table = ({ values }) => {
  return (
    <TableWrapper width={width} height={height}>
      <HeaderRow>
        {Object.keys(values).map((key) => <Cell>{key}</Cell>)}
      </HeaderRow>
      {
        Object.values(values).map((v) => (
          <Row>
            {v.map((key) => <Cell>{key}</Cell>)}
          </Row>
      ))}
    </TableWrapper>
  );
};

Table.propTypes = {
  values: PropTypes.objectOf(
    PropTypes.arrayOf[PropTypes.oneOf(PropTypes.string, PropTypes.number)]
  ).isRequired
};

export default Table;
