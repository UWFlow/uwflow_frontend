import { PlannerDataQuery } from 'graphql/queries/planner/Planner';
import { TranscriptGradeStore } from 'utils/Gpa';

// ponytail: the DB stores no per-course units; 0.5 is true for nearly every
// UW course. Transcript-parsed units override this for taken courses.
export const DEFAULT_COURSE_UNITS = 0.5;

export const LEVELS = ['1A', '1B', '2A', '2B', '3A', '3B', '4A', '4B'];

// Next Fall/Winter term code (skips Spring, the usual co-op/off term):
// Fall (x9) → Winter (+2), Winter (x1) → Fall (+8), Spring (x5) → Fall (+4).
export const nextMajorTermCode = (code: number): number => {
  const month = code % 10;
  return month === 9 ? code + 2 : month === 1 ? code + 8 : code + 4;
};

export type PlannerCourse = {
  courseId: number;
  code: string;
  name: string;
  taken: boolean;
  units: number;
  // Structured prereqs, only populated for planned courses.
  prereqs: { courseId: number; code: string; isCoreq: boolean }[];
};

export type PlannerTerm = {
  termId: number;
  level: string;
  taken: boolean;
  courses: PlannerCourse[];
};

export type PlanRow = {
  termId: number;
  courseId: number;
  code: string;
  name: string;
  prereqs: PlannerCourse['prereqs'];
};

export const toPlanRows = (
  planData: PlannerDataQuery['user_course_plan'],
): PlanRow[] =>
  planData
    .filter((row) => row.course !== null)
    .map((row) => ({
      termId: row.term_id,
      courseId: row.course_id,
      code: row.course!.code,
      name: row.course!.name,
      prereqs: row
        .course!.prerequisites.filter((p) => p.prerequisite !== null)
        .map((p) => ({
          courseId: p.prerequisite!.id,
          code: p.prerequisite!.code,
          isCoreq: p.is_corequisite === true,
        })),
    }));

/*
 * Terms shown on the planner: every transcript term (in order), then future
 * Fall/Winter terms continuing the 1A–4B level sequence, plus any term the
 * user has already planned courses into.
 */
export const buildTerms = (
  takenData: PlannerDataQuery['user_course_taken'],
  planRows: PlanRow[],
  currentTermCode: number,
  gradeStore: TranscriptGradeStore | null,
): PlannerTerm[] => {
  const takenByTerm = new Map<number, PlannerTerm>();
  takenData.forEach((row) => {
    if (!row.course) return;
    let term = takenByTerm.get(row.term_id);
    if (!term) {
      term = {
        termId: row.term_id,
        level: row.level ?? '',
        taken: true,
        courses: [],
      };
      takenByTerm.set(row.term_id, term);
    }
    const parsedUnits = gradeStore?.[row.course.code]?.units ?? 0;
    term.courses.push({
      courseId: row.course.id,
      code: row.course.code,
      name: row.course.name,
      taken: true,
      units: parsedUnits > 0 ? parsedUnits : DEFAULT_COURSE_UNITS,
      prereqs: [],
    });
  });

  const terms = Array.from(takenByTerm.values()).sort(
    (a, b) => a.termId - b.termId,
  );
  terms.forEach((term) =>
    term.courses.sort((a, b) => a.code.localeCompare(b.code)),
  );

  // Continue the level sequence into future terms, up to 4B.
  const lastTaken = terms[terms.length - 1];
  const lastLevelIndex = lastTaken ? LEVELS.indexOf(lastTaken.level) : -1;
  let termId = lastTaken
    ? Math.max(nextMajorTermCode(lastTaken.termId), currentTermCode)
    : currentTermCode;
  for (let i = lastLevelIndex + 1; i < LEVELS.length; i++) {
    terms.push({ termId, level: LEVELS[i], taken: false, courses: [] });
    termId = nextMajorTermCode(termId);
  }

  // Terms planned outside the generated range (e.g. a Spring term) still show.
  const known = new Set(terms.map((term) => term.termId));
  planRows.forEach((row) => {
    if (!known.has(row.termId)) {
      known.add(row.termId);
      terms.push({ termId: row.termId, level: '', taken: false, courses: [] });
    }
  });
  terms.sort((a, b) => a.termId - b.termId);

  // Slot planned courses into their terms.
  const byTermId = new Map(terms.map((term) => [term.termId, term]));
  planRows.forEach((row) => {
    byTermId.get(row.termId)!.courses.push({
      courseId: row.courseId,
      code: row.code,
      name: row.name,
      taken: false,
      units: DEFAULT_COURSE_UNITS,
      prereqs: row.prereqs,
    });
  });

  return terms;
};

/*
 * "Needs X" prerequisite warnings, keyed by `${termId}-${courseId}`.
 *
 * ponytail: course_prerequisite is a flat list of every course mentioned in
 * the prereq text (AND/OR mixed together), so we only warn when NONE of a
 * course's prereqs appear in an earlier term (same term counts for coreqs).
 * Real boolean prereq expressions would need importer support.
 */
export const computePrereqWarnings = (
  terms: PlannerTerm[],
): Map<string, string> => {
  const warnings = new Map<string, string>();
  const before = new Set<number>();

  terms.forEach((term) => {
    const inTerm = new Set(term.courses.map((course) => course.courseId));
    term.courses.forEach((course) => {
      if (course.taken || course.prereqs.length === 0) return;
      const satisfied = course.prereqs.some((prereq) =>
        prereq.isCoreq
          ? before.has(prereq.courseId) || inTerm.has(prereq.courseId)
          : before.has(prereq.courseId),
      );
      if (!satisfied) {
        const needed =
          course.prereqs.find((prereq) => !prereq.isCoreq) ?? course.prereqs[0];
        warnings.set(`${term.termId}-${course.courseId}`, needed.code);
      }
    });
    term.courses.forEach((course) => before.add(course.courseId));
  });

  return warnings;
};

export type ChecklistItemStatus = {
  alternatives: string[];
  // The course code from the plan/transcript satisfying this item, if any.
  matched: string | null;
};

export type ChecklistCategoryStatus = {
  category: string;
  items: ChecklistItemStatus[];
  metCount: number;
};

export const evaluateChecklist = (
  requirements: PlannerDataQuery['checklist'][number]['requirements'],
  haveCodes: Set<string>,
): ChecklistCategoryStatus[] =>
  requirements.map((group) => {
    const items = group.courses.map((alternatives) => ({
      alternatives,
      matched: alternatives.find((code) => haveCodes.has(code)) ?? null,
    }));
    return {
      category: group.category,
      items,
      metCount: items.filter((item) => item.matched !== null).length,
    };
  });
