import React, { useState } from 'react';
import { Users } from 'react-feather';

import { cn } from 'lib/utils';

export type SharedClassesTourModalContentProps = {
  onRequestClose: () => void;
};

const STEPS = [
  {
    heading: 'See the classes you share',
    body:
      'Make a group with friends and instantly see which sections you have ' +
      'together, using the schedule Flow already has. Nothing to fill in.',
  },
  {
    heading: 'Invite by email',
    body:
      'Add friends by their UW Flow email. They see the invite and choose to ' +
      'join, and nothing about you is shared until they accept.',
  },
  {
    heading: 'Compare on the calendar',
    body:
      'Shared classes show up on a weekly calendar, colored by section type, ' +
      'so you can see exactly where your timetables line up.',
  },
];

// Light tints for the sample avatars, matching the section colors used
// elsewhere. One-off decorative sizes stay as fixed values.
const AVATAR =
  'flex h-7 w-7 items-center justify-center rounded-full text-xs ' +
  'font-semibold text-dark1';

/**
 * First-visit tour for the Shared Classes page. The host page persists
 * dismissal (Skip, X, backdrop, or Done) via its onRequestClose override, so
 * the tour only ever shows once.
 */
const SharedClassesTourModalContent = ({
  onRequestClose,
}: SharedClassesTourModalContentProps) => {
  const [step, setStep] = useState(0);
  const isLastStep = step === STEPS.length - 1;

  return (
    <div className="flex w-[400px] max-w-[90vw] flex-col overflow-hidden rounded-xl bg-white">
      {/* Decorative band: two people and a shared class block. */}
      <div
        className="flex items-center justify-center gap-lg border-b border-light2 bg-[#fafbfc] px-lg py-lg"
        aria-hidden
      >
        <div className="flex items-center">
          <span className={cn(AVATAR, 'bg-lecture')}>AZ</span>
          <span className={cn(AVATAR, 'bg-tutorial -ml-2')}>JK</span>
          <span className={cn(AVATAR, 'bg-lab -ml-2')}>MP</span>
        </div>
        <div className="flex w-[86px] flex-col gap-xs">
          <div className="text-center text-xs font-semibold tracking-[0.06em] text-dark3">
            WED
          </div>
          <div className="flex h-24 flex-col gap-xs rounded-md border border-light2 bg-white px-sm py-sm">
            <div
              className="rounded-card border-l-[3px] border-l-primary px-xs py-xs text-xs font-semibold text-dark1 shadow-[0_0_0_2px_theme(colors.primary)]"
              style={{ background: '#eef4ff' }}
            >
              CS 241
            </div>
            <div
              className="rounded-card border-l-[3px] px-xs py-xs text-xs font-semibold text-dark1"
              style={{ background: '#efeaff', borderLeftColor: '#6b5bd0' }}
            >
              MATH
            </div>
          </div>
        </div>
      </div>

      {/* Copy + controls */}
      <div className="flex flex-col px-lg pb-lg pt-lg">
        <div className="mb-sm flex items-center gap-sm text-xs font-bold uppercase tracking-[0.08em] text-primary">
          <Users size={13} /> Shared Classes
        </div>
        <h2 className="mb-sm text-2xl font-bold text-dark1">
          {STEPS[step].heading}
        </h2>
        <p className="mb-lg text-sm leading-normal text-dark2">
          {STEPS[step].body}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-sm">
            {STEPS.map((_, i) => (
              <div
                // eslint-disable-next-line react/no-array-index-key
                key={i}
                className={cn(
                  'h-[7px] rounded-card transition-[width] duration-150 ease-in-out',
                  i === step ? 'w-5 bg-primary' : 'w-[7px] bg-light3',
                )}
              />
            ))}
          </div>
          <div className="flex items-center gap-md">
            {!isLastStep && (
              <button
                type="button"
                className="cursor-pointer bg-transparent p-0 font-inter text-sm text-dark2 hover:text-dark1"
                onClick={onRequestClose}
              >
                Skip
              </button>
            )}
            <button
              type="button"
              className="cursor-pointer rounded-lg bg-primary px-lg py-sm font-inter text-sm font-semibold text-white hover:bg-primaryDark"
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

export default SharedClassesTourModalContent;
