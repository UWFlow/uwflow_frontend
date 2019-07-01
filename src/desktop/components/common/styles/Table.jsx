import styled from 'styled-components';

export const TableWrapper = styled.div`
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  display: flex;
  border-radius: 4px;
  box-shadow:
    0px 2px 5px rgba(236, 237, 237, 0.5),
    0px 0px 5px rgba(142, 147, 148, 0.2);
`;

export const HeaderRow = styled.div`
`;

export const Row = styled.div`
`;

export const Cell = styled.div`
`;
