import styled from 'styled-components';
import { Heading2, Heading4, Body } from '../../../../constants/Mixins';

export const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow: scroll;
`;

export const PageHeader = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 80px;
  background: ${({ theme }) => theme.primary};
  padding: 24px 16px;
  margin-bottom: 24px;
`;

export const HeaderText = styled.div`
  ${Heading2}
  color: white;
`;

export const PageBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  height: 100%;
  padding: 0 16px 16px 16px;
`;

export const PageBodyHeader = styled.div`
  ${Heading4}
`;

export const PageBodyParagraph = styled.div`
  ${Body}
  margin-bottom: 32px;
`;
