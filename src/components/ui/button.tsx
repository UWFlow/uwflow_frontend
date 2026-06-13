import React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, VariantProps } from 'class-variance-authority';

import { cn } from 'lib/utils';

// Variants use the GlobalTheme-derived Tailwind tokens (see tailwind.config.js)
// rather than shadcn's semantic CSS variables, matching this project's palette.
const buttonVariants = cva(
  // The browser's default outset <button> border is removed by the
  // Preflight-style `border-width: 0; border-style: solid` base rule in
  // src/index.css, so variants only flip border-width/-color to opt into one.
  'cursor-pointer whitespace-nowrap rounded text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-white hover:bg-primaryDark',
        // Gold CTA matching the app's styled-components Button (theme.accent).
        accent: 'bg-accent text-dark1 hover:bg-accentDark',
        destructive: 'bg-red text-white hover:bg-darkRed',
        // The base rule already sets border-style: solid, so `border`
        // (border-width 1) on its own draws the outline.
        outline: 'border border-light1 bg-white text-dark1 hover:bg-light1',
        secondary: 'bg-light2 text-dark1 hover:bg-light3',
        ghost: 'text-dark1 hover:bg-light1',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded px-3',
        lg: 'h-11 rounded px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
