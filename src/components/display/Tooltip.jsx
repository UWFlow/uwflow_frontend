import React from 'react';

/* Styled Components */
import { TooltipWrapper } from './styles/Tooltip';

const Tooltip = props => (
  <TooltipWrapper {...props} effect="solid" html={true} />
);

export default Tooltip;
