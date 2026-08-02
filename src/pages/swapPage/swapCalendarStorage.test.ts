import { UserScheduleFragment } from 'generated/graphql';

import {
  DisplayedTerm,
  getScheduleFingerprint,
  getSwapCalendarStorageKey,
  loadSwapCalendarState,
  saveSwapCalendarState,
  SwapCalendarState,
} from './swapCalendarStorage';

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

describe('swapCalendarStorage', () => {
  const userId = 42;
  const storageKey = getSwapCalendarStorageKey(userId);
  const baseSchedule = createSchedule(userId, 1001);
  const fingerprint = getScheduleFingerprint(baseSchedule);

  it('restores a saved swap plan for the same user and base schedule', () => {
    const storage = createStorage();
    const state: SwapCalendarState = {
      selectedTerm: DisplayedTerm.Next,
      swapsByTerm: {
        [DisplayedTerm.Next]: [
          { sourceSectionId: 1001, replacementSectionId: 2002 },
        ],
      },
    };

    saveSwapCalendarState(storageKey, fingerprint, state, storage);

    expect(
      loadSwapCalendarState(
        storageKey,
        fingerprint,
        DisplayedTerm.Current,
        storage,
      ),
    ).toEqual(state);
  });

  it('returns null when nothing has been saved', () => {
    expect(
      loadSwapCalendarState(
        storageKey,
        fingerprint,
        DisplayedTerm.Current,
        createStorage(),
      ),
    ).toBeNull();
  });

  it('keeps saved plans separate per user', () => {
    const storage = createStorage();
    saveSwapCalendarState(
      storageKey,
      fingerprint,
      {
        selectedTerm: DisplayedTerm.Current,
        swapsByTerm: {
          [DisplayedTerm.Current]: [
            { sourceSectionId: 1001, replacementSectionId: 2002 },
          ],
        },
      },
      storage,
    );

    expect(
      loadSwapCalendarState(
        getSwapCalendarStorageKey(99),
        fingerprint,
        DisplayedTerm.Current,
        storage,
      ),
    ).toBeNull();
  });

  it('rejects a saved plan after the imported schedule changes', () => {
    const storage = createStorage();
    saveSwapCalendarState(
      storageKey,
      fingerprint,
      { selectedTerm: DisplayedTerm.Current, swapsByTerm: {} },
      storage,
    );

    expect(
      loadSwapCalendarState(
        storageKey,
        getScheduleFingerprint(createSchedule(userId, 3003)),
        DisplayedTerm.Current,
        storage,
      ),
    ).toBeNull();
  });

  it('rejects a plan written by an older storage version', () => {
    const storage = createStorage();
    storage.setItem(
      storageKey,
      JSON.stringify({
        version: 1,
        scheduleFingerprint: fingerprint,
        // v1 keyed swaps by term label rather than by DisplayedTerm.
        selectedTerm: 'Fall 2026',
        swapsByTerm: {
          'Fall 2026': [{ sourceSectionId: 1001, replacementSectionId: 2002 }],
        },
      }),
    );

    expect(
      loadSwapCalendarState(
        storageKey,
        fingerprint,
        DisplayedTerm.Current,
        storage,
      ),
    ).toBeNull();
  });

  it('ignores malformed storage values', () => {
    const storage = createStorage();
    storage.setItem(storageKey, '{not json');

    expect(
      loadSwapCalendarState(
        storageKey,
        fingerprint,
        DisplayedTerm.Current,
        storage,
      ),
    ).toBeNull();
  });

  it('falls back to the default term when the saved term is unrecognized', () => {
    const storage = createStorage();
    storage.setItem(
      storageKey,
      JSON.stringify({
        version: 2,
        scheduleFingerprint: fingerprint,
        selectedTerm: 'spring',
        swapsByTerm: {},
      }),
    );

    expect(
      loadSwapCalendarState(
        storageKey,
        fingerprint,
        DisplayedTerm.Next,
        storage,
      ),
    ).toEqual({ selectedTerm: DisplayedTerm.Next, swapsByTerm: {} });
  });

  it('drops structurally invalid saved swaps without parsing nested data', () => {
    const storage = createStorage();
    storage.setItem(
      storageKey,
      JSON.stringify({
        version: 2,
        scheduleFingerprint: fingerprint,
        selectedTerm: DisplayedTerm.Current,
        swapsByTerm: {
          [DisplayedTerm.Current]: [
            { sourceSectionId: 1001, replacementSectionId: 2002 },
            { sourceSectionId: 1001, replacementSectionId: null },
            { meetings: [null] },
          ],
          // Not a DisplayedTerm — never read back.
          'Fall 2026': [{ sourceSectionId: 5005, replacementSectionId: 6006 }],
        },
      }),
    );

    expect(
      loadSwapCalendarState(
        storageKey,
        fingerprint,
        DisplayedTerm.Current,
        storage,
      ),
    ).toEqual({
      selectedTerm: DisplayedTerm.Current,
      swapsByTerm: {
        [DisplayedTerm.Current]: [
          { sourceSectionId: 1001, replacementSectionId: 2002 },
        ],
      },
    });
  });

  it('omits terms whose saved swaps are all invalid', () => {
    const storage = createStorage();
    storage.setItem(
      storageKey,
      JSON.stringify({
        version: 2,
        scheduleFingerprint: fingerprint,
        selectedTerm: DisplayedTerm.Current,
        swapsByTerm: { [DisplayedTerm.Current]: [{ nonsense: true }] },
      }),
    );

    expect(
      loadSwapCalendarState(
        storageKey,
        fingerprint,
        DisplayedTerm.Current,
        storage,
      ),
    ).toEqual({ selectedTerm: DisplayedTerm.Current, swapsByTerm: {} });
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

  it('distinguishes schedules that differ only by one section', () => {
    expect(getScheduleFingerprint(createSchedule(userId, 1001))).not.toBe(
      getScheduleFingerprint(createSchedule(userId, 1002)),
    );
  });
});
