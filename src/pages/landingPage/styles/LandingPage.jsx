import styled from 'styled-components';
import { Heading1, Heading2 } from '../../../constants/Mixins';
import LandingImage from '../../../img/landing_v1.svg';

import { PAGE_CONTENT_WIDTH } from '../../../constants/PageConstants';

export const LandingPageWrapper = styled.div`
  width: 100vw;
  margin: 0;
  min-height: 100vh;
  overflow-x: hidden;
  display: flex;
`;

export const ProfileWrapper = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  margin: 32px;
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
`;

export const TitleText = styled.div`
  color: white;
  ${Heading1}
  margin-bottom: 32px;
`;

export const Subheading = styled.div`
  position: absolute;
  width: 100vw;
  bottom: -200px;
  left: 64px;
  font-size: 24px;
  font-weight: 300;
  z-index: -1;

  @media only screen and (max-width: ${PAGE_CONTENT_WIDTH}px) {
    left: 32px;
  }
`;

export const Column1 = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-end;
  padding: 64px;
  max-width: 1000px;
  flex-direction: column;

  @media only screen and (max-width: ${PAGE_CONTENT_WIDTH}px) {
    padding: 32px;
  }
`;

export const Column2 = styled.div`
  display: flex;
  height: 100vh;
  min-width: ${({ loggedIn }) => (loggedIn ? '0' : '500px')};
  ${({ loggedIn }) => loggedIn && 'max-width: 320px;'};

  @media only screen and (max-width: 1024px) {
    min-width: ${({ loggedIn }) => (loggedIn ? '100px' : '480px')};
    ${({ loggedIn }) => loggedIn && 'max-width: 25%;'};
    align-items: none;
  }
`;

export const BackgroundImage = styled.div`
  display: flex;
  width: 100vw;
  background-color: ${({ theme }) => theme.primaryExtraDark};
  background: url(${LandingImage});
  background-size: cover;
  background-position: center left;
  height: 65vh;
  max-height: 800px;
`;

export const AuthContent = styled.div`
  margin: auto;
`;
