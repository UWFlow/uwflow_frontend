import styled from 'styled-components';
import { Link } from '../../../constants/Mixins';

export const TableWrapper = styled.div`
  display: table;
  border-spacing: 2px;
  width: 100%;
  min-width: 100%;
  border-radius: 4px;
  text-align: left;
  table-layout: auto;
  border-collapse: collapse;
  color: ${({ theme }) => theme.dark2};
`;

export const TableHeader = styled.div`
  display: table-header-group;
  vertical-align: middle;
  border-radius: 4px;
  width: 100%;
`;

export const HeaderRow = styled.div`
  display: table-row;
  width: 100%;
  border-bottom: 1px solid ${({ theme }) => theme.light3};
`;

export const HeaderCell = styled.div`
  display: table-cell;
  text-align: ${({ align }) => (align ? align : 'left')};
  width: ${({ maxWidth }) => maxWidth + 16}px;
  min-width: ${({ maxWidth }) => maxWidth + 8}px;
  padding-top: 16px;
  padding-bottom: 16px;
  vertical-align: top;
  font-weight: 600;

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

export const TableBody = styled.div`
  width: 100%;
  display: table-row-group;
  vertical-align: middle;
`;

export const Row = styled.div`
  display: table-row;
  position: relative;
  width: 100%;
  border-radius: 4px;
  border-bottom: 1px solid ${({ theme }) => theme.light3};

  &:last-child {
    border-bottom: none;
  }
`;

export const Cell = styled.div`
  display: table-cell;
  padding: ${({ padding }) => (padding ? padding : '8px 0')};
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
    padding: 0 16px;
    column-span: all;
  }
`;
