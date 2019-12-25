import styled from 'styled-components';
import { Star } from 'react-feather';
import { Hover } from '../../../constants/Mixins';

export const ShortlistStarWrapper = styled(Star)`
  width: ${({ width }) => width}px;
  min-width: ${({ width }) => width}px;
  height: ${({ width }) => width}px;
  min-height: ${({ width }) => width}px;
  fill: ${({ checked, theme }) => (checked ? theme.accent : 'none')};
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  stroke: ${({ checked, theme }) => (checked ? theme.accent : theme.light3)};
`;

export const ShortlistStarButton = styled.button`
  background: none;
  border: none;
  outline: none;
  cursor: pointer;
  height: min-content;
  margin: auto 0;
  ${Hover()}
`;
