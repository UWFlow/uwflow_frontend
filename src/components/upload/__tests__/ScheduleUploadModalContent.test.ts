import { SCHEDULE_ERRORS } from 'constants/Messages';

import { getScheduleError } from '../ScheduleUploadModalContent';

/**
 * The backend reports only a coarse enum for a failed schedule paste:
 * `empty_schedule` for anything with a term header but no class numbers, and a
 * bare `bad_request` when it could not find a term header at all. Those cases
 * are indistinguishable server side, so the client disambiguates them from the
 * pasted text.
 */
describe('getScheduleError', () => {
  // Quest renders this "Go To" nav entry on every page, including a My Class
  // Schedule page for a term the user has no classes in.
  const questNav = `Go To
Course Selection (Undergrad only)
Search for Classes
Enroll`;

  const emptyTermPaste = `${questNav}
My Class Schedule
Fall 2026 | Undergraduate | University of Waterloo
You are not registered for classes in this term.`;

  describe('empty_schedule', () => {
    it('reports an empty term for a My Class Schedule paste with no enrolments', () => {
      expect(getScheduleError('empty_schedule', emptyTermPaste)).toBe(
        SCHEDULE_ERRORS.not_registered_schedule,
      );
    });

    it('does not mistake the Go To nav link for the Course Selection page', () => {
      expect(getScheduleError('empty_schedule', emptyTermPaste)).not.toBe(
        SCHEDULE_ERRORS.course_selection_schedule,
      );
    });

    it('hints at My Class Schedule when the Course Selection cart was pasted', () => {
      const paste = `${questNav}
 \tCourse Selection\t \t \t|\t \t \tView My Course Selection\t
Fall 2026 | Undergraduate | University of Waterloo
ECE 105 - Classical Mechanics`;

      expect(getScheduleError('empty_schedule', paste)).toBe(
        SCHEDULE_ERRORS.course_selection_schedule,
      );
    });

    it('matches the Course Selection page by its own heading', () => {
      // Some pastes carry only the heading, without the tab bar.
      const paste = `My Course Selection
Groupbox
Fall 2026
Undergraduate
Subject	Catalog	Description	Component	Priority	Campus`;

      expect(getScheduleError('empty_schedule', paste)).toBe(
        SCHEDULE_ERRORS.course_selection_schedule,
      );
    });

    it('does not mistake the Enrollment Dates page for Course Selection', () => {
      // "Course Selection Session" is a row label on Enrollment Dates.
      const paste = `Enrollment Dates
Fall 2026 | Undergraduate | University of Waterloo
Open Enrollment Dates by Session
Session	Begins On	Last Date to Enroll
Regular Academic Session
2026 July 29
Course Selection Session
2026 July 29`;

      expect(getScheduleError('empty_schedule', paste)).toBe(
        SCHEDULE_ERRORS.empty_schedule,
      );
    });

    it('falls back to the generic empty-schedule message', () => {
      expect(
        getScheduleError('empty_schedule', 'Fall 2026 | Undergraduate'),
      ).toBe(SCHEDULE_ERRORS.empty_schedule);
    });
  });

  describe('bad_request', () => {
    it('explains the missing term header when the paste has no term', () => {
      // Selection started below Quest's term header: the class table alone.
      const paste = `AFM 462 - Topics: Taxation
Class Nbr	Section	Component	Days & Times
3422
001
LEC
M 1:00PM - 2:50PM
09/09/2026 - 12/08/2026`;

      expect(getScheduleError('bad_request', paste)).toBe(
        SCHEDULE_ERRORS.no_term_schedule,
      );
    });

    it('falls back to the generic message when a term header is present', () => {
      expect(getScheduleError('bad_request', emptyTermPaste)).toBe(
        SCHEDULE_ERRORS.default_schedule,
      );
    });
  });

  it('passes through enums that map directly to a message', () => {
    expect(getScheduleError('old_schedule', emptyTermPaste)).toBe(
      SCHEDULE_ERRORS.old_schedule,
    );
  });

  it('falls back to the default message for an unknown enum', () => {
    expect(getScheduleError('internal_error', emptyTermPaste)).toBe(
      SCHEDULE_ERRORS.default_schedule,
    );
  });
});
