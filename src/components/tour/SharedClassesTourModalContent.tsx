import React from 'react';
import { Users } from 'react-feather';

import { TourContent } from 'components/ui/tour';
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
      'Shared classes use matching course colors in the cards and weekly calendar. ' +
      'On smaller screens, use the class cards to compare your schedules.',
  },
];

// Sample avatars use the same section-color tints as the calendar.
const AVATAR =
  'flex h-7 w-7 items-center justify-center rounded-full text-xs ' +
  'font-semibold text-dark1';

// First-visit tour for the Shared Classes page; the host page shows it once.
const SharedClassesTourModalContent = ({
  onRequestClose,
}: SharedClassesTourModalContentProps) => {
  return (
    <TourContent
      label={
        <>
          <Users size={13} /> Shared Classes
        </>
      }
      steps={STEPS}
      onRequestClose={onRequestClose}
      illustration={
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
      }
    />
  );
};

export default SharedClassesTourModalContent;
