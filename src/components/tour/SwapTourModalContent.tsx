import React, { useState } from 'react';
import { MousePointer, Repeat } from 'react-feather';

import { cn } from 'lib/utils';

export type SwapTourModalContentProps = {
  onRequestClose: () => void;
};

const STEPS = [
  {
    heading: 'Click a class to start',
    body:
      'Tap any block in your schedule to pull up every other section — ' +
      'with prof ratings, rooms, and open seats.',
  },
  {
    heading: 'Compare sections',
    body:
      'See meeting times, rooms, professor ratings, and how many seats ' +
      'are open — conflicts and full sections are flagged automatically.',
  },
  {
    heading: 'Preview before you switch',
    body:
      'Hover any open section to preview it on your calendar before you ' +
      'make the change in Quest.',
  },
];

type MiniBlockProps = {
  fill: string;
  accent: string;
  highlighted?: boolean;
  offsetTop?: number;
  children: React.ReactNode;
};

const MiniBlock = ({
  fill,
  accent,
  highlighted,
  offsetTop,
  children,
}: MiniBlockProps) => (
  <div
    className={cn(
      'rounded-[3px] border-l-[3px] px-[5px] py-1 text-[9px] font-semibold text-dark1',
      highlighted && 'shadow-[0_0_0_2px_#0052cc]',
    )}
    style={{
      background: fill,
      borderLeftColor: accent,
      marginTop: offsetTop ?? 0,
    }}
  >
    {children}
  </div>
);

/**
 * First-visit tour for the section-swap page. The host page persists
 * dismissal (Skip, X, or finishing the last step) via its onRequestClose
 * override, so the tour only ever shows once.
 */
const SwapTourModalContent = ({
  onRequestClose,
}: SwapTourModalContentProps) => {
  const [step, setStep] = useState(0);
  const isLastStep = step === STEPS.length - 1;

  return (
    <div className="flex w-[400px] max-w-[90vw] flex-col overflow-hidden rounded-xl bg-white">
      {/* Decorative mini-calendar band */}
      <div
        className="flex justify-center gap-3 border-b border-light2 bg-[#fafbfc] px-6 py-7"
        aria-hidden
      >
        <div className="flex w-[76px] flex-col gap-2">
          <div className="text-center text-[10px] font-semibold tracking-[0.06em] text-dark3">
            MON
          </div>
          <div className="relative flex h-24 flex-col gap-1.5 rounded-md border border-light2 bg-white px-1.5 py-2">
            <MiniBlock fill="#eef4ff" accent="#0052cc">
              CS 241
            </MiniBlock>
            <MiniBlock fill="#eef4ff" accent="#0052cc" offsetTop={10}>
              MATH
            </MiniBlock>
          </div>
        </div>
        <div className="flex w-[76px] flex-col gap-2">
          <div className="text-center text-[10px] font-semibold tracking-[0.06em] text-dark3">
            TUE
          </div>
          <div className="relative flex h-24 flex-col gap-1.5 rounded-md border border-light2 bg-white px-1.5 py-2">
            <MiniBlock fill="#fff7e0" accent="#e8b300" offsetTop={14}>
              STAT
            </MiniBlock>
          </div>
        </div>
        <div className="flex w-[76px] flex-col gap-2">
          <div className="text-center text-[10px] font-semibold tracking-[0.06em] text-dark3">
            WED
          </div>
          <div className="relative flex h-24 flex-col gap-1.5 rounded-md border border-light2 bg-white px-1.5 py-2">
            <MiniBlock fill="#eef4ff" accent="#0052cc" highlighted>
              CS 241
            </MiniBlock>
            <MiniBlock fill="#e6f2fb" accent="#2b8fcd" offsetTop={18}>
              ENGL
            </MiniBlock>
            <div className="absolute right-1 top-[26px] text-dark1">
              <MousePointer size={14} />
            </div>
          </div>
        </div>
      </div>

      {/* Copy + controls */}
      <div className="flex flex-col px-7 pb-7 pt-6">
        <div className="mb-2 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.08em] text-accentDark">
          <Repeat size={13} /> Class swapper
        </div>
        <h2 className="mb-2 text-[24px] font-bold text-dark1">
          {STEPS[step].heading}
        </h2>
        <p className="mb-6 text-sm leading-normal text-dark2">
          {STEPS[step].body}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            {STEPS.map((_, i) => (
              <div
                // eslint-disable-next-line react/no-array-index-key
                key={i}
                className={cn(
                  'h-[7px] rounded-[4px] transition-[width] duration-150 ease-in-out',
                  i === step ? 'w-5 bg-primary' : 'w-[7px] bg-light3',
                )}
              />
            ))}
          </div>
          <div className="flex items-center gap-4">
            {!isLastStep && (
              <button
                type="button"
                className="cursor-pointer bg-transparent p-0 text-sm text-dark2 hover:text-dark1"
                onClick={onRequestClose}
              >
                Skip
              </button>
            )}
            <button
              type="button"
              className="cursor-pointer rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-white hover:bg-primaryDark"
              onClick={() =>
                isLastStep ? onRequestClose() : setStep(step + 1)
              }
            >
              {isLastStep ? 'Done' : 'Next'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SwapTourModalContent;
