import styled from 'styled-components';
import { Heading2, Heading3, BoxShadow } from '../../../constants/Mixins';

const HEADER_HEIGHT = 64;

export const ContainerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  ${BoxShadow}
  margin-bottom: 32px;
  border-radius: 4px;
`;

export const HeaderWrapper = styled.div`
  display: flex;
  height: ${HEADER_HEIGHT}px;
  justify-content: space-between;
  border-bottom: ${({ headerBorder, theme }) =>
    headerBorder ? `2px solid ${theme.light1}` : 'none'};
  border-radius: 4px 4px 0 0;
`;

export const HeaderTitle = styled.div`
  ${({ bigTitle }) => bigTitle ? Heading2 : Heading3}
  ${({ bigTitle }) => bigTitle ? 'font-size: 24px;' : ''}
  display: flex;
  align-items: center;
  justify-content: ${({ centerHeader }) =>
    centerHeader ? 'center' : 'flex-begin'};
  padding-left: 16px;
  background: ${({ theme }) => theme.white};
  width: 100%;
  border-radius: 4px 4px 0 0;
`;

export const HeaderChevronBox = styled.div`
  width: ${HEADER_HEIGHT}px;
  height: ${HEADER_HEIGHT}px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background: ${({ theme }) => theme.light1};
`;

export const ContentWrapper = styled.div`
  background: ${({ theme }) => theme.white};
  border-radius: 0 0 4px 4px;
`;
