import { buttonVariants } from './button';

describe('buttonVariants', () => {
  it('emits shadcn variant classes for Tailwind', () => {
    const className = buttonVariants({ size: 'icon', variant: 'ghost' });

    expect(className).toContain('h-10');
    expect(className).toContain('w-10');
    expect(className).toContain('hover:bg-accent');
  });
});
