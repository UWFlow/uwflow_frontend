import { UserScheduleFragment } from 'generated/graphql';

export type SectionSelection = {
  courseCode: string;
  sectionType: string;
};

export type SavedSwap = {
  sourceSectionId: number;
  replacementSectionId: number;
};

export type SwapCalendarState = {
  selectedTerm: string;
  selection: SectionSelection | null;
  selectedSwapCourseCode: string | null;
  swapsByTerm: Record<string, SavedSwap[]>;
};

type StoredSwapCalendarState = SwapCalendarState & {
  scheduleFingerprint: string;
  version: 1;
};

type ReadableStorage = Pick<Storage, 'getItem'>;
type WritableStorage = Pick<Storage, 'setItem'>;

const STORAGE_KEY_PREFIX = 'swap_calendar_state';
const STORAGE_VERSION = 1;

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const isSectionSelection = (value: unknown): value is SectionSelection =>
  isRecord(value) &&
  typeof value.courseCode === 'string' &&
  value.courseCode.length > 0 &&
  typeof value.sectionType === 'string' &&
  value.sectionType.length > 0;

const isSavedSwap = (value: unknown): value is SavedSwap =>
  isRecord(value) &&
  Number.isInteger(value.sourceSectionId) &&
  Number.isInteger(value.replacementSectionId);

export const getSwapCalendarStorageKey = (userId: number) =>
  `${STORAGE_KEY_PREFIX}:${userId}`;

export const getScheduleFingerprint = (
  schedule: UserScheduleFragment['schedule'],
) =>
  schedule
    .map(({ section }) => section.id)
    .sort((a, b) => a - b)
    .join(',');

export const loadSwapCalendarState = (
  userId: number,
  schedule: UserScheduleFragment['schedule'],
  availableTerms: string[],
  defaultSelectedTerm: string,
  storage: ReadableStorage = localStorage,
): SwapCalendarState | null => {
  try {
    const storedValue = storage.getItem(getSwapCalendarStorageKey(userId));
    if (!storedValue) return null;

    const parsed: unknown = JSON.parse(storedValue);
    if (
      !isRecord(parsed) ||
      parsed.version !== STORAGE_VERSION ||
      parsed.scheduleFingerprint !== getScheduleFingerprint(schedule)
    ) {
      return null;
    }

    const availableTermSet = new Set(availableTerms);
    const hasStoredSelectedTerm =
      typeof parsed.selectedTerm === 'string' &&
      availableTermSet.has(parsed.selectedTerm);
    const selectedTerm = hasStoredSelectedTerm
      ? (parsed.selectedTerm as string)
      : defaultSelectedTerm;

    const swapsByTerm: Record<string, SavedSwap[]> = {};
    if (isRecord(parsed.swapsByTerm)) {
      for (const term of availableTerms) {
        const termSwaps = parsed.swapsByTerm[term];
        if (Array.isArray(termSwaps)) {
          const validSwaps = termSwaps.filter(isSavedSwap);
          if (validSwaps.length > 0) {
            swapsByTerm[term] = validSwaps;
          }
        }
      }
    }

    return {
      selectedTerm,
      selection:
        hasStoredSelectedTerm && isSectionSelection(parsed.selection)
          ? parsed.selection
          : null,
      selectedSwapCourseCode:
        hasStoredSelectedTerm &&
        typeof parsed.selectedSwapCourseCode === 'string' &&
        parsed.selectedSwapCourseCode.length > 0
          ? parsed.selectedSwapCourseCode
          : null,
      swapsByTerm,
    };
  } catch {
    return null;
  }
};

export const saveSwapCalendarState = (
  userId: number,
  schedule: UserScheduleFragment['schedule'],
  state: SwapCalendarState,
  storage: WritableStorage = localStorage,
) => {
  const storedState: StoredSwapCalendarState = {
    ...state,
    scheduleFingerprint: getScheduleFingerprint(schedule),
    version: STORAGE_VERSION,
  };

  try {
    storage.setItem(
      getSwapCalendarStorageKey(userId),
      JSON.stringify(storedState),
    );
  } catch {
    // Persistence is a convenience. Browsers that disable or fill localStorage
    // should still be able to use the swap planner for the current page visit.
  }
};
