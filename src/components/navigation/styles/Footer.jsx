import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';
import { Link } from 'react-router-dom';

import { Body, PageContent } from '../../../constants/Mixins';
import { FOOTER_MARGIN_TOP, FOOTER_HEIGHT } from '../../../constants/PageConstants';

export const FooterWrapper = styled.div`
  background: ${({ theme }) => theme.primaryExtraDark};
  height: 100%;
  min-height: ${FOOTER_HEIGHT}px;
  display: flex;
  align-items: center;
  margin-top: ${({ noMargin }) => noMargin ? '0' : `${FOOTER_MARGIN_TOP}px`};
`;

export const FooterContent = styled.div`
  ${PageContent}
  max-width: 100%;
  margin: auto;
  display: flex;
  justify-content: space-between;

  ${breakpoint('mobile', 'tablet')`
    padding: 0 16px;
    width: 100%;
  `}

  @media only screen and (max-width: 450px) {
    flex-direction: column;
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
  color: ${({ theme }) => theme.light2};
  text-decoration: none;
  font-weight: 400;
  margin-right: 32px;
`;

export const FooterNormalLink = styled.a`
  ${Body}
  color: ${({ theme }) => theme.light2};
  text-decoration: none;
  font-weight: 400;
  margin-left: 32px;

  @media only screen and (max-width: 450px) {
    margin: 16px 16px 0 0;
  }
`;
