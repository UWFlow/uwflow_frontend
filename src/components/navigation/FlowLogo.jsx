import React from 'react';

import { FlowLogoWrapper, BlueText } from './styles/FlowLogo';
import { LANDING_PAGE_ROUTE } from '../../Routes';

const FlowLogo = () => (
  <FlowLogoWrapper to={LANDING_PAGE_ROUTE}>
    UW <BlueText>Flow</BlueText>
  </FlowLogoWrapper>
);

export default FlowLogo;