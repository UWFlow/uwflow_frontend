import {
  getCurrentTermCode,
  getNextTermCode,
  termCodeToDate,
} from 'utils/Misc';

import { SharedClass } from './api';

export interface SharedTermOption {
  termId: number;
  label: string;
  count: number;
}

/**
 * Terms the group's shared classes can be viewed by, oldest first.
 *
 * The API returns every section held by two or more members from the current
 * term onwards (see `sharedClasses` in flow/api/group), so a group can hold
 * classes for more than one term at once. Current and next are always offered
 * — an empty term is worth showing as empty rather than hiding, since "we
 * share nothing next term" is an answer too — and any further term the API
 * surfaces is appended so no shared class is ever unreachable.
 */
export const getSharedTermOptions = (
  classes: SharedClass[],
): SharedTermOption[] => {
  const termIds = Array.from(
    new Set([
      getCurrentTermCode(),
      getNextTermCode(),
      ...classes.map((shared) => shared.term_id),
    ]),
  ).sort((a, b) => a - b);

  return termIds.map((termId) => ({
    termId,
    label: termCodeToDate(termId),
    count: classes.filter((shared) => shared.term_id === termId).length,
  }));
};

/**
 * Term to open a group on: the earliest one that actually has shared classes,
 * so a group whose overlap is entirely next term does not open on a blank
 * current term. Falls back to the first option when nothing is shared at all.
 */
export const getDefaultSharedTerm = (options: SharedTermOption[]): number =>
  (options.find((option) => option.count > 0) ?? options[0])?.termId ??
  getCurrentTermCode();
