import { useEffect, useState } from 'react';
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

/** Persisted ID pair — never stores section fragments (they go stale). */
type SavedSwap = {
  sourceSectionId: number;
  replacementSectionId: number;
};

/** One planned swap with its hydrated replacement, when available. */
export type PlannedSwap = {
  sourceSectionId: number;
  replacementSectionId: number;
  replacementSection: SwapCourseSectionFragment | undefined;
};

/** The persisted plan — tab selection is UI state, not part of it. */
type SwapsByTerm = Partial<Record<DisplayedTerm, SavedSwap[]>>;

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
const getSwapCalendarStorageKey = (userId: number) =>
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
const loadSwapCalendarState = (
  storageKey: string,
  scheduleFingerprint: string,
): SwapsByTerm | null => {
  try {
    const storedValue = localStorage.getItem(storageKey);
    if (!storedValue) return null;

    const parsed: unknown = JSON.parse(storedValue);
    if (
      !isRecord(parsed) ||
      parsed.version !== STORAGE_VERSION ||
      parsed.scheduleFingerprint !== scheduleFingerprint ||
      !isRecord(parsed.swapsByTerm)
    ) {
      return null;
    }

    const swapsByTerm: SwapsByTerm = {};
    for (const term of DISPLAYED_TERMS) {
      const termSwaps = parsed.swapsByTerm[term];
      if (!Array.isArray(termSwaps)) continue;

      const validSwaps = termSwaps.filter(isSavedSwap);
      if (validSwaps.length > 0) swapsByTerm[term] = validSwaps;
    }

    return swapsByTerm;
  } catch {
    return null;
  }
};

const saveSwapCalendarState = (
  storageKey: string,
  scheduleFingerprint: string,
  swapsByTerm: SwapsByTerm,
) => {
  try {
    localStorage.setItem(
      storageKey,
      JSON.stringify({
        swapsByTerm,
        scheduleFingerprint,
        version: STORAGE_VERSION,
      }),
    );
  } catch {
    // Persistence is a convenience. Browsers that disable or fill localStorage
    // should still be able to use the swap planner for the current page visit.
  }
};

/**
 * Adds sections to the cache, returning the previous map untouched when every
 * section is already cached under the same identity.
 */
const withSections = (
  cache: Map<number, SwapCourseSectionFragment>,
  sections: SwapCourseSectionFragment[],
) => {
  const added = sections.filter((section) => cache.get(section.id) !== section);
  if (added.length === 0) return cache;

  const next = new Map(cache);
  for (const section of added) next.set(section.id, section);
  return next;
};

type UseLocalStorageSwapsArgs = {
  schedule: UserScheduleFragment['schedule'];
  userId: number | null;
  demoMode: boolean;
};

/**
 * Owns the saved swap plan as section ID pairs persisted to localStorage, and
 * hydrates those replacement IDs into section fragments for the calendar.
 * Clearing the plan also drops the section cache when no IDs remain.
 */
const useLocalStorageSwaps = ({
  schedule,
  userId,
  demoMode,
}: UseLocalStorageSwapsArgs) => {
  const scheduleFingerprint = getScheduleFingerprint(schedule);
  // Nothing is persisted for the logged-out demo, so there is no key to write.
  const storageKey =
    demoMode || userId === null ? null : getSwapCalendarStorageKey(userId);
  // Identifies *which* saved plan the state below belongs to. A different user
  // or a changed base schedule is a different plan, and must be re-read.
  const planToken =
    storageKey === null ? null : `${storageKey}:${scheduleFingerprint}`;

  const [swapsByTerm, setSwapsByTerm] = useState<SwapsByTerm>({});

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

    setSwapsByTerm(
      loadSwapCalendarState(storageKey, scheduleFingerprint) ?? {},
    );
    setHydratedToken(planToken);
  }, [hydratedToken, planToken, scheduleFingerprint, storageKey]);

  // Never write before the restore above has run for this plan: the initial
  // empty state would otherwise overwrite the plan we are about to read.
  useEffect(() => {
    if (storageKey === null || planToken !== hydratedToken) return;

    saveSwapCalendarState(storageKey, scheduleFingerprint, swapsByTerm);
  }, [hydratedToken, planToken, scheduleFingerprint, storageKey, swapsByTerm]);

  // Accumulates into a map rather than deriving from the query: `ids` changes
  // on every swap, and Apollo cannot answer a filtered root field out of
  // cache, so a changed id set always goes to the network and leaves `data`
  // undefined for the request. Deriving from `data` would drop already-
  // hydrated sections mid-request.
  const [swapSectionsById, setSwapSectionsById] = useState<
    Map<number, SwapCourseSectionFragment>
  >(() => new Map());

  const savedSwapSectionIds = Array.from(
    new Set(
      Object.values(swapsByTerm)
        .flat()
        .map(({ replacementSectionId }) => replacementSectionId),
    ),
  );
  const hasSavedSwapSections = savedSwapSectionIds.length > 0;

  const { data: savedSwapSectionsData, error: savedSwapSectionsError } =
    useQuery<
      { course_section: SwapCourseSectionFragment[] },
      { ids: number[] }
    >(GET_SECTIONS_FOR_SAVED_SWAPS, {
      variables: { ids: savedSwapSectionIds },
      skip: !hasSavedSwapSections,
      // Restored plans hold only IDs, so the timetable is re-read every
      // session: a section that moved room or changed times cannot render
      // from a stale snapshot.
      fetchPolicy: 'network-only',
    });

  // Drop the section cache when the plan is empty so `clearSwaps()` alone
  // resets both persistence and hydration — no separate clear API needed.
  useEffect(() => {
    if (hasSavedSwapSections) return;
    setSwapSectionsById((prev) => (prev.size === 0 ? prev : new Map()));
  }, [hasSavedSwapSections]);

  // A section picked in the panel is cached on click so the calendar updates
  // immediately; the fetched copy overwrites it here once the query returns,
  // so network data still wins wherever it exists.
  const fetchedSections = savedSwapSectionsData?.course_section;
  useEffect(() => {
    if (!fetchedSections?.length) return;

    setSwapSectionsById((prev) => withSections(prev, fetchedSections));
  }, [fetchedSections]);

  const plannedSwapsByTerm: Partial<Record<DisplayedTerm, PlannedSwap[]>> = {};
  for (const term of DISPLAYED_TERMS) {
    const termSwaps = swapsByTerm[term];
    if (!termSwaps?.length) continue;
    plannedSwapsByTerm[term] = termSwaps.map((swap) => ({
      sourceSectionId: swap.sourceSectionId,
      replacementSectionId: swap.replacementSectionId,
      replacementSection: swapSectionsById.get(swap.replacementSectionId),
    }));
  }

  // True while any planned replacement is still missing its section details.
  // A failed fetch still counts as settled so a broken plan can always reset.
  const hasPendingSections = Object.values(swapsByTerm).some((termSwaps) =>
    (termSwaps ?? []).some(
      ({ replacementSectionId }) => !swapSectionsById.has(replacementSectionId),
    ),
  );
  const isPlanSettled = !hasPendingSections || Boolean(savedSwapSectionsError);

  /**
   * Cache the replacement fragment and update the ID plan in one step.
   * Passing the enrolled section back (same id as source) clears that swap.
   */
  const planSwap = (
    term: DisplayedTerm,
    sourceSectionId: number,
    replacementSection: SwapCourseSectionFragment,
  ) => {
    setSwapSectionsById((prev) => withSections(prev, [replacementSection]));
    setSwapsByTerm((prev) => {
      const nextTermSwaps = (prev[term] ?? []).filter(
        (savedSwap) => savedSwap.sourceSectionId !== sourceSectionId,
      );
      if (replacementSection.id !== sourceSectionId) {
        nextTermSwaps.push({
          sourceSectionId,
          replacementSectionId: replacementSection.id,
        });
      }

      const next = { ...prev };
      if (nextTermSwaps.length > 0) {
        next[term] = nextTermSwaps;
      } else {
        delete next[term];
      }
      return next;
    });
  };

  const clearSwaps = () => setSwapsByTerm({});

  return {
    plannedSwapsByTerm,
    planSwap,
    clearSwaps,
    isPlanSettled,
  };
};

export default useLocalStorageSwaps;
