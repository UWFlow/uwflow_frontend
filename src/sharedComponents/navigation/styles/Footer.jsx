import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { Body, PageContent } from '../../../constants/Mixins';

export const FooterWrapper = styled.div`
  background: ${({ theme }) => theme.primaryExtraDark};
  height: 100%;
  min-height: 112px;
  display: flex;
  align-items: center;
  margin-top: 32px;
`;

export const FooterContent = styled.div`
  ${PageContent}
  display: flex;
  justify-content: space-between;

  @media only screen and (max-width: 800px) {
    padding: 0 16px;
  }

  @media only screen and (max-width: 424px) {
    display: block;
  }
`;

export const FooterLeft = styled.div`
  display: flex;
  align-items: center;
`;

export const FooterRight = styled.div`
  display: flex;
  align-items: center;
`;

export const FooterPageLink = styled(Link)`
  ${Body}
  color: ${({ theme }) => theme.light1};
  text-decoration: underline;
  font-weight: 400;
  margin-right: 16px;
`;

export const FooterNormalLink = styled.a`
  ${Body}
  color: ${({ theme }) => theme.light1};
  text-decoration: underline;
  font-weight: 400;
  margin-left: 16px;

  @media only screen and (max-width: 424px) {
    margin: 16px 16px 0 0;
  }
`;
