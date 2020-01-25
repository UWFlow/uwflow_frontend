import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';
import { Link } from 'react-router-dom';
import FadeIn from 'react-fade-in';

import { Body, PageContent, Hover } from '../../../constants/Mixins';
import {
  FOOTER_MARGIN_TOP,
  FOOTER_HEIGHT,
} from '../../../constants/PageConstants';

export const FadeInWrapper = styled(FadeIn)`
  position: relative;
  z-index: 0;

  & > div {
    display: flex;
  }
`;

export const FooterWrapper = styled.div`
  background: ${({ theme }) => theme.primaryExtraDark};
  height: fit-content;
  min-height: ${FOOTER_HEIGHT}px;
  display: flex;
  margin-top: ${({ noMargin }) => (noMargin ? '0' : `${FOOTER_MARGIN_TOP}px`)};
  width: 100%;
  align-items: center;
`;

export const FooterContent = styled.div`
  ${PageContent}
  max-width: 100%;
  margin: auto;
  display: flex;
  justify-content: space-between;

  ${breakpoint('mobile', 'tablet')`
    padding: 16px;
    width: 100%;
  `}

  @media only screen and (max-width: 500px) {
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
  white-space: nowrap;
  ${Hover()}
`;

export const FooterNormalLink = styled.a`
  ${Body}
  color: ${({ theme }) => theme.light2};
  text-decoration: none;
  font-weight: 400;
  margin-left: 32px;
  white-space: nowrap;
  ${Hover()}

  @media only screen and (max-width: 500px) {
    margin: 16px 16px 0 0;
  }
`;
