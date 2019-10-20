import styled from 'styled-components';
import {
  Heading1,
  Heading3,
  PageContentZIndex,
  PageContent
} from '../../../../constants/Mixins';

export const LandingPageWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  width: 100vw;
  height: 100%;
  ${PageContentZIndex}
`;

export const LandingPageContent = styled.div`
  ${PageContent}
  display: flex;
  flex-direction: row;
  margin: auto;
  height: 100%;
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

export const Column1 = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  margin-right: 120px;
`;

export const Column2 = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  padding: 0 120px;
`;

export const BlueBackground = styled.div`
  background:${({ theme }) => theme.primaryExtraDark};
  mix-blend-mode: multiply;
  opacity: 0.8;
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
  width: calc(100%);
  z-index: -2;
`;

export const AuthContent = styled.div`
  position: relative;
  margin: 96px auto;
`;