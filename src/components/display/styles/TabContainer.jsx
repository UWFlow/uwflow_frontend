import styled from 'styled-components';
import {
  Heading3,
  BoxShadow,
  BottomBoxShadow,
} from '../../../constants/Mixins';

export const ContainerWrapper = styled.div`
  width: ${({ width }) => width || '100%'};
  border-radius: ${({ borderRadius }) => (borderRadius ? '4px' : 0)};
  background: ${({ theme }) => theme.white};
  ${BoxShadow}
`;

export const TabsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  position: sticky;
  top: 0;
  z-index: 7;
  overflow: auto;
  ${BottomBoxShadow}
`;

export const Tab = styled.button`
  outline: none;
  border: none;
  display: flex;
  min-width: ${({ minWidth }) => (minWidth ? `${minWidth}px` : 0)};
  flex: 1;
  justify-content: center;
  align-items: center;
  height: 64px;
  cursor: pointer;
  padding: 0 8px;
  border-radius: ${({ first, last, selected, borderRadius }) => {
    if (!selected || !borderRadius) {
      return '0';
    }
    if (first && last) {
      return '4px 4px 0 0';
    }
    if (first) {
      return '4px 0 0 0';
    }
    if (last) {
      return '0 4px 0 0';
    }
    return '0';
  }};
  background: ${({ selected, theme }) =>
    selected ? theme.white : theme.light2};
  color: ${({ selected, theme }) => (selected ? theme.dark1 : theme.dark3)};
  ${Heading3}
  font-weight: ${({ selected }) => (selected ? 600 : 400)};
`;

export const ContentContainer = styled.div`
  width: 100%;
  background: white;
  padding: ${({ padding }) => padding};
  border-radius: 0 0 4px 4px;
`;
