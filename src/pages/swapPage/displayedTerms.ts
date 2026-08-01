import { UserScheduleFragment } from 'generated/graphql';

import { getCurrentTermCode, getNextTermCode } from 'utils/Misc';

// Whether the schedule has classes in each of the two terms the swap calendar
// shows (current + next). Drives the default term in SwapCalendar and the
// "Import your schedule from Quest" empty-state prompt in SwapPage, so it sits
// outside the component that both of them can reach. Sections carry their own
// term_id, so this never has to infer a term from meeting dates.
export const getDisplayedTermPresence = (
  schedule: UserScheduleFragment['schedule'],
) => {
  const thisTermCode = getCurrentTermCode();
  const nextTermCode = getNextTermCode();
  return {
    thisHasData: schedule.some(
      (entry) => entry.section.term_id === thisTermCode,
    ),
    nextHasData: schedule.some(
      (entry) => entry.section.term_id === nextTermCode,
    ),
  };
};
