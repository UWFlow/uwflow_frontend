import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';
import { Heading1, Heading2 } from '../../../constants/Mixins';
import LandingImage from '../../../img/landing_v1.svg';
import FadeIn from 'react-fade-in';

import { PAGE_CONTENT_WIDTH } from '../../../constants/PageConstants';

const MAX_PAGE_WIDTH = 1400;
const MAX_BG_HEIGHT = 720;

export const LandingPageWrapper = styled.div`
  width: 100vw;
  margin: 0;
  min-height: calc(100vh - 48px);
  margin-bottom: 48px;
  display: flex;

  @media only screen and (max-height: 800px) {
    min-height: 800px;
  }
`;

export const Nav = styled(FadeIn)`
  position: absolute;
  width: 100vw;
  max-width: ${MAX_PAGE_WIDTH}px;
  margin: auto;
  left: calc((100vw - ${MAX_PAGE_WIDTH}px) / 2);

  @media only screen and (max-width: ${MAX_PAGE_WIDTH + 64}px) {
    left: 0;
  }
`;

export const ProfileWrapper = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  margin: 32px;

  ${breakpoint('mobile', 'mobileLarge')`
    margin-right: 16px;
  `}
`;

export const LogoText = styled.div`
  position: absolute;
  top: 32px;
  left: 64px;
  color: white;
  ${Heading2}

  @media only screen and (max-width: ${PAGE_CONTENT_WIDTH}px) {
    left: 32px;
  }

  ${breakpoint('mobile', 'mobileLarge')`
    left: 16px;
  `}
`;

export const TitleText = styled.div`
  color: white;
  ${Heading1}
  margin-bottom: 32px;

  ${breakpoint('mobile', 'mobileLarge')`
    ${Heading2}
  `}
`;

export const Subheading = styled.div`
  font-size: 24px;
  font-weight: 300;
  position: absolute;
  top: 100px;

  @media only screen and (max-width: 900px) {
    max-width: 320px;
  }

  ${breakpoint('mobile', 'tablet')`
    max-width: 100%;
  `}

  ${breakpoint('mobile', 'mobileLarge')`
    font-size: 20px;
  `}
`;

export const Column = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-end;
  padding: 64px;
  max-width: ${MAX_PAGE_WIDTH}px;
  margin: 0 auto;

  @media only screen and (max-width: ${PAGE_CONTENT_WIDTH}px) {
    padding: 32px;
  }

  ${breakpoint('mobile', 'mobileLarge')`
    padding: 16px;
  `}
`;

export const TitleSearchBarWrapper = styled(FadeIn)`
  display: flex;
  flex-direction: column;
  max-width: 900px;
  align-self: flex-end;
  height: max-content;
`;

export const BackgroundImage = styled.div`
  display: flex;
  width: 100vw;
  background-color: ${({ theme }) => theme.primaryExtraDark};
  background: url(${LandingImage});
  background-size: cover;
  background-position: center left;
  height: 65vh;
  max-height: ${MAX_BG_HEIGHT}px;

  ${breakpoint('mobile', 'mobileLarge')`
    height: 60vh;
  `}

  @media only screen and (max-height: ${MAX_BG_HEIGHT}px) {
    min-height: calc(${Math.round(MAX_BG_HEIGHT * 0.65)}px);
  }
`;

export const AuthContent = styled.div`
  display: flex;
  height: 90vh;
  margin: auto;
  max-height: ${MAX_BG_HEIGHT + 560}px;
  min-width: ${({ loggedIn }) => (loggedIn ? '0' : '500px')};
  ${({ loggedIn }) => loggedIn && 'max-width: 320px;'};

  @media only screen and (max-width: 1024px) {
    min-width: ${({ loggedIn }) => (loggedIn ? '100px' : '480px')};
    ${({ loggedIn }) => loggedIn && 'max-width: 25%;'};
    align-items: none;
  }

  @media only screen and (max-height: 800px) {
    min-height: 800px;
  }
`;
