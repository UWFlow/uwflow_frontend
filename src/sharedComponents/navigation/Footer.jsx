import React from 'react';

/* Styled Components */
import {
  FooterWrapper,
  FooterContent,
  FooterLeft,
  FooterRight,
  FooterPageLink,
  FooterNormalLink,
} from './styles/Footer';

import { LANDING_PAGE_ROUTE, ABOUT_PAGE_ROUTE, PRIVACY_PAGE_ROUTE } from '../../Routes';

const Footer = () => (
  <FooterWrapper>
    <FooterContent>
      <FooterLeft>
        <FooterPageLink to={LANDING_PAGE_ROUTE}>
          Home
        </FooterPageLink>
        <FooterPageLink to={ABOUT_PAGE_ROUTE}>
          About
        </FooterPageLink>
        <FooterPageLink to={PRIVACY_PAGE_ROUTE}>
          Privacy Policy
        </FooterPageLink>
      </FooterLeft>
      <FooterRight>
        <FooterNormalLink href="https://www.fb.com/planyourflow" target="_blank" rel="noopener noreferrer">
          Facebook
        </FooterNormalLink>
        <FooterNormalLink href="mailto:hello@uwflow.com?Subject=Hello!" target="_blank" rel="noopener noreferrer">
          Email
        </FooterNormalLink>
        <FooterNormalLink href="https://twitter.com/useflow" target="_blank" rel="noopener noreferrer">
          Twitter
        </FooterNormalLink>
      </FooterRight>
    </FooterContent>
  </FooterWrapper>
);

export default Footer;
