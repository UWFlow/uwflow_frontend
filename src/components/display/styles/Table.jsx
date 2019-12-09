import styled from 'styled-components';
import { Link } from '../../../constants/Mixins';

export const TableWrapper = styled.table`
  width: 100%;
  min-width: 100%;
  border-radius: 4px;
  text-align: left;
  table-layout: auto;
  border-collapse: collapse;
  color: ${({ theme }) => theme.dark2};
`;

export const TableHeader = styled.thead`
  border-radius: 4px;
  width: 100%;
`;

export const HeaderRow = styled.tr`
  width: 100%;
  border-bottom: 1px solid ${({ theme }) => theme.light3};
`;

export const HeaderCell = styled.th`
  text-align: ${({ align }) => (align ? align : 'left')};
  width: ${({ maxWidth }) => maxWidth + 16}px;
  min-width: ${({ maxWidth }) => maxWidth + 8}px;
  padding-top: 16px;
  padding-bottom: 16px;
  vertical-align: top;

  padding-left: ${({ rightAlign }) => (rightAlign ? '8px' : '0')};
  padding-right: ${({ rightAlign }) => (rightAlign ? '8px' : '0')};

  &:first-child {
    padding-left: 16px;
    width: ${({ maxWidth }) => maxWidth + 16}px;
    max-width: ${({ maxWidth }) => maxWidth + 8}px;
  }

  &:last-child {
    padding-left: 0;
    padding-right: 16px;
    width: ${({ maxWidth }) => maxWidth + 24}px;
    max-width: ${({ maxWidth }) => maxWidth + 8}px;
  }
`;

export const HeaderText = styled.span`
  ${({ sortable }) => (sortable ? Link : '')}
  cursor: ${({ sortable }) => (sortable ? 'pointer' : 'inherit')};
  color: ${({ theme, sortable }) => (sortable ? theme.primary : theme.dark1)};

  &:hover, &:focus {
    color: ${({ theme, sortable }) =>
      sortable ? theme.primaryDark : theme.dark1};
  }
`;

export const SortArrow = styled.span`
  color: ${({ theme }) => theme.primary};
  text-decoration: none !important;
`;

export const TableBody = styled.tbody`
  width: 100%;
`;

export const Row = styled.tr`
  position: relative;
  width: 100%;
  border-radius: 4px;
  border-bottom: 1px solid ${({ theme }) => theme.light3};

  &:last-child {
    border-bottom: none;
  }
`;

export const Cell = styled.td`
  padding: ${({ padding }) => padding ? padding : '8px 0'};
  text-align: ${({ align }) => (align ? align : 'left')};
  vertical-align: top;
  height: 0;

  &:first-child {
    padding-left: 16px;
    padding-right: 0;
  }

  &:last-child {
    padding-left: 0;
    padding-right: 16px;
  }

  &:only-child {
    padding: auto 16px;
  }
`;

export const TableBottom = styled.tr``;
