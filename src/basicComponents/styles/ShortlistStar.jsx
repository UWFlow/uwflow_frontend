import styled from 'styled-components';
import { Star } from 'react-feather';

export const ShortlistStarWrapper = styled(Star)`
  width: ${({width}) => width}px;
  min-width: ${({width}) => width}px;
  height: ${({width}) => width}px;
  min-height: ${({width}) => width}px;
  fill: ${({ checked, theme }) => checked ? theme.accent : 'none'};
  user-select: none;
  cursor: pointer;
  margin: auto 0;

  &:hover {
    fill: ${({ checked, theme }) => checked ? theme.accentDark : theme.light1};
  }
`;
