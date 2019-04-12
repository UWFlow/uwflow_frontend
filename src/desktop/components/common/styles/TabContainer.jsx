import styled from 'styled-components';

export const ContainerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: ${({ width }) => width || '100%'};
`;

export const TabsWrapper = styled.div`
  display: flex;
`;

export const Tab = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${({ width }) => width || '50px'};
  height: 20px;
  background: ${({ selected }) => (selected ? 'white' : 'gray')};
  cursor: pointer;
`;

export const ContentContainer = styled.div`
  width: 100%;
  background: white;
`;
