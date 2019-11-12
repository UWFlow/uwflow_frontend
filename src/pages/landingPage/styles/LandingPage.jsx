import styled from 'styled-components';
import { Heading1 } from '../../../constants/Mixins';

import { PAGE_CONTENT_WIDTH } from '../../../constants/PageConstants';

export const LandingPageWrapper = styled.div`
  width: 100vw;
  min-height: 100vh;
  display: flex;
`;

export const ProfileWrapper = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  padding: 64px;
`;

export const TitleText = styled.div`
  ${Heading1}
  color: ${({ theme }) => theme.dark1};
  margin-bottom: 16px;
`;

export const Subheading = styled.div`
  color: ${({ theme }) => theme.dark3};
  font-size: 24px;
  font-weight: 300;
  margin-top: 32px;
`;

export const Column1TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 64px;
  flex: 1;
  width: 100%;
`;

export const Column1 = styled.div`
  background-color: white;
  position: relative;
  display: flex;
  flex-direction: column;
  flex: 3;

  @media only screen and (max-width: ${PAGE_CONTENT_WIDTH}px) {
    padding-left: 0;
  }
`;

export const Column2 = styled.div`
  position: relative;
  display: flex;
  flex: 1;
  min-width: ${({ loggedIn }) => loggedIn ? '0' : '500px'};
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