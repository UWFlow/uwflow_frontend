import { computeGpa, percentToGpa } from 'utils/Gpa';

import {
  buildTerms,
  computePrereqWarnings,
  evaluateChecklist,
  nextMajorTermCode,
} from '../planner';

describe('percentToGpa (OMSAS)', () => {
  it('maps boundary percentages', () => {
    expect(percentToGpa(90)).toBe(4.0);
    expect(percentToGpa(89)).toBe(3.9);
    expect(percentToGpa(85)).toBe(3.9);
    expect(percentToGpa(80)).toBe(3.7);
    expect(percentToGpa(77)).toBe(3.3);
    expect(percentToGpa(73)).toBe(3.0);
    expect(percentToGpa(70)).toBe(2.7);
    expect(percentToGpa(67)).toBe(2.3);
    expect(percentToGpa(63)).toBe(2.0);
    expect(percentToGpa(60)).toBe(1.7);
    expect(percentToGpa(57)).toBe(1.3);
    expect(percentToGpa(53)).toBe(1.0);
    expect(percentToGpa(50)).toBe(0.7);
    expect(percentToGpa(49)).toBe(0.0);
  });
});

describe('computeGpa', () => {
  it('weights by units and skips ungraded courses', () => {
    const gpa = computeGpa([
      { units: 0.5, grade: 95 }, // 4.0
      { units: 0.25, grade: 78 }, // 3.3
      { units: 0.5, grade: null }, // CR, excluded
      { units: 0, grade: 90 }, // no units, excluded
    ]);
    expect(gpa).toBeCloseTo((4.0 * 0.5 + 3.3 * 0.25) / 0.75, 5);
  });

  it('returns null with nothing gradable', () => {
    expect(computeGpa([{ units: 0.5, grade: null }])).toBeNull();
  });
});

describe('nextMajorTermCode', () => {
  it('skips spring terms', () => {
    expect(nextMajorTermCode(1249)).toBe(1251); // Fall 2024 -> Winter 2025
    expect(nextMajorTermCode(1251)).toBe(1259); // Winter 2025 -> Fall 2025
    expect(nextMajorTermCode(1255)).toBe(1259); // Spring 2025 -> Fall 2025
  });
});

const takenRow = (termId: number, level: string, id: number, code: string) => ({
  term_id: termId,
  level,
  course_id: id,
  course: { id, code, name: code.toUpperCase() },
});

describe('buildTerms', () => {
  it('continues the level sequence after the transcript up to 4B', () => {
    const terms = buildTerms(
      [takenRow(1239, '1A', 1, 'cs135'), takenRow(1241, '1B', 2, 'cs136')],
      [],
      1249,
      null,
    );
    expect(terms.map((t) => t.level)).toEqual([
      '1A',
      '1B',
      '2A',
      '2B',
      '3A',
      '3B',
      '4A',
      '4B',
    ]);
    expect(terms.map((t) => t.taken)).toEqual([
      true,
      true,
      false,
      false,
      false,
      false,
      false,
      false,
    ]);
    // 1B is Winter 2024 (1241); next major terms are Fall 2024, Winter 2025, …
    expect(terms[2].termId).toBe(1249);
    expect(terms[3].termId).toBe(1251);
  });

  it('slots planned courses into their terms with default units', () => {
    const terms = buildTerms(
      [takenRow(1239, '1A', 1, 'cs135')],
      [{ termId: 1241, courseId: 2, code: 'cs136', name: 'x', prereqs: [] }],
      1239,
      null,
    );
    const planned = terms.find((t) => t.termId === 1241)!;
    expect(planned.courses).toHaveLength(1);
    expect(planned.courses[0].units).toBe(0.5);
    expect(planned.taken).toBe(false);
  });
});

describe('computePrereqWarnings', () => {
  const term = (
    termId: number,
    courses: {
      courseId: number;
      code: string;
      taken?: boolean;
      prereqs?: { courseId: number; code: string; isCoreq: boolean }[];
    }[],
  ) => ({
    termId,
    level: '',
    taken: courses.every((c) => c.taken ?? false),
    courses: courses.map((c) => ({
      courseId: c.courseId,
      code: c.code,
      name: c.code,
      taken: c.taken ?? false,
      units: 0.5,
      prereqs: c.prereqs ?? [],
    })),
  });

  it('warns only when no prereq alternative appears earlier', () => {
    const math138 = { courseId: 10, code: 'math138', isCoreq: false };
    const math137 = { courseId: 11, code: 'math137', isCoreq: false };
    const terms = [
      term(1239, [{ courseId: 11, code: 'math137', taken: true }]),
      term(1241, [
        // satisfied: math137 taken earlier
        { courseId: 20, code: 'math239', prereqs: [math137, math138] },
        // unsatisfied: needs math138
        { courseId: 21, code: 'stat230', prereqs: [math138] },
      ]),
    ];
    const warnings = computePrereqWarnings(terms);
    expect(warnings.get('1241-20')).toBeUndefined();
    expect(warnings.get('1241-21')).toBe('math138');
  });

  it('accepts coreqs in the same term', () => {
    const coreq = { courseId: 30, code: 'math136', isCoreq: true };
    const terms = [
      term(1241, [
        { courseId: 30, code: 'math136' },
        { courseId: 31, code: 'stat231', prereqs: [coreq] },
      ]),
    ];
    expect(computePrereqWarnings(terms).size).toBe(0);
  });
});

describe('evaluateChecklist', () => {
  it('matches any alternative and counts per category', () => {
    const categories = evaluateChecklist(
      [
        {
          category: 'Math',
          courses: [
            ['math135', 'math145'],
            ['math137', 'math147'],
          ],
        },
      ],
      new Set(['math145']),
    );
    expect(categories[0].metCount).toBe(1);
    expect(categories[0].items[0].matched).toBe('math145');
    expect(categories[0].items[1].matched).toBeNull();
  });
});
