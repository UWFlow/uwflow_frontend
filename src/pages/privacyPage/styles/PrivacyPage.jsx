import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';
import PageHeaderBackground from '../../../img/generic.svg';
import {
  PageContent,
  Heading2,
  Heading3,
  Body,
  PageWrapper as _PageWrapper,
} from '../../../constants/Mixins';
import FadeIn from 'react-fade-in';

export const PageWrapper = styled.div`
  ${_PageWrapper}
`;

export const PageHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  width: 100%;
  height: 208px;
  background-image: url(${PageHeaderBackground});
  background-color: ${({ theme }) => theme.primaryExtraDark};
  background-size: cover;
  background-repeat: no-repeat;
  will-change: transform;
  padding-bottom: 32px;
  margin-bottom: 32px;

  ${breakpoint('mobile', 'tablet')`
    height: auto;
    padding: 32px 16px;
  `}
`;

export const HeaderText = styled(FadeIn)`
  ${PageContent}
  ${Heading2}
  max-width: 800px;
  color: white;
`;

export const PageContentWrapper = styled(FadeIn)`
  ${PageContent}
  max-width: 800px;
  margin: auto;

  ${breakpoint('mobile', 'tablet')`
    padding: 0 16px 16px 16px;
  `}
`;

export const PageBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  height: 100%;
`;

export const PageBodyHeader = styled.div`
  ${Heading3}
  margin: 8px 0;
`;

export const PageBodyParagraph = styled.div`
  ${Body}
  line-height: 1.5;
  margin-bottom: 32px;
`;
