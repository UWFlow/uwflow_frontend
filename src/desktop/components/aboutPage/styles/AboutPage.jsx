import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';
import { PageContent, Heading2, isMobile } from '../../../../constants/Mixins';

export const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;

  ${breakpoint('mobile', 'tablet')`
    width: 100%;
    overflow: scroll;
  `}
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
    height: 80px;
    padding:16px;
    padding-left: 0;
    margin-bottom: 24px;
  `}
`;

export const HeaderText = styled.div`
  ${Heading2}
  color: white;

  ${breakpoint('tablet')`
    ${PageContent}
    max-width: 720px;
  `}
`;

export const PageContentWrapper = styled.div`
  ${breakpoint('tablet')`
    ${PageContent}
    max-width: 720px;
    margin: auto;
  `}

  ${breakpoint('mobile', 'tablet')`
    padding: 0 16px 16px 16px;
  `}
`;
