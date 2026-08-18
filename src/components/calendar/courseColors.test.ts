import { assignCourseColors, COURSE_COLORS } from './courseColors';

describe('assignCourseColors', () => {
  it('gives every course in view a distinct colour', () => {
    const codes = ['CS 341', 'CS 350', 'STAT 333', 'MATH 239', 'PHYS 121'];
    const colors = assignCourseColors(codes);
    const rails = new Set(codes.map((code) => colors.get(code)?.rail));
    expect(rails.size).toBe(codes.length);
  });

  it('is stable per course regardless of the other courses present', () => {
    const solo = assignCourseColors(['CS 341']).get('CS 341');
    const withOthers = assignCourseColors(['CS 341', 'ZZZ 999']).get('CS 341');
    expect(withOthers).toEqual(solo);
  });

  it('ignores event order and duplicates', () => {
    const a = assignCourseColors(['CS 341', 'STAT 333', 'CS 341']);
    const b = assignCourseColors(['STAT 333', 'CS 341']);
    expect(Object.fromEntries(a)).toEqual(Object.fromEntries(b));
  });

  it('keeps assigning colours past the palette size', () => {
    const codes = Array.from(
      { length: COURSE_COLORS.length + 3 },
      (_, i) => `CS ${100 + i}`,
    );
    const colors = assignCourseColors(codes);
    expect(colors.size).toBe(codes.length);
  });
});
