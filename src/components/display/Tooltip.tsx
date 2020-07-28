import React, { ReactChild, ReactElement } from 'react';

import { TooltipWrapper } from './styles/Tooltip';

type TooltipProps = {
  children: ReactElement;
  content: ReactChild;
};

const Tooltip = ({ children, content }: TooltipProps) => (
  <TooltipWrapper content={content} arrow={false} duration={200}>
    {children}
  </TooltipWrapper>
);

export default Tooltip;
