import React, { act } from 'react';
import { createRoot, Root } from 'react-dom/client';
import { UserScheduleFragment } from 'generated/graphql';

import useLocalStorageSwaps, { DisplayedTerm } from './useLocalStorageSwaps';

jest.mock('@apollo/client', () => {
  const actual = jest.requireActual('@apollo/client');
  return {
    ...actual,
    useQuery: jest.fn(() => ({ data: undefined, error: undefined })),
  };
});

type HookArgs = {
  schedule: UserScheduleFragment['schedule'];
  userId: number | null;
  demoMode: boolean;
};

type HookResult = ReturnType<typeof useLocalStorageSwaps>;

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

const storageKeyFor = (userId: number) => `swap_calendar_state:${userId}`;

const fingerprintFor = (schedule: UserScheduleFragment['schedule']) =>
  schedule
    .map(({ section }) => section.id)
    .sort((a, b) => a - b)
    .join(',');

const seedStorage = (
  userId: number,
  schedule: UserScheduleFragment['schedule'],
  swapsByTerm: Partial<
    Record<
      DisplayedTerm,
      { sourceSectionId: number; replacementSectionId: number }[]
    >
  >,
  extras: Record<string, unknown> = {},
) => {
  localStorage.setItem(
    storageKeyFor(userId),
    JSON.stringify({
      version: 2,
      scheduleFingerprint: fingerprintFor(schedule),
      swapsByTerm,
      ...extras,
    }),
  );
};

const renderHook = (initialArgs: HookArgs) => {
  const result: { current: HookResult | null } = { current: null };
  let args = initialArgs;

  const Test = () => {
    result.current = useLocalStorageSwaps(args);
    return null;
  };

  const container = document.createElement('div');
  document.body.appendChild(container);
  let root: Root;

  act(() => {
    root = createRoot(container);
    root.render(React.createElement(Test));
  });

  return {
    result: result as { current: HookResult },
    rerender: (nextArgs: HookArgs) => {
      args = nextArgs;
      act(() => {
        root.render(React.createElement(Test));
      });
    },
    unmount: () => {
      act(() => {
        root.unmount();
      });
      container.remove();
    },
  };
};

describe('useLocalStorageSwaps', () => {
  const userId = 42;
  const baseSchedule = createSchedule(userId, 1001);

  beforeEach(() => {
    localStorage.clear();
    // React 18 act() only flushes effects when this flag is set.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (globalThis as any).IS_REACT_ACT_ENVIRONMENT = true;
  });

  it('restores a saved swap plan for the same user and base schedule', () => {
    const swaps = [{ sourceSectionId: 1001, replacementSectionId: 2002 }];
    seedStorage(userId, baseSchedule, { [DisplayedTerm.Next]: swaps });

    const { result, unmount } = renderHook({
      schedule: baseSchedule,
      userId,
      demoMode: false,
    });

    expect(result.current.swapsByTerm).toEqual({
      [DisplayedTerm.Next]: swaps,
    });
    unmount();
  });

  it('starts with an empty plan when nothing has been saved', () => {
    const { result, unmount } = renderHook({
      schedule: baseSchedule,
      userId,
      demoMode: false,
    });

    expect(result.current.swapsByTerm).toEqual({});
    unmount();
  });

  it('persists planned swaps and restores them on a later mount', () => {
    const first = renderHook({
      schedule: baseSchedule,
      userId,
      demoMode: false,
    });

    act(() => {
      first.result.current.setSwapsByTerm({
        [DisplayedTerm.Current]: [
          { sourceSectionId: 1001, replacementSectionId: 2002 },
        ],
      });
    });
    first.unmount();

    const second = renderHook({
      schedule: baseSchedule,
      userId,
      demoMode: false,
    });

    expect(second.result.current.swapsByTerm).toEqual({
      [DisplayedTerm.Current]: [
        { sourceSectionId: 1001, replacementSectionId: 2002 },
      ],
    });
    const stored = localStorage.getItem(storageKeyFor(userId));
    expect(stored).not.toBeNull();
    expect(JSON.parse(stored as string)).not.toHaveProperty('selectedTerm');
    second.unmount();
  });

  it('keeps saved plans separate per user', () => {
    seedStorage(userId, baseSchedule, {
      [DisplayedTerm.Current]: [
        { sourceSectionId: 1001, replacementSectionId: 2002 },
      ],
    });

    const { result, unmount } = renderHook({
      schedule: createSchedule(99, 1001),
      userId: 99,
      demoMode: false,
    });

    expect(result.current.swapsByTerm).toEqual({});
    unmount();
  });

  it('discards a saved plan after the imported schedule changes', () => {
    seedStorage(userId, baseSchedule, {
      [DisplayedTerm.Next]: [
        { sourceSectionId: 1001, replacementSectionId: 2002 },
      ],
    });

    const { result, unmount } = renderHook({
      schedule: createSchedule(userId, 3003),
      userId,
      demoMode: false,
    });

    expect(result.current.swapsByTerm).toEqual({});
    unmount();
  });

  it('restores the same plan when schedule section order differs', () => {
    const ordered = [
      ...createSchedule(userId, 1001),
      ...createSchedule(userId, 2002),
    ];
    const swaps = [{ sourceSectionId: 1001, replacementSectionId: 3003 }];
    seedStorage(userId, ordered, { [DisplayedTerm.Current]: swaps });

    const { result, unmount } = renderHook({
      schedule: [...ordered].reverse(),
      userId,
      demoMode: false,
    });

    expect(result.current.swapsByTerm).toEqual({
      [DisplayedTerm.Current]: swaps,
    });
    unmount();
  });

  it('rejects a plan written by an older storage version', () => {
    localStorage.setItem(
      storageKeyFor(userId),
      JSON.stringify({
        version: 1,
        scheduleFingerprint: fingerprintFor(baseSchedule),
        // v1 keyed swaps by term label rather than by DisplayedTerm.
        selectedTerm: 'Fall 2026',
        swapsByTerm: {
          'Fall 2026': [{ sourceSectionId: 1001, replacementSectionId: 2002 }],
        },
      }),
    );

    const { result, unmount } = renderHook({
      schedule: baseSchedule,
      userId,
      demoMode: false,
    });

    expect(result.current.swapsByTerm).toEqual({});
    unmount();
  });

  it('ignores malformed storage values', () => {
    localStorage.setItem(storageKeyFor(userId), '{not json');

    const { result, unmount } = renderHook({
      schedule: baseSchedule,
      userId,
      demoMode: false,
    });

    expect(result.current.swapsByTerm).toEqual({});
    unmount();
  });

  it('ignores selectedTerm left over from older v2 payloads', () => {
    const swaps = [{ sourceSectionId: 1001, replacementSectionId: 2002 }];
    seedStorage(
      userId,
      baseSchedule,
      { [DisplayedTerm.Next]: swaps },
      { selectedTerm: DisplayedTerm.Next },
    );

    const { result, unmount } = renderHook({
      schedule: baseSchedule,
      userId,
      demoMode: false,
    });

    expect(result.current.swapsByTerm).toEqual({
      [DisplayedTerm.Next]: swaps,
    });
    unmount();
  });

  it('drops structurally invalid saved swaps without parsing nested data', () => {
    localStorage.setItem(
      storageKeyFor(userId),
      JSON.stringify({
        version: 2,
        scheduleFingerprint: fingerprintFor(baseSchedule),
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

    const { result, unmount } = renderHook({
      schedule: baseSchedule,
      userId,
      demoMode: false,
    });

    expect(result.current.swapsByTerm).toEqual({
      [DisplayedTerm.Current]: [
        { sourceSectionId: 1001, replacementSectionId: 2002 },
      ],
    });
    unmount();
  });

  it('omits terms whose saved swaps are all invalid', () => {
    localStorage.setItem(
      storageKeyFor(userId),
      JSON.stringify({
        version: 2,
        scheduleFingerprint: fingerprintFor(baseSchedule),
        swapsByTerm: { [DisplayedTerm.Current]: [{ nonsense: true }] },
      }),
    );

    const { result, unmount } = renderHook({
      schedule: baseSchedule,
      userId,
      demoMode: false,
    });

    expect(result.current.swapsByTerm).toEqual({});
    unmount();
  });

  it('does not persist in demo mode', () => {
    const { result, unmount } = renderHook({
      schedule: baseSchedule,
      userId,
      demoMode: true,
    });

    act(() => {
      result.current.setSwapsByTerm({
        [DisplayedTerm.Current]: [
          { sourceSectionId: 1001, replacementSectionId: 2002 },
        ],
      });
    });

    expect(localStorage.getItem(storageKeyFor(userId))).toBeNull();
    unmount();
  });

  it('re-hydrates when the schedule identity changes while mounted', () => {
    seedStorage(userId, baseSchedule, {
      [DisplayedTerm.Next]: [
        { sourceSectionId: 1001, replacementSectionId: 2002 },
      ],
    });

    const { result, rerender, unmount } = renderHook({
      schedule: baseSchedule,
      userId,
      demoMode: false,
    });

    expect(result.current.swapsByTerm).toEqual({
      [DisplayedTerm.Next]: [
        { sourceSectionId: 1001, replacementSectionId: 2002 },
      ],
    });

    rerender({
      schedule: createSchedule(userId, 3003),
      userId,
      demoMode: false,
    });

    expect(result.current.swapsByTerm).toEqual({});
    unmount();
  });

  it('clearSwaps empties the plan and persisted state', () => {
    const { result, unmount } = renderHook({
      schedule: baseSchedule,
      userId,
      demoMode: false,
    });

    act(() => {
      result.current.setSwapsByTerm({
        [DisplayedTerm.Current]: [
          { sourceSectionId: 1001, replacementSectionId: 2002 },
        ],
      });
    });

    act(() => {
      result.current.clearSwaps();
    });

    expect(result.current.swapsByTerm).toEqual({});
    const stored = localStorage.getItem(storageKeyFor(userId));
    expect(stored).not.toBeNull();
    expect(JSON.parse(stored as string).swapsByTerm).toEqual({});
    unmount();
  });
});
