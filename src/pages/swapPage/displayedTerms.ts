import { UserScheduleFragment } from 'generated/graphql';

import {
  getCurrentTermCode,
  getNextTermCode,
  termCodeToDate,
} from 'utils/Misc';

// The swap calendar only ever shows two terms: the current one and the next.
// The calendar's term tabs and SwapPage's "import from Quest" empty state both
// key off this pair, so it lives in one place rather than being re-derived.
export const getDisplayedTerms = () => {
  const thisTermCode = getCurrentTermCode();
  const nextTermCode = getNextTermCode();
  return {
    thisTermCode,
    nextTermCode,
    thisTermLabel: termCodeToDate(thisTermCode),
    nextTermLabel: termCodeToDate(nextTermCode),
  };
};

// Whether the schedule has classes in each of the two displayed terms. Drives
// the calendar's default term and the "Import your schedule from Quest" prompt
// in SwapPage. Sections carry their own term_id, so this never has to infer a
// term from meeting dates.
export const getDisplayedTermPresence = (
  schedule: UserScheduleFragment['schedule'],
) => {
  const { thisTermCode, nextTermCode } = getDisplayedTerms();
  return {
    thisHasData: schedule.some(
      (entry) => entry.section.term_id === thisTermCode,
    ),
    nextHasData: schedule.some(
      (entry) => entry.section.term_id === nextTermCode,
    ),
  };
};
