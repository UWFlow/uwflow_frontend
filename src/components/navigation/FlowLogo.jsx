import React from 'react';

import { LANDING_PAGE_ROUTE } from 'Routes';
import { FlowLogoWrapper, BlueText } from './styles/FlowLogo';

const FlowLogo = () => (
  <FlowLogoWrapper to={LANDING_PAGE_ROUTE}>
    UW <BlueText>Flow</BlueText>
  </FlowLogoWrapper>
);

export default FlowLogo;
