import styled from 'styled-components';
import { Body, BoxShadow } from '../../../../constants/Mixins';

export const MultiSelectButtonWrapper = styled.div`
  width: 100%;
  display: block;
  margin: ${({margin}) => margin};
`;

export const ButtonWrapper = styled.div`
  display: inline-block;
  height: 24px;
  border-radius: 12px;
  padding: 2px 6px;
  margin-bottom: 8px;
  ${Body}
  ${BoxShadow}
  cursor: pointer;
  margin-right: ${({last}) => last ? 0 : 8}px;
  color: ${({theme, selected}) => selected ? theme.light1 : theme.primary};
  border: 2px solid ${({theme}) => theme.primary};
  background-color: ${({theme, selected}) => selected ? theme.primary : theme.white};

  &:hover {
    background-color: ${({theme, selected}) => selected ? theme.primaryDark : theme.light1};
  }
`;
