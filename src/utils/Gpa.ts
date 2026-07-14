import { TranscriptParseResponse } from 'types/Api';

/*
 * GPA calculation on the OMSAS 4.0 scale, credit-weighted by course units.
 * Conversion table adapted from
 * https://github.com/caseOfCamel/uwaterloo-gpa-calculator (whose transcript
 * parsing is broken — we use grades parsed by our own backend instead).
 *
 * Grades come from the /parse/transcript response and are kept exclusively in
 * localStorage: UW Flow never stores grades server-side (see privacy policy).
 */

export type TranscriptGradeEntry = {
  units: number;
  grade: number | null;
  termId: number;
};

export type TranscriptGradeStore = {
  // Keyed by course code in backend form, e.g. "cs135"
  [code: string]: TranscriptGradeEntry;
};

const gradeStoreKey = (userId: number) => `transcript_grades_${userId}`;

export const saveTranscriptGrades = (
  userId: number,
  response: TranscriptParseResponse,
): void => {
  if (!response.terms) {
    return;
  }

  const store: TranscriptGradeStore = {};
  response.terms.forEach((term) => {
    term.courses.forEach((course) => {
      store[course.code] = {
        units: course.units,
        grade: course.grade,
        termId: term.term_id,
      };
    });
  });
  localStorage.setItem(gradeStoreKey(userId), JSON.stringify(store));
};

export const loadTranscriptGrades = (
  userId: number,
): TranscriptGradeStore | null => {
  const raw = localStorage.getItem(gradeStoreKey(userId));
  if (!raw) {
    return null;
  }
  try {
    return JSON.parse(raw) as TranscriptGradeStore;
  } catch {
    return null;
  }
};

/* OMSAS undergraduate percentage → 4.0 scale. */
export const percentToGpa = (percent: number): number => {
  if (percent >= 90) return 4.0;
  if (percent >= 85) return 3.9;
  if (percent >= 80) return 3.7;
  if (percent >= 77) return 3.3;
  if (percent >= 73) return 3.0;
  if (percent >= 70) return 2.7;
  if (percent >= 67) return 2.3;
  if (percent >= 63) return 2.0;
  if (percent >= 60) return 1.7;
  if (percent >= 57) return 1.3;
  if (percent >= 53) return 1.0;
  if (percent >= 50) return 0.7;
  return 0.0;
};

/*
 * Credit-weighted cumulative GPA. Courses without a numeric grade (CR/NCR,
 * current term) or without units are excluded, matching how Quest excludes
 * them from "In GPA" totals. Returns null when nothing is gradable.
 */
export const computeGpa = (
  entries: { units: number; grade: number | null }[],
): number | null => {
  let totalUnits = 0;
  let totalPoints = 0;
  entries.forEach(({ units, grade }) => {
    if (grade === null || units <= 0) {
      return;
    }
    totalUnits += units;
    totalPoints += percentToGpa(grade) * units;
  });
  return totalUnits > 0 ? totalPoints / totalUnits : null;
};

/* Per-term GPA breakdown, ordered by term. */
export const computeTermGpas = (
  store: TranscriptGradeStore,
): { termId: number; gpa: number }[] => {
  const byTerm: { [termId: number]: TranscriptGradeEntry[] } = {};
  Object.values(store).forEach((entry) => {
    byTerm[entry.termId] = byTerm[entry.termId] || [];
    byTerm[entry.termId].push(entry);
  });

  return Object.keys(byTerm)
    .map(Number)
    .sort((a, b) => a - b)
    .map((termId) => ({ termId, gpa: computeGpa(byTerm[termId]) }))
    .filter(
      (term): term is { termId: number; gpa: number } => term.gpa !== null,
    );
};
