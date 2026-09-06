import { SwapCourseSectionFragment } from 'generated/graphql';

import { DisplayedTerm } from './useScheduleSwaps';

export type AdditionsByTerm = Partial<
  Record<DisplayedTerm, SwapCourseSectionFragment[]>
>;

const getSectionType = (sectionName: string) => sectionName.split(' ')[0];

/**
 * Add one section to the planning overlay. A new choice replaces the previous
 * choice for the same course and component (for example, ECE 358 LEC 002
 * replaces ECE 358 LEC 001 while its selected LAB remains in place).
 */
export const withScheduleAddition = (
  additionsByTerm: AdditionsByTerm,
  term: DisplayedTerm,
  section: SwapCourseSectionFragment,
): AdditionsByTerm => {
  const sectionType = getSectionType(section.section_name);
  const remaining = (additionsByTerm[term] ?? []).filter(
    (addedSection) =>
      addedSection.course.code !== section.course.code ||
      getSectionType(addedSection.section_name) !== sectionType,
  );

  return {
    ...additionsByTerm,
    [term]: [...remaining, section],
  };
};

export const withoutScheduleAddition = (
  additionsByTerm: AdditionsByTerm,
  term: DisplayedTerm,
  sectionId: number,
): AdditionsByTerm => {
  const remaining = (additionsByTerm[term] ?? []).filter(
    (section) => section.id !== sectionId,
  );
  const next = { ...additionsByTerm };

  if (remaining.length === 0) {
    delete next[term];
  } else {
    next[term] = remaining;
  }

  return next;
};
