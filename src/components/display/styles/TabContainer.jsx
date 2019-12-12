import styled from 'styled-components';
import { Heading3, BoxShadow } from '../../../constants/Mixins';
import { NAVBAR_HEIGHT } from '../../../constants/PageConstants';

export const ContainerWrapper = styled.div`
  width: ${({ width }) => width || '100%'};
  border-radius: 4px;
  background: ${({ theme }) => theme.white};
  ${BoxShadow}
`;

export const TabsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  position: sticky;
  top: ${NAVBAR_HEIGHT}px;
  z-index: 7;
  overflow: auto;
  ${BoxShadow}
`;

export const Tab = styled.div`
  display: flex;
  min-width: ${({ minWidth }) => (minWidth ? `${minWidth}px` : 0)};
  flex: 1;
  justify-content: center;
  align-items: center;
  height: 64px;
  cursor: pointer;
  padding: 0 8px;
  border-radius: ${({ first, last, selected }) => {
    if (!selected) {
      return '0';
    }
    if (first) {
      return '4px 0 0 4px';
    }
    if (last) {
      return '0 4px 4px 0';
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
