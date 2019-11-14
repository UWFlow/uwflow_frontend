import styled from 'styled-components';
import { Heading4, BoxShadow } from '../../../constants/Mixins';

export const DropdownWrapper = styled.div`
  color: ${({ color }) => color};
  z-index: ${({ zIndex }) => zIndex};
  width: ${({ width }) => width};
  margin: ${({ margin }) => margin};
  margin-left: 5px;
  cursor: pointer;
  width: max-content;
  position: relative;
  user-select: none;
`;

export const DropdownControl = styled.div`
  position: relative;
  cursor: pointer;
  display: flex;
  align-items: center;
  color: ${({ theme, open, color }) => (open ? theme.light3 : color)};
  ${Heading4}
`;

export const DropdownMenu = styled.div`
  display: flex;
  display: ${({ open }) => (open ? 'block' : 'none')};
  position: absolute;
  border-radius: 4px;
  top: calc(100% + ${({ menuOffset }) => menuOffset}px);
  right: 0;
  width: max-content;
  background-color: ${({ theme }) => theme.white};
  ${BoxShadow}
`;

export const MenuItem = styled.button`
  outline: none;
  border: none;
  display: block;
  cursor: pointer;
  width: 100%;
  text-align: left;

  color: ${({ theme, selected, itemColor }) =>
    itemColor ? itemColor : selected ? theme.dark1 : theme.dark2};
  background-color: ${({ theme, selected }) =>
    selected ? theme.light2 : theme.white};
  padding: 16px;
  border-radius: 0;
  border: 1px solid ${({ theme }) => theme.light2};
  ${Heading4}

  &:first-child {
    border-radius: 4px 4px 0 0;
  }

  &:last-child {
    border-radius: 0 0 4px 4px;
  }

  &:only-child {
    border-radius: 4px;
  }

  &:hover,
  &:focus {
    color: ${({ theme }) => theme.primary};
  }
`;
