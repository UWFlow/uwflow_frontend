import React from 'react';

import {
  PageWrapper,
  PageHeader,
  HeaderText,
  PageContentWrapper
} from './styles/PrivacyPage';

import PrivacyContent from '../../../sharedComponents/privacyPage/PrivacyContent';

const PrivacyPage = () => (
  <PageWrapper>
    <PageHeader>
      <HeaderText>Privacy Policy</HeaderText>
    </PageHeader>
    <PageContentWrapper>
      <PrivacyContent />
    </PageContentWrapper>
  </PageWrapper>
);

export default PrivacyPage;
