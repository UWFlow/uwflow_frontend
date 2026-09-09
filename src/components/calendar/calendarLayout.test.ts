import { layoutCalendarEvents } from './calendarLayout';

const meeting = (id: string, startMinutes: number, endMinutes: number) => ({
  id,
  startMinutes,
  endMinutes,
  dayIndex: 0,
});

it('keeps later meetings beside a longer class that is still running', () => {
  const layout = layoutCalendarEvents([
    meeting('ME597', 690, 770),
    meeting('MTE484 lecture', 690, 740),
    meeting('MTE484 tutorial', 750, 800),
    meeting('next', 800, 850),
  ]);
  expect(layout.get('ME597')).toEqual({ column: 0, columns: 2 });
  expect(layout.get('MTE484 lecture')).toEqual({ column: 1, columns: 2 });
  expect(layout.get('MTE484 tutorial')).toEqual({ column: 1, columns: 2 });
  expect(layout.get('next')).toEqual({ column: 0, columns: 1 });
});

it('allocates three columns for simultaneous classes and ignores previews', () => {
  const layout = layoutCalendarEvents([
    meeting('a', 600, 700),
    meeting('b', 620, 680),
    meeting('c', 630, 690),
    { ...meeting('preview', 600, 700), state: 'preview' as const },
  ]);
  expect([...layout.values()]).toEqual([
    { column: 0, columns: 3 },
    { column: 1, columns: 3 },
    { column: 2, columns: 3 },
  ]);
  expect(layout.has('preview')).toBe(false);
});
