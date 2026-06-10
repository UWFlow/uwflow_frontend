import React, { useState } from 'react';
import { MousePointer, Repeat } from 'react-feather';

import {
  MiniBlock,
  MiniCursor,
  MiniDayBody,
  MiniDayColumn,
  MiniDayLabel,
  TourActions,
  TourBody,
  TourDot,
  TourDots,
  TourEyebrow,
  TourFooter,
  TourHeading,
  TourIllustration,
  TourNext,
  TourSkip,
  TourText,
  TourWrapper,
} from './styles/SwapTourModalContent';

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
    <TourWrapper>
      <TourIllustration aria-hidden>
        <MiniDayColumn>
          <MiniDayLabel>MON</MiniDayLabel>
          <MiniDayBody>
            <MiniBlock fill="#eef4ff" accent="#0052cc">
              CS 241
            </MiniBlock>
            <MiniBlock fill="#eef4ff" accent="#0052cc" offsetTop={10}>
              MATH
            </MiniBlock>
          </MiniDayBody>
        </MiniDayColumn>
        <MiniDayColumn>
          <MiniDayLabel>TUE</MiniDayLabel>
          <MiniDayBody>
            <MiniBlock fill="#fff7e0" accent="#e8b300" offsetTop={14}>
              STAT
            </MiniBlock>
          </MiniDayBody>
        </MiniDayColumn>
        <MiniDayColumn>
          <MiniDayLabel>WED</MiniDayLabel>
          <MiniDayBody>
            <MiniBlock fill="#eef4ff" accent="#0052cc" highlighted>
              CS 241
            </MiniBlock>
            <MiniBlock fill="#e6f2fb" accent="#2b8fcd" offsetTop={18}>
              ENGL
            </MiniBlock>
            <MiniCursor>
              <MousePointer size={14} />
            </MiniCursor>
          </MiniDayBody>
        </MiniDayColumn>
      </TourIllustration>

      <TourBody>
        <TourEyebrow>
          <Repeat size={13} /> Class swapper
        </TourEyebrow>
        <TourHeading>{STEPS[step].heading}</TourHeading>
        <TourText>{STEPS[step].body}</TourText>
        <TourFooter>
          <TourDots>
            {STEPS.map((_, i) => (
              // eslint-disable-next-line react/no-array-index-key
              <TourDot key={i} active={i === step} />
            ))}
          </TourDots>
          <TourActions>
            {!isLastStep && <TourSkip onClick={onRequestClose}>Skip</TourSkip>}
            <TourNext
              onClick={() =>
                isLastStep ? onRequestClose() : setStep(step + 1)
              }
            >
              {isLastStep ? 'Done' : 'Next'}
            </TourNext>
          </TourActions>
        </TourFooter>
      </TourBody>
    </TourWrapper>
  );
};

export default SwapTourModalContent;
