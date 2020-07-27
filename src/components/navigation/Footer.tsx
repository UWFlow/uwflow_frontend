import React from 'react';
import { useLocation } from 'react-router-dom';
import {
  ABOUT_PAGE_ROUTE,
  isOnLandingPageRoute,
  LANDING_PAGE_ROUTE,
  PRIVACY_PAGE_ROUTE,
} from 'Routes';

import {
  FadeInWrapper,
  FooterContent,
  FooterLeft,
  FooterNormalLink,
  FooterPageLink,
  FooterRight,
  FooterWrapper,
} from './styles/Footer';

const Footer = () => {
  const location = useLocation();

  return (
    <FadeInWrapper delay={1000}>
      <FooterWrapper noMargin={isOnLandingPageRoute(location)}>
        <FooterContent>
          <FooterLeft>
            <FooterPageLink to={LANDING_PAGE_ROUTE}>Home</FooterPageLink>
            <FooterPageLink to={ABOUT_PAGE_ROUTE}>About</FooterPageLink>
            <FooterPageLink to={PRIVACY_PAGE_ROUTE}>
              Privacy Policy
            </FooterPageLink>
          </FooterLeft>
          <FooterRight>
            <FooterNormalLink
              href="https://www.fb.com/planyourflow"
              target="_blank"
              rel="noopener noreferrer"
            >
              Facebook
            </FooterNormalLink>
            <FooterNormalLink
              href="mailto:info@uwflow.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Email
            </FooterNormalLink>
          </FooterRight>
        </FooterContent>
      </FooterWrapper>
    </FadeInWrapper>
  );
};

export default Footer;
