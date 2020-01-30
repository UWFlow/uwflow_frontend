import React from 'react';

/* Styled Components */
import { TooltipWrapper } from './styles/Tooltip';

const Tooltip = ({ children, content }) => (
  <TooltipWrapper content={content} arrow={false} duration={200}>
    {children}
  </TooltipWrapper>
);

export default Tooltip;
