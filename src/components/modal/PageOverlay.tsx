import React from 'react';

import { cn } from 'lib/utils';

type PageOverlayProps = {
  visible: boolean;
  children: React.ReactNode;
};

// Full-page frosted overlay that fades in over a page's content, used for
// first-visit prompts (transcript/schedule upload, login).
const PageOverlay = ({ visible, children }: PageOverlayProps) => (
  <div
    className={cn(
      'fixed inset-0 z-10 box-border flex items-start justify-center overflow-y-auto bg-white/55 backdrop-blur [transition:opacity_0.4s_ease]',
      visible
        ? 'pointer-events-auto opacity-100'
        : 'pointer-events-none opacity-0',
    )}
  >
    <div className="mt-[150px] flex justify-center">{children}</div>
  </div>
);

export default PageOverlay;
