import { UserScheduleFragment } from 'generated/graphql';

import {
  getScheduleFingerprint,
  getSwapCalendarStorageKey,
  loadSwapCalendarState,
  saveSwapCalendarState,
  SwapCalendarState,
} from './SwapCalendarStorage';

const createSchedule = (
  userId: number,
  sectionId: number,
  courseCode = 'CS135',
): UserScheduleFragment['schedule'] => [
  {
    user_id: userId,
    section: {
      id: sectionId,
      term_id: 1269,
      section_name: 'LEC 001',
      exams: [],
      meetings: [
        {
          days: ['M', 'W', 'F'],
          end_date: '2026-12-03',
          end_seconds: 35400,
          is_cancelled: false,
          location: 'MC 2034',
          prof: null,
          section_id: sectionId,
          start_date: '2026-09-08',
          start_seconds: 32400,
        },
      ],
      course: {
        id: sectionId,
        code: courseCode,
        name: `Course ${courseCode}`,
      },
    },
  },
];

const createStorage = () => {
  const values: Record<string, string> = {};
  return {
    getItem: (key: string) => values[key] ?? null,
    setItem: (key: string, value: string) => {
      values[key] = value;
    },
  };
};

describe('SwapCalendarStorage', () => {
  const userId = 42;
  const baseSchedule = createSchedule(userId, 1001);
  const availableTerms = ['Fall 2026', 'Winter 2027'];

  it('restores a saved swap plan for the same user and base schedule', () => {
    const storage = createStorage();
    const state: SwapCalendarState = {
      selectedTerm: 'Fall 2026',
      selection: { courseCode: 'CS136', sectionType: 'LEC' },
      selectedSwapCourseCode: 'CS246',
      swapsByTerm: {
        'Fall 2026': [{ sourceSectionId: 1001, replacementSectionId: 2002 }],
      },
    };

    saveSwapCalendarState(userId, baseSchedule, state, storage);

    expect(
      loadSwapCalendarState(
        userId,
        baseSchedule,
        availableTerms,
        'Fall 2026',
        storage,
      ),
    ).toEqual(state);
  });

  it('rejects a saved plan after the imported schedule changes', () => {
    const storage = createStorage();
    const state: SwapCalendarState = {
      selectedTerm: 'Fall 2026',
      selection: { courseCode: 'CS135', sectionType: 'LEC' },
      selectedSwapCourseCode: null,
      swapsByTerm: {},
    };
    saveSwapCalendarState(userId, baseSchedule, state, storage);

    expect(
      loadSwapCalendarState(
        userId,
        createSchedule(userId, 3003),
        availableTerms,
        'Fall 2026',
        storage,
      ),
    ).toBeNull();
  });

  it('falls back safely when the saved term is no longer displayed', () => {
    const storage = createStorage();
    const state: SwapCalendarState = {
      selectedTerm: 'Fall 2026',
      selection: { courseCode: 'CS135', sectionType: 'LEC' },
      selectedSwapCourseCode: 'CS136',
      swapsByTerm: {
        'Fall 2026': [{ sourceSectionId: 1001, replacementSectionId: 2002 }],
      },
    };
    saveSwapCalendarState(userId, baseSchedule, state, storage);

    expect(
      loadSwapCalendarState(
        userId,
        baseSchedule,
        ['Spring 2027', 'Fall 2027'],
        'Spring 2027',
        storage,
      ),
    ).toEqual({
      selectedTerm: 'Spring 2027',
      selection: null,
      selectedSwapCourseCode: null,
      swapsByTerm: {},
    });
  });

  it('ignores malformed storage values', () => {
    const storage = createStorage();
    storage.setItem(getSwapCalendarStorageKey(userId), '{not json');

    expect(
      loadSwapCalendarState(
        userId,
        baseSchedule,
        availableTerms,
        'Fall 2026',
        storage,
      ),
    ).toBeNull();
  });

  it('drops structurally invalid saved swaps without parsing nested data', () => {
    const storage = createStorage();
    storage.setItem(
      getSwapCalendarStorageKey(userId),
      JSON.stringify({
        version: 1,
        scheduleFingerprint: getScheduleFingerprint(baseSchedule),
        selectedTerm: 'Fall 2026',
        selection: { courseCode: 'CS135', sectionType: 'LEC' },
        selectedSwapCourseCode: null,
        swapsByTerm: {
          'Fall 2026': [
            { sourceSectionId: 1001, replacementSectionId: 2002 },
            { sourceSectionId: 1001, replacementSectionId: null },
            { meetings: [null] },
          ],
        },
      }),
    );

    expect(
      loadSwapCalendarState(
        userId,
        baseSchedule,
        availableTerms,
        'Fall 2026',
        storage,
      ),
    ).toEqual({
      selectedTerm: 'Fall 2026',
      selection: { courseCode: 'CS135', sectionType: 'LEC' },
      selectedSwapCourseCode: null,
      swapsByTerm: {
        'Fall 2026': [{ sourceSectionId: 1001, replacementSectionId: 2002 }],
      },
    });
  });

  it('uses a stable fingerprint regardless of schedule order', () => {
    const schedule = [
      ...createSchedule(userId, 1001),
      ...createSchedule(userId, 2002),
    ];

    expect(getScheduleFingerprint(schedule)).toBe(
      getScheduleFingerprint([...schedule].reverse()),
    );
  });
});
