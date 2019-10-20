import styled from 'styled-components';
import {
  Heading1,
  Heading3,
} from '../../../../constants/Mixins';

import { PAGE_CONTENT_WIDTH } from '../../../../constants/PageConstants';

export const LandingPageWrapper = styled.div`
  width: 100vw;
  min-height: 100vh;
  display: flex;
  padding-left: 32px;
`;

export const LogoWrapper = styled.div`
  position: absolute;
  top: 32px;
  left: 0;
`;

export const TitleText = styled.div`
  ${Heading1}
  color: ${({ theme }) => theme.dark1};
  margin-bottom: 16px;
  margin-top: 256px;
`;

export const Subheading = styled.div`
  ${Heading3}
  color: ${({ theme }) => theme.dark2};
  margin-top: 16px;
  font-size: 24px;
  font-weight: 300;
  line-height: 2.0; 
`;

export const Column1TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
  position: relative;
`;

export const Column1 = styled.div`
  position: relative;
  display: flex;
  flex: 1;
  flex-direction: column;
  margin-right: 120px;
  padding-bottom: 160px;
  padding-left: calc(60% - ${PAGE_CONTENT_WIDTH}px - 120px);

  @media only screen and (max-width: ${PAGE_CONTENT_WIDTH}px) {
    padding-left: 0;
  }
`;

export const Column2 = styled.div`
  position: relative;
  display: flex;
  flex: 1;
  width: 40%;
  min-width: ${({ loggedIn }) => loggedIn ? '0' : '600px'};
  align-items: center;
  ${({ loggedIn }) => loggedIn ? 'max-width: 320px;' : ''}

  @media only screen and (max-width: 1024px) {
    min-width: ${({ loggedIn }) => loggedIn ? '100px' : '480px'};
    ${({ loggedIn }) => loggedIn ? 'max-width: 25%;' : ''}
    align-items: none;
  }
`;

export const BlueBackground = styled.div`
  background:${({ theme }) => theme.primaryExtraDark};
  mix-blend-mode: multiply;
  opacity: 0.85;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: -1;
`;

export const BackgroundImage = styled.div`
  background: url(${({ image }) => image}) no-repeat center center fixed;
  background-size: cover;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: -2;
`;

export const AuthContent = styled.div`
  position: relative;
  margin: auto;
`;