import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';
import { PageContent, Heading2, PageWrapper as _PageWrapper } from '../../../../constants/Mixins';

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
  ${Heading2}
  max-width: 720px;
  color: white;
`;

export const PageContentWrapper = styled.div`
  ${PageContent}
  max-width: 720px;
  margin: auto;

  ${breakpoint('mobile', 'tablet')`
    padding: 0 16px 16px 16px;
  `}
`;
