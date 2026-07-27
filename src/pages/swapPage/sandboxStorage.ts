import { UserScheduleFragment } from 'generated/graphql';

/**
 * Local persistence for the swap sandbox.
 *
 * The sandbox is a client-side simulation — swapping a section never touches
 * the user's real enrollment — but losing a half-planned schedule to a refresh
 * is annoying, so the sandboxed schedule is mirrored into localStorage. Nothing
 * is sent to the server.
 *
 * A stored sandbox is branched off the real schedule as it looked when the swap
 * was made. If that schedule later changes (e.g. a fresh Quest import), the
 * branch is discarded rather than replayed on top of a different base.
 */

export type SandboxScheduleEntry = UserScheduleFragment['schedule'][number];

/** Sandboxed schedules keyed by term label, e.g. "Fall 2025". */
export type SandboxByTerm = { [term: string]: SandboxScheduleEntry[] };

const SANDBOX_VERSION = 1;

const sandboxKey = (userId: number) => `swap_sandbox_${userId}`;

type StoredTerm = {
  /** Fingerprint of the real schedule this sandbox was branched from. */
  base: string;
  sections: SandboxScheduleEntry[];
};

type StoredSandbox = {
  version: number;
  terms: { [term: string]: StoredTerm };
};

/**
 * Order-independent identity of a term's sections. Two schedules with the same
 * fingerprint hold the same sections, so the sandbox is unmodified.
 */
export const scheduleFingerprint = (
  entries: readonly SandboxScheduleEntry[],
): string =>
  entries
    .map((entry) => entry.section.id)
    .sort((a, b) => a - b)
    .join(',');

/** Whether any term's sandbox differs from the user's real schedule. */
export const isSandboxModified = (
  sandboxByTerm: SandboxByTerm,
  baseByTerm: SandboxByTerm,
): boolean =>
  Object.entries(sandboxByTerm).some(
    ([term, sections]) =>
      scheduleFingerprint(sections) !==
      scheduleFingerprint(baseByTerm[term] ?? []),
  );

export const clearSwapSandbox = (userId: number): void => {
  localStorage.removeItem(sandboxKey(userId));
};

export const saveSwapSandbox = (
  userId: number,
  sandboxByTerm: SandboxByTerm,
  baseByTerm: SandboxByTerm,
): void => {
  const terms: StoredSandbox['terms'] = {};
  Object.entries(sandboxByTerm).forEach(([term, sections]) => {
    const base = scheduleFingerprint(baseByTerm[term] ?? []);
    // A term swapped back to its original sections is not worth storing.
    if (scheduleFingerprint(sections) === base) {
      return;
    }
    terms[term] = { base, sections };
  });

  if (Object.keys(terms).length === 0) {
    clearSwapSandbox(userId);
    return;
  }

  const stored: StoredSandbox = { version: SANDBOX_VERSION, terms };
  try {
    localStorage.setItem(sandboxKey(userId), JSON.stringify(stored));
  } catch {
    // Storage full or unavailable (private mode): the sandbox stays in memory.
  }
};

export const loadSwapSandbox = (
  userId: number,
  baseByTerm: SandboxByTerm,
): SandboxByTerm => {
  const raw = localStorage.getItem(sandboxKey(userId));
  if (!raw) {
    return {};
  }

  let stored: StoredSandbox | null = null;
  try {
    stored = JSON.parse(raw) as StoredSandbox;
  } catch {
    return {};
  }
  if (stored?.version !== SANDBOX_VERSION || !stored.terms) {
    return {};
  }

  const restored: SandboxByTerm = {};
  Object.entries(stored.terms).forEach(([term, entry]) => {
    if (!entry?.sections?.length) {
      return;
    }
    // Drop sandboxes branched off a schedule the user has since changed.
    if (entry.base !== scheduleFingerprint(baseByTerm[term] ?? [])) {
      return;
    }
    restored[term] = entry.sections;
  });
  return restored;
};
