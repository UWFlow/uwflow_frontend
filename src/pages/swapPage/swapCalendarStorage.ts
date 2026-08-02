import { UserScheduleFragment } from 'generated/graphql';

/** The two term tabs the swap calendar shows. */
export enum DisplayedTerm {
  Current = 'current',
  Next = 'next',
}

/** One planned swap: the enrolled section, and what it is being replaced with. */
export type SavedSwap = {
  sourceSectionId: number;
  replacementSectionId: number;
};

export type SwapCalendarState = {
  selectedTerm: DisplayedTerm;
  swapsByTerm: Partial<Record<DisplayedTerm, SavedSwap[]>>;
};

// Injectable so the validation below is testable without a DOM.
type ReadableStorage = Pick<Storage, 'getItem'>;
type WritableStorage = Pick<Storage, 'setItem'>;

const STORAGE_KEY_PREFIX = 'swap_calendar_state';
// v1 keyed swaps by term *label* ("Fall 2026"), which went stale at term
// rollover. Bumping orphans those payloads rather than migrating them.
const STORAGE_VERSION = 2;
const DISPLAYED_TERMS = Object.values(DisplayedTerm);

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const isDisplayedTerm = (value: unknown): value is DisplayedTerm =>
  value === DisplayedTerm.Current || value === DisplayedTerm.Next;

const isSavedSwap = (value: unknown): value is SavedSwap =>
  isRecord(value) &&
  Number.isInteger(value.sourceSectionId) &&
  Number.isInteger(value.replacementSectionId);

/** Saved plans are per-user: two accounts sharing a browser stay isolated. */
export const getSwapCalendarStorageKey = (userId: number) =>
  `${STORAGE_KEY_PREFIX}:${userId}`;

/**
 * Stable hash of enrolled section IDs. A saved plan describes swaps *away
 * from* a specific set of sections, so it is meaningless once the imported
 * schedule changes — comparing fingerprints invalidates it.
 */
export const getScheduleFingerprint = (
  schedule: UserScheduleFragment['schedule'],
) =>
  schedule
    .map(({ section }) => section.id)
    .sort((a, b) => a - b)
    .join(',');

/**
 * Reads a saved plan, or null if there is none, it is from an older version,
 * or it belongs to a different base schedule. Anything structurally invalid is
 * dropped rather than trusted — the payload is user-writable.
 */
export const loadSwapCalendarState = (
  storageKey: string,
  scheduleFingerprint: string,
  defaultSelectedTerm: DisplayedTerm,
  storage: ReadableStorage = localStorage,
): SwapCalendarState | null => {
  try {
    const storedValue = storage.getItem(storageKey);
    if (!storedValue) return null;

    const parsed: unknown = JSON.parse(storedValue);
    if (
      !isRecord(parsed) ||
      parsed.version !== STORAGE_VERSION ||
      parsed.scheduleFingerprint !== scheduleFingerprint
    ) {
      return null;
    }

    const swapsByTerm: Partial<Record<DisplayedTerm, SavedSwap[]>> = {};
    if (isRecord(parsed.swapsByTerm)) {
      for (const term of DISPLAYED_TERMS) {
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
      selectedTerm: isDisplayedTerm(parsed.selectedTerm)
        ? parsed.selectedTerm
        : defaultSelectedTerm,
      swapsByTerm,
    };
  } catch {
    return null;
  }
};

export const saveSwapCalendarState = (
  storageKey: string,
  scheduleFingerprint: string,
  state: SwapCalendarState,
  storage: WritableStorage = localStorage,
) => {
  try {
    storage.setItem(
      storageKey,
      JSON.stringify({
        ...state,
        scheduleFingerprint,
        version: STORAGE_VERSION,
      }),
    );
  } catch {
    // Persistence is a convenience. Browsers that disable or fill localStorage
    // should still be able to use the swap planner for the current page visit.
  }
};
