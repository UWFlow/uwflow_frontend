import styled from 'styled-components';

import { PageContent, Heading2 } from '../../../../constants/Mixins';

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
  background: ${({ theme }) => theme.primaryExtraDark};
  padding-bottom: 32px;
  margin-bottom: 32px;
`;

export const HeaderText = styled.div`
  ${PageContent}
  ${Heading2}
  color: ${({ theme }) => theme.white};
  max-width: 720px;
`;

export const PageContentWrapper = styled.div`
  ${PageContent}
  display: flex;
  justify-content: center;
  margin: auto;
  max-width: 720px;
`;
