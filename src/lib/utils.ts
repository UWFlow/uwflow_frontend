import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merge class names with Tailwind-aware conflict resolution.
 * Used by shadcn/ui components and any Tailwind-styled component.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
