import styled from 'styled-components';
import {
  PageContent,
  Heading2,
  Heading4,
  Body,
  WideColumn,
} from '../../../../constants/Mixins';
import { Link } from 'react-router-dom';

export const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const PageHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  width: 100%;
  height: 208px;
  background: ${({ theme }) => theme.primary};
  padding-bottom: 32px;
  margin-bottom: 32px;
`;

export const HeaderTextBox = styled.div`
  ${WideColumn}
  display: flex;
  justify-content: flex-start;
`;

export const HeaderText = styled.div`
  ${Heading2}
  color: white;
`;

export const PageBody = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

export const PageContentWrapper = styled.div`
  ${PageContent}
  display: flex;
  justify-content: center;
`;

export const PageBodyContent = styled.div`
  ${WideColumn}
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const PageBodyHeader = styled.div`
  ${Heading4}
`;

export const PageBodyParagraph = styled.div`
  ${Body}
  margin-bottom: 32px;
`;

export const InlineLink = styled(Link)`
  display: inline;
`;
