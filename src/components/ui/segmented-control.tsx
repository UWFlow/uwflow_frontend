import React from 'react';

import { cn } from 'lib/utils';

interface SegmentedControlContextValue {
  value: string;
  setValue: (value: string) => void;
  // Whether `value` matches an option, and the first option's value. Together
  // they keep one keyboard-reachable stop when it does not: a radio group with
  // every option at tabIndex -1 cannot be tabbed into at all.
  hasSelection: boolean;
  firstValue: string;
}

const SegmentedControlContext =
  React.createContext<SegmentedControlContextValue | null>(null);

function useSegmentedControl() {
  const context = React.useContext(SegmentedControlContext);
  if (!context) {
    throw new Error(
      'SegmentedControlOption must be used within a SegmentedControl',
    );
  }
  return context;
}

export interface SegmentedControlProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'defaultValue'> {
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  value?: string;
}

/**
 * A row of mutually exclusive options that filter what the surrounding view
 * shows — a term switcher, for example. Unlike `Tabs` it does not own panels:
 * the caller keeps rendering one region and swaps the data inside it.
 *
 * Exposed as a radio group rather than a tablist for that reason, so it gets
 * the arrow-key navigation and roving tabindex a radio group is expected to
 * have. Give it an `aria-label` naming what is being chosen.
 */
const SegmentedControl = React.forwardRef<
  HTMLDivElement,
  SegmentedControlProps
>(
  (
    {
      defaultValue = '',
      value: controlledValue,
      onValueChange,
      className,
      onKeyDown,
      ...props
    },
    ref,
  ) => {
    const [uncontrolledValue, setUncontrolledValue] =
      React.useState(defaultValue);
    const value = controlledValue ?? uncontrolledValue;
    const setValue = (nextValue: string) => {
      if (controlledValue === undefined) setUncontrolledValue(nextValue);
      onValueChange?.(nextValue);
    };
    const optionValues = React.Children.toArray(props.children)
      .filter(React.isValidElement)
      .map(
        (child) =>
          (child as React.ReactElement<{ value?: string }>).props.value,
      )
      .filter(
        (optionValue): optionValue is string => optionValue !== undefined,
      );

    return (
      <SegmentedControlContext.Provider
        value={{
          value,
          setValue,
          hasSelection: optionValues.includes(value),
          firstValue: optionValues[0] ?? '',
        }}
      >
        <div
          ref={ref}
          role="radiogroup"
          className={cn(
            'inline-flex shrink-0 gap-xs rounded-card border border-solid border-light3 bg-white p-xs',
            className,
          )}
          onKeyDown={(event) => {
            onKeyDown?.(event);
            if (
              event.defaultPrevented ||
              !['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(
                event.key,
              )
            )
              return;
            const options = Array.from(
              event.currentTarget.querySelectorAll<HTMLButtonElement>(
                '[role="radio"]:not(:disabled)',
              ),
            );
            const currentIndex = options.indexOf(
              document.activeElement as HTMLButtonElement,
            );
            if (currentIndex < 0) return;
            const step =
              event.key === 'ArrowRight' || event.key === 'ArrowDown' ? 1 : -1;
            const next =
              options[(currentIndex + step + options.length) % options.length];
            next?.focus();
            next?.click();
            event.preventDefault();
          }}
          {...props}
        />
      </SegmentedControlContext.Provider>
    );
  },
);
SegmentedControl.displayName = 'SegmentedControl';

export interface SegmentedControlOptionProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'value'> {
  value: string;
}

const SegmentedControlOption = React.forwardRef<
  HTMLButtonElement,
  SegmentedControlOptionProps
>(({ value: optionValue, className, onClick, ...props }, ref) => {
  const { value, setValue, hasSelection, firstValue } = useSegmentedControl();
  const selected = value === optionValue;
  const focusable = selected || (!hasSelection && optionValue === firstValue);
  return (
    <button
      ref={ref}
      type="button"
      role="radio"
      aria-checked={selected}
      tabIndex={focusable ? 0 : -1}
      className={cn(
        'box-border h-xl cursor-pointer rounded-card border-none bg-transparent px-md font-inter text-sm font-semibold text-dark3 transition-all duration-hover ease-hover hover:brightness-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset',
        selected && 'bg-light2 text-dark1',
        className,
      )}
      onClick={(event) => {
        setValue(optionValue);
        onClick?.(event);
      }}
      {...props}
    />
  );
});
SegmentedControlOption.displayName = 'SegmentedControlOption';

export { SegmentedControl, SegmentedControlOption };
