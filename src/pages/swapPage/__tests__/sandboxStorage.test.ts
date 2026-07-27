import {
  clearSwapSandbox,
  isSandboxModified,
  loadSwapSandbox,
  SandboxByTerm,
  SandboxScheduleEntry,
  saveSwapSandbox,
} from '../sandboxStorage';

const USER_ID = 1;
const TERM = 'Fall 2025';

// Only the section id matters to the storage layer.
const entry = (id: number) =>
  ({ user_id: USER_ID, section: { id } } as unknown as SandboxScheduleEntry);

const base: SandboxByTerm = { [TERM]: [entry(1), entry(2)] };
const swapped: SandboxByTerm = { [TERM]: [entry(9), entry(2)] };

beforeEach(() => localStorage.clear());

describe('swap sandbox storage', () => {
  it('round-trips a modified sandbox', () => {
    saveSwapSandbox(USER_ID, swapped, base);
    expect(loadSwapSandbox(USER_ID, base)).toEqual(swapped);
  });

  it('stores nothing once the sandbox matches the real schedule', () => {
    saveSwapSandbox(USER_ID, swapped, base);
    // Order is irrelevant: the same sections mean nothing was swapped.
    saveSwapSandbox(USER_ID, { [TERM]: [entry(2), entry(1)] }, base);
    expect(loadSwapSandbox(USER_ID, base)).toEqual({});
  });

  it('drops a sandbox branched off a schedule that has since changed', () => {
    saveSwapSandbox(USER_ID, swapped, base);
    const reimported: SandboxByTerm = { [TERM]: [entry(3), entry(4)] };
    expect(loadSwapSandbox(USER_ID, reimported)).toEqual({});
  });

  it('keeps sandboxes separate per user', () => {
    saveSwapSandbox(USER_ID, swapped, base);
    expect(loadSwapSandbox(USER_ID + 1, base)).toEqual({});
  });

  it('ignores unparseable stored data', () => {
    localStorage.setItem(`swap_sandbox_${USER_ID}`, 'not json');
    expect(loadSwapSandbox(USER_ID, base)).toEqual({});
  });

  it('clears the sandbox', () => {
    saveSwapSandbox(USER_ID, swapped, base);
    clearSwapSandbox(USER_ID);
    expect(loadSwapSandbox(USER_ID, base)).toEqual({});
  });
});

describe('isSandboxModified', () => {
  it('is false for an empty or unchanged sandbox', () => {
    expect(isSandboxModified({}, base)).toBe(false);
    expect(isSandboxModified({ [TERM]: [entry(2), entry(1)] }, base)).toBe(
      false,
    );
  });

  it('is true once a section differs from the real schedule', () => {
    expect(isSandboxModified(swapped, base)).toBe(true);
  });
});
