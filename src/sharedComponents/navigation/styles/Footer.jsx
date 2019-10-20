import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { Body, PageContent } from '../../../constants/Mixins';

export const FooterWrapper = styled.div`
  background: ${({ theme }) => theme.primaryExtraDark};
  height: 100%;
  min-height: ${({ height }) => height}px;
  display: flex;
  align-items: center;
  margin-top: ${({ noMargin }) => noMargin ? '0' : '32px'};
`;

export const FooterContent = styled.div`
  ${PageContent}
  margin: auto;
  display: flex;
  justify-content: space-between;

  @media only screen and (max-width: 800px) {
    padding: 0 16px;
  }

  @media only screen and (max-width: 450px) {
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

  @media only screen and (max-width: 450px) {
    margin: 16px 16px 0 0;
  }
`;
