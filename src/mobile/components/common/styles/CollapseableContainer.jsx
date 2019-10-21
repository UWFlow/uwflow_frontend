import styled from 'styled-components';
import { Heading3, BoxShadow } from '../../../../constants/Mixins';

const HEADER_HEIGHT = 64;

export const ContainerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  ${BoxShadow}
  margin-bottom: 32px;
`;

export const HeaderWrapper = styled.div`
  display: flex;
  height: ${HEADER_HEIGHT}px;
  justify-content: space-between;
`;

export const HeaderTitle = styled.div`
  ${Heading3}
  display: flex;
  align-items: center;
  justify-content: ${({ centerHeader }) => centerHeader ? 'center' : 'flex-begin'};
  padding-left: 16px;
  background: white;
  width: 100%;
`;

export const HeaderChevronBox = styled.div`
  width: ${HEADER_HEIGHT}px;
  height: ${HEADER_HEIGHT}px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

export const ContentWrapper = styled.div`
  background: white;
`;
