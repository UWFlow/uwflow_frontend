import styled from 'styled-components';
import {
  Heading1,
  Heading3,
  PageContentZIndex,
  PageContent,
} from '../../../../constants/Mixins';

export const LandingPageWrapper = styled.div`
  width: 100%;
  height: 100%;
  ${PageContentZIndex}
`;

export const LandingPageContent = styled.div`
  ${PageContent}
  display: flex;
  flex-direction: column;
  margin: auto;
  height: 100%;
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
  font-weight: 300;
  line-height: 2.0; 
`;
