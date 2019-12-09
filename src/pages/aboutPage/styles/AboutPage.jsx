import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';
import { PageContent, Heading1, Heading2, Body, PageWrapper as _PageWrapper } from '../../../constants/Mixins';

export const PageWrapper = styled.div`
  ${_PageWrapper}
`;

export const PageHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  width: 100%;
  height: 208px;
  background: ${({ theme }) => theme.primaryExtraDark};
  padding-bottom: 32px;
  margin-bottom: 32px;

  ${breakpoint('mobile', 'tablet')`
    height: auto;
    padding: 32px 16px;
  `}
`;

export const HeaderText = styled.div`
  ${PageContent}
  ${Heading1}
  max-width: 720px;
  color: ${({ theme }) => theme.white};
`;

export const PageContentWrapper = styled.div`
  ${PageContent}
  max-width: 720px;
  margin: auto;

  ${breakpoint('mobile', 'tablet')`
    padding: 0 16px 16px 16px;
  `}
`;

export const PageBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  height: 100%;
  margin-top: 16px;
`;

export const PageBodyHeader = styled.div`
  ${Heading2}
  font-size: 24px;
  margin-bottom: 16px;
`;

export const PageBodyParagraph = styled.div`
  ${Body}
  line-height: 1.2;
  margin-bottom: 64px;
`;
