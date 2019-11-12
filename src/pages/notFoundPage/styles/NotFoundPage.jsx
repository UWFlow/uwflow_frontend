import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';
import NotFound from '../../../img/404_v1.svg';

import { Heading2 , PageContent, PageWrapper } from '../../../constants/Mixins';

export const NotFoundPageWrapper = styled.div`
  ${PageWrapper}
  align-items: center;
  text-align: center;
`;

export const NotFoundText = styled.div`
  ${Heading2}
  margin-bottom: 40px;
`;

export const PageHeader = styled.div`
  display: flex;
  align-items: flex-end;
  width: 100%;
  height: 150px;
  background: ${({ theme }) => theme.primaryExtraDark};
  padding-bottom: 32px;

  ${breakpoint('mobile', 'tablet')`
    height: auto;
    padding: 32px 16px;
  `}
`;

export const HeaderText = styled.div`
  ${PageContent}
  ${Heading2}
  max-width: 100%;
  color: white;
`;

export const NotFoundImage = styled.div`
  width: 100%;
  height: 100vh;
  margin-bottom: 16px;
  max-width: 300px;
  max-height: 300px;
  background: no-repeat center center url(${NotFound});
`;