import styled from 'styled-components';
import { Heading4, Body, BoxShadow } from '../../../../../constants/Mixins';

export const DropdownWrapper = styled.div`
  color: ${({ color }) => color};
  z-index: ${({ zIndex }) => zIndex};
  margin: auto;
  margin-left: 5px;
  cursor: pointer;
  position: relative;
  display: inline-block;
`;

export const DropdownControl = styled.div`
  cursor: pointer;
  position: absolute;
  top: 0;
`;

export const DropdownControlText = styled.div`
  color: ${({ color }) => color};
  ${Heading4}
`;

export const DropdownMenu= styled.div`
  display: ${({ open }) => open ? 'block' : 'none'};
  padding: 16px;
  position: absolute;
  top: 24px;
`;

export const MenuItem = styled.div`
  color: ${({ color }) => color};
  z-index: ${({ zIndex }) => zIndex};
  margin: auto;
  margin-left: 5px;
  cursor: pointer;
`;
