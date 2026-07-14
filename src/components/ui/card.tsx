import React from 'react';

import { cn } from 'lib/utils';

const Card = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn('rounded-lg bg-white p-md shadow-box', className)}
    {...props}
  />
);

const CardHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'mb-sm flex items-center gap-xs text-sm text-dark2',
      className,
    )}
    {...props}
  />
);

export { Card, CardHeader };
