import React from 'react';

import {
  PageWrapper,
  PageHeader,
  HeaderText,
  PageContentWrapper,
} from './styles/AboutPage';

import AboutContent from '../../../components/aboutPage/AboutContent';

const AboutPage = () => (
  <PageWrapper>
    <PageHeader>
      <HeaderText>About Flow</HeaderText>
    </PageHeader>
    <PageContentWrapper>
      <AboutContent />
    </PageContentWrapper>
  </PageWrapper>
);

export default AboutPage;
