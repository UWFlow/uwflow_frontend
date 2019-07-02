import styled from 'styled-components';
import { Heading3 } from '../../../../constants/Mixins';

export const ContainerWrapper = styled.div`
  width: ${({ width }) => width || '100%'};
  border-radius: 4px;
  background: ${({ theme }) => theme.white};
  border: 2px solid ${({ theme }) => theme.light2};
  margin-bottom: 64px;
  box-shadow:
    0px 2px 5px rgba(236, 237, 237, 0.5),
    0px 0px 5px rgba(142, 147, 148, 0.2);
`;

export const TabsWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

export const Tab = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  height: 64px;
  cursor: pointer;
  border-radius: ${({ first, last, selected }) => {
    if (!selected) { return '0' }
    if (first) { return '4px 0 0 4px' }
    if (last) { return '0 4px 4px 0' }
    return '0'
  }};
  background: ${({ selected, theme }) => (selected ? theme.white : theme.light2)};
  color: ${({ selected, theme }) => (selected ? theme.primaryDark : theme.dark3)};
  ${Heading3}
  font-weight: ${({ selected }) => (selected ? 600 : 400)};
`;

export const ContentContainer = styled.div`
  width: 100%;
  background: white;
  padding: 32px;
  border-radius: 0 0 4px 4px;
`;
