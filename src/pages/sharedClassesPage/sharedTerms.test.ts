import { getCurrentTermCode, getNextTermCode } from 'utils/Misc';

import { SharedClass } from './api';
import { getDefaultSharedTerm, getSharedTermOptions } from './sharedTerms';

const currentTerm = getCurrentTermCode();
const nextTerm = getNextTermCode();
// The term after next, standing in for anything the API surfaces beyond the
// pair the switcher always offers. Term codes end in 1/5/9 (Winter/Spring/
// Fall), so Fall rolls over into the next year's Winter.
const laterTerm = nextTerm % 10 === 9 ? nextTerm + 2 : nextTerm + 4;

const classInTerm = (termId: number, sectionId: number): SharedClass => ({
  section_id: sectionId,
  course_code: 'cs241',
  course_name: 'Foundations of Sequential Programs',
  section_name: 'LEC 001',
  term_id: termId,
  member_ids: [1, 2],
  meetings: [],
});

describe('getSharedTermOptions', () => {
  it('always offers the current and next term', () => {
    expect(getSharedTermOptions([]).map((o) => o.termId)).toEqual([
      currentTerm,
      nextTerm,
    ]);
  });

  it('counts the classes in each term', () => {
    const options = getSharedTermOptions([
      classInTerm(currentTerm, 1),
      classInTerm(nextTerm, 2),
      classInTerm(nextTerm, 3),
    ]);
    expect(options.map((o) => o.count)).toEqual([1, 2]);
  });

  it('appends a further term the API returns, oldest first', () => {
    const options = getSharedTermOptions([classInTerm(laterTerm, 1)]);
    expect(options.map((o) => o.termId)).toEqual([
      currentTerm,
      nextTerm,
      laterTerm,
    ]);
  });
});

describe('getDefaultSharedTerm', () => {
  it('opens on the current term when it has shared classes', () => {
    const classes = [classInTerm(currentTerm, 1), classInTerm(nextTerm, 2)];
    expect(getDefaultSharedTerm(getSharedTermOptions(classes))).toBe(
      currentTerm,
    );
  });

  it('skips a current term with nothing shared in it', () => {
    const classes = [classInTerm(nextTerm, 1)];
    expect(getDefaultSharedTerm(getSharedTermOptions(classes))).toBe(nextTerm);
  });

  it('falls back to the current term when nothing is shared at all', () => {
    expect(getDefaultSharedTerm(getSharedTermOptions([]))).toBe(currentTerm);
  });
});
