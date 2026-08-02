import { useCallback, useEffect, useMemo, useState } from 'react';
import { useQuery } from '@apollo/client';
import {
  SwapCourseSectionFragment,
  UserScheduleFragment,
} from 'generated/graphql';

import { GET_SECTIONS_FOR_SAVED_SWAPS } from 'graphql/queries/course/SwapCourse';

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

/** Persisted swap plan — tab selection is UI state, not part of the plan. */
export type SwapCalendarState = {
  swapsByTerm: Partial<Record<DisplayedTerm, SavedSwap[]>>;
};

// Injectable so the validation below is testable without a DOM.
type ReadableStorage = Pick<Storage, 'getItem'>;
type WritableStorage = Pick<Storage, 'setItem'>;

const STORAGE_KEY_PREFIX = 'swap_calendar_state';
// v1 keyed swaps by term *label* ("Fall 2026"), which went stale at term
// rollover. Bumping orphans those payloads rather than migrating them.
// v2 also wrote selectedTerm; that field is ignored on read and omitted on write.
const STORAGE_VERSION = 2;
const DISPLAYED_TERMS = Object.values(DisplayedTerm);

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

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

    return { swapsByTerm };
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

type SavedSwapSectionsQuery = {
  course_section: SwapCourseSectionFragment[];
};
type SavedSwapSectionsQueryVariables = {
  ids: number[];
};

type UseLocalStorageSwapsArgs = {
  schedule: UserScheduleFragment['schedule'];
  userId: number | null;
  demoMode: boolean;
};

/**
 * Owns the saved swap plan: planned swaps (persisted to localStorage as
 * section IDs only) and the section details those IDs hydrate into.
 */
const useLocalStorageSwaps = ({
  schedule,
  userId,
  demoMode,
}: UseLocalStorageSwapsArgs) => {
  const scheduleFingerprint = useMemo(
    () => getScheduleFingerprint(schedule),
    [schedule],
  );
  // Nothing is persisted for the logged-out demo, so there is no key to write.
  const storageKey =
    demoMode || userId === null ? null : getSwapCalendarStorageKey(userId);
  // Identifies *which* saved plan the state below belongs to. A different user
  // or a changed base schedule is a different plan, and must be re-read.
  const planToken =
    storageKey === null ? null : `${storageKey}:${scheduleFingerprint}`;

  // Persist only the original/replacement section IDs. Fresh section details
  // are queried after restore so timetable changes cannot leave a stale local
  // snapshot on the calendar.
  const [swapsByTerm, setSwapsByTerm] = useState<
    Partial<Record<DisplayedTerm, SavedSwap[]>>
  >({});

  // The plan the state above was last restored from. Held in state rather than
  // a ref so it is batched with the restored values — the save effect can then
  // never observe "already hydrated" while the state is still pre-hydration.
  const [hydratedToken, setHydratedToken] = useState<string | null>(null);

  // Restore in an effect rather than a useState initializer: an initializer
  // runs once per mount and can never re-read, which quietly made persistence
  // depend on SwapPage remounting this tree (via `key`) whenever the schedule
  // changed. Keying off planToken restores correctly either way.
  useEffect(() => {
    if (storageKey === null || planToken === hydratedToken) return;

    const restored = loadSwapCalendarState(storageKey, scheduleFingerprint);
    setSwapsByTerm(restored?.swapsByTerm ?? {});
    setHydratedToken(planToken);
  }, [hydratedToken, planToken, scheduleFingerprint, storageKey]);

  // Never write before the restore above has run for this plan: the initial
  // empty state would otherwise overwrite the plan we are about to read.
  useEffect(() => {
    if (storageKey === null || planToken !== hydratedToken) return;

    saveSwapCalendarState(storageKey, scheduleFingerprint, { swapsByTerm });
  }, [hydratedToken, planToken, scheduleFingerprint, storageKey, swapsByTerm]);

  // Section details for planned swaps, accumulated into one map rather than
  // derived from the query result. `ids` changes on every swap, and Apollo
  // cannot answer a filtered root field (`course_section(where: ...)`) out of
  // the cache, so a changed id set always goes to the network and leaves
  // `data` undefined for the whole request. Deriving the map from `data` would
  // drop every already-hydrated section mid-request, flashing the original
  // sections back onto the calendar until the response landed.
  const [swapSectionsById, setSwapSectionsById] = useState<
    Map<number, SwapCourseSectionFragment>
  >(() => new Map());

  const savedSwapSectionIds = useMemo(
    () =>
      Array.from(
        new Set(
          Object.values(swapsByTerm)
            .flat()
            .map(({ replacementSectionId }) => replacementSectionId),
        ),
      ),
    [swapsByTerm],
  );

  const { data: savedSwapSectionsData, error: savedSwapSectionsError } =
    useQuery<SavedSwapSectionsQuery, SavedSwapSectionsQueryVariables>(
      GET_SECTIONS_FOR_SAVED_SWAPS,
      {
        variables: { ids: savedSwapSectionIds },
        skip: savedSwapSectionIds.length === 0,
        // Restored plans hold only IDs, so the timetable is re-read every
        // session: a section that moved room or changed times cannot render
        // from a stale snapshot.
        fetchPolicy: 'network-only',
      },
    );

  // A section picked in the panel is cached on click so the calendar updates
  // immediately; the fetched copy overwrites it here once the query returns,
  // so network data still wins wherever it exists.
  const fetchedSections = savedSwapSectionsData?.course_section;
  useEffect(() => {
    if (!fetchedSections?.length) return;

    setSwapSectionsById((prev) => {
      let changed = false;
      const next = new Map(prev);
      for (const section of fetchedSections) {
        if (next.get(section.id) !== section) {
          next.set(section.id, section);
          changed = true;
        }
      }
      return changed ? next : prev;
    });
  }, [fetchedSections]);

  const cacheLocalSwapSection = useCallback(
    (section: SwapCourseSectionFragment) => {
      setSwapSectionsById((prev) => {
        if (prev.get(section.id) === section) return prev;
        const next = new Map(prev);
        next.set(section.id, section);
        return next;
      });
    },
    [],
  );

  const clearSwaps = useCallback(() => {
    setSwapsByTerm({});
    setSwapSectionsById(new Map());
  }, []);

  // True while any planned replacement is still missing its section details.
  const hasPendingSections = useMemo(
    () =>
      Object.values(swapsByTerm).some((termSwaps) =>
        (termSwaps ?? []).some(
          ({ replacementSectionId }) =>
            !swapSectionsById.has(replacementSectionId),
        ),
      ),
    [swapSectionsById, swapsByTerm],
  );

  // Whether the plan is fully applied, or its sections failed to load and
  // never will be. A failed fetch still counts, so a broken plan can always
  // be reset.
  const isPlanSettled = !hasPendingSections || Boolean(savedSwapSectionsError);

  return {
    swapsByTerm,
    setSwapsByTerm,
    swapSectionsById,
    isPlanSettled,
    cacheLocalSwapSection,
    clearSwaps,
  };
};

export default useLocalStorageSwaps;
