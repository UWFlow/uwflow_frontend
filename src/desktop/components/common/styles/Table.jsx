import styled from 'styled-components';
import { Link } from '../../../../constants/Mixins';

export const TableWrapper = styled.table`
  width: 100%;
  border-radius: 4px;
  text-align: left;
  table-layout: auto;
  border-collapse: collapse;
  color: ${({theme}) => theme.dark2}
  
  box-shadow:
    0px 2px 5px rgba(236, 237, 237, 0.5),
    0px 0px 5px rgba(142, 147, 148, 0.2);
`;

export const TableHeader = styled.thead`
  width: 100%;
`;

export const HeaderRow = styled.tr`
  width: 100%;
  border-bottom: 1px solid ${({theme}) => theme.light3};
`;

export const HeaderCell = styled.th`
  ${({sortable}) => sortable ? Link : ''}
  cursor: ${({sortable}) => sortable ? 'pointer' : 'none'};
  color: ${({theme, sortable}) => sortable ? theme.primary : theme.dark2};
  text-align: ${({rightAlign}) => rightAlign ? 'right' : 'left'};

  padding-top: 16px;
  padding-bottom: 16px;

  &:hover {
    color: ${({theme, sortable}) => sortable ? theme.primaryDark : theme.dark1};
  }

  &:first-child {
    padding-left:24px;
    padding-right:0;
  }

  &:last-child {
    padding-left:0;
    padding-right:24px;
  }
`;

export const TableBody = styled.tbody`
  width: 100%;
`;

export const Row = styled.tr`
  width: 100%;
  border-bottom: 1px solid ${({theme}) => theme.light3};
`;

export const Cell = styled.td`
  padding-top: 16px;
  padding-bottom: 16px;
  text-align: ${({rightAlign}) => rightAlign ? 'right' : 'left'};

  &:first-child {
    padding-left:24px;
    padding-right:0;
  }

  &:last-child {
    padding-left:0;
    padding-right:24px;
  }
`;
