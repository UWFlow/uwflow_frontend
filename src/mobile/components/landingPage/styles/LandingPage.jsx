import styled from 'styled-components';
import {
  Heading1,
  Heading3,
  PageContentZIndex,
  PageContent,
} from '../../../../constants/Mixins';

import { FOOTER_HEIGHT } from '../../../../components/navigation/Footer';

export const LandingPageWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  min-height: calc(100vh - ${FOOTER_HEIGHT}px);
`;

export const LogoProfileWrapper = styled.div`
  width: 100%;
  flex: 1;
  display: flex;
  justify-content: space-between;
  padding: 16px;
  min-height: 80px;
  background-color: ${({ theme }) => theme.white};
`;

export const LandingPageContent = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
  margin-top: 80px;
  flex: 1;
  padding: 16px;
`;

export const TitleText = styled.div`
  ${Heading1}
  color: ${({ theme }) => theme.dark1};
  margin-bottom: 16px;
`;

export const Subheading = styled.div`
  ${Heading3}
  color: ${({ theme }) => theme.dark2};
  margin-top: 16px;
  font-size: 24px;
  font-weight: 400;
  line-height: 1.5; 
`;

export const TextSpacing = styled.div`
  content: '';
  min-height: 16px;
`;