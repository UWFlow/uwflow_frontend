import { mergeMeetingDateRanges } from './Schedule';

const ece198Meeting = {
  days: ['W'],
  start_date: '2026-09-16',
  end_date: '2026-09-16',
  start_seconds: 30600,
  end_seconds: 37200,
  location: 'UW U',
  prof: { id: 1 },
  is_closed: false,
  is_cancelled: false,
  is_tba: false,
};

describe('mergeMeetingDateRanges', () => {
  it('merges ECE 198-style meetings that differ only by date', () => {
    const meetings = [
      ece198Meeting,
      {
        ...ece198Meeting,
        start_date: '2026-09-23',
        end_date: '2026-09-23',
      },
      {
        ...ece198Meeting,
        start_date: '2026-10-28',
        end_date: '2026-10-28',
      },
    ];

    expect(mergeMeetingDateRanges(meetings)).toEqual([
      {
        ...ece198Meeting,
        start_date: '2026-09-16',
        end_date: '2026-10-28',
      },
    ]);
    expect(meetings[0]).toEqual(ece198Meeting);
  });

  it.each([
    ['days', { days: ['Th'] }],
    ['start time', { start_seconds: 34200 }],
    ['end time', { end_seconds: 37800 }],
    ['location', { location: 'E5 6004' }],
    ['professor', { prof: { id: 2 } }],
    ['closed status', { is_closed: true }],
    ['cancelled status', { is_cancelled: true }],
    ['TBA status', { is_tba: true }],
  ])('keeps meetings with different %s separate', (_label, difference) => {
    const variant = {
      ...ece198Meeting,
      ...difference,
      start_date: '2026-09-23',
      end_date: '2026-09-23',
    };

    expect(mergeMeetingDateRanges([ece198Meeting, variant])).toHaveLength(2);
  });

  it('treats equivalent day sets as the same schedule', () => {
    const mondayWednesday = { ...ece198Meeting, days: ['M', 'W'] };
    const reversedDays = {
      ...mondayWednesday,
      days: ['W', 'M'],
      start_date: '2026-09-23',
      end_date: '2026-09-23',
    };

    expect(
      mergeMeetingDateRanges([mondayWednesday, reversedDays]),
    ).toHaveLength(1);
  });
});
