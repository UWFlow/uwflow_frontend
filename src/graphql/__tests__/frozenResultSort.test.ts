import { gql, InMemoryCache } from '@apollo/client';

import { cache } from '../apollo';

/**
 * Regression tests for the Apollo Client v3 "frozen result" sort crash.
 *
 * After the migration to @apollo/client v3, query results are returned FROZEN
 * (Object.freeze'd). Apollo freezes results whenever `globalThis.__DEV__` is
 * not explicitly `false` (see @apollo/client's `maybeDeepFreeze`). Our Webpack
 * build never defines `__DEV__`, so it is `undefined` in production too — which
 * means results are frozen in production, not just in dev. (The Jest/CRA test
 * env likewise leaves `__DEV__` undefined, so the REAL production `cache` here
 * also freezes read-back results, faithfully reproducing the crash.)
 *
 * Several components called `Array.prototype.sort()` directly on these results.
 * `.sort()` mutates the array IN PLACE, so it throws at runtime:
 *
 *     TypeError: Cannot assign to read only property '0' of object '[object Array]'
 *
 * Two real crash sites were fixed by copying before sorting (`[...arr].sort()`):
 *   - src/components/common/CourseReviewBox.tsx  (`data.reviewProfs`)
 *   - src/pages/profilePage/ShortlistBox.tsx     (`user.shortlist`)
 *
 * These tests exercise the REAL `cache` from `../apollo` (mirroring the
 * existing cache.test.ts philosophy: break if the production config drifts).
 * They write then read back query results, assert the read-back array is
 * genuinely frozen, then assert that a naive in-place `.sort()` THROWS while
 * the production `[...arr].sort()` pattern does not — and sorts correctly.
 */

// Mirrors the `reviewProfs` selection from COURSE_REVIEW_PROFS that
// CourseReviewBox sorts via `[...data.reviewProfs].sort((a, b) => b.id - a.id)`.
const REVIEW_PROFS_QUERY = gql`
  query TestReviewProfs {
    reviewProfs: review {
      id
      course_id
      prof_id
      __typename
    }
  }
`;

// Mirrors the `shortlist` selection from GetUserQuery that ShortlistBox sorts
// via `[...shortlistCourses].sort((a, b) => a.course.code.localeCompare(...))`.
// `course_id`/`user_id` are selected because the real cache's `user_shortlist`
// typePolicy (apollo.js) keys on those fields — selecting them keeps this test
// honest against the production normalization config.
const SHORTLIST_QUERY = gql`
  query TestUserShortlist {
    user {
      id
      shortlist: user_shortlists {
        course_id
        user_id
        course {
          id
          code
          name
          __typename
        }
        __typename
      }
      __typename
    }
  }
`;

describe('Apollo Client v3 frozen results: copy-before-sort regression', () => {
  it('the production cache freezes read-back arrays (root cause)', () => {
    // Document the precondition that makes the bug possible: the same condition
    // Apollo uses to decide whether to freeze. If a future config sets
    // `__DEV__ = false` (or otherwise disables freezing) this assertion will
    // alert us that the threat model changed.
    expect((globalThis as { __DEV__?: unknown }).__DEV__).not.toBe(false);

    cache.writeQuery({
      query: REVIEW_PROFS_QUERY,
      data: {
        reviewProfs: [
          { __typename: 'review', id: 1, course_id: 10, prof_id: 100 },
          { __typename: 'review', id: 3, course_id: 10, prof_id: 102 },
          { __typename: 'review', id: 2, course_id: 11, prof_id: 101 },
        ],
      },
    });

    const result = cache.readQuery<{
      reviewProfs: { id: number }[];
    }>({ query: REVIEW_PROFS_QUERY });

    expect(result).not.toBeNull();
    expect(Object.isFrozen(result!.reviewProfs)).toBe(true);
  });

  it('CourseReviewBox pattern: in-place .sort() throws, copy-first works', () => {
    cache.writeQuery({
      query: REVIEW_PROFS_QUERY,
      data: {
        reviewProfs: [
          { __typename: 'review', id: 1, course_id: 10, prof_id: 100 },
          { __typename: 'review', id: 3, course_id: 10, prof_id: 102 },
          { __typename: 'review', id: 2, course_id: 11, prof_id: 101 },
        ],
      },
    });

    const data = cache.readQuery<{
      reviewProfs: { id: number; course_id: number }[];
    }>({ query: REVIEW_PROFS_QUERY })!;

    // Sanity: the array we got back is frozen, so an in-place sort is illegal.
    expect(Object.isFrozen(data.reviewProfs)).toBe(true);

    // The OLD (buggy) code: `data.reviewProfs.sort(...)` mutates in place and
    // crashes with "Cannot assign to read only property '0'".
    expect(() => data.reviewProfs.sort((a, b) => b.id - a.id)).toThrow(
      /read only property/,
    );

    // The FIXED code: copy first, then sort. No throw, and correctly ordered.
    const reviewProfs = [...data.reviewProfs].sort((a, b) => b.id - a.id);
    expect(reviewProfs.map((r) => r.id)).toEqual([3, 2, 1]);
  });

  it('ShortlistBox pattern: in-place .sort() throws, copy-first works', () => {
    cache.writeQuery({
      query: SHORTLIST_QUERY,
      data: {
        user: [
          {
            __typename: 'user',
            id: 5,
            shortlist: [
              {
                __typename: 'user_shortlist',
                course_id: 30,
                user_id: 5,
                course: {
                  __typename: 'course',
                  id: 30,
                  code: 'cs350',
                  name: 'Operating Systems',
                },
              },
              {
                __typename: 'user_shortlist',
                course_id: 31,
                user_id: 5,
                course: {
                  __typename: 'course',
                  id: 31,
                  code: 'cs240',
                  name: 'Data Structures',
                },
              },
              {
                __typename: 'user_shortlist',
                course_id: 32,
                user_id: 5,
                course: {
                  __typename: 'course',
                  id: 32,
                  code: 'cs246',
                  name: 'OO Software',
                },
              },
            ],
          },
        ],
      },
    });

    const data = cache.readQuery<{
      user: { shortlist: { course: { code: string } }[] }[];
    }>({ query: SHORTLIST_QUERY })!;

    const shortlistCourses = data.user[0].shortlist;

    // Sanity: the read-back array is frozen.
    expect(Object.isFrozen(shortlistCourses)).toBe(true);

    // The OLD (buggy) code: `shortlistCourses.sort(...)` mutates in place.
    expect(() =>
      shortlistCourses.sort((a, b) =>
        a.course.code.localeCompare(b.course.code),
      ),
    ).toThrow(/read only property/);

    // The FIXED code: copy first, then sort.
    const sortedShortlist = [...shortlistCourses].sort((a, b) =>
      a.course.code.localeCompare(b.course.code),
    );
    expect(sortedShortlist.map((s) => s.course.code)).toEqual([
      'cs240',
      'cs246',
      'cs350',
    ]);
  });

  it('also holds for a fresh default InMemoryCache (config-independent root cause)', () => {
    // Belt-and-suspenders: even a vanilla InMemoryCache freezes results, so the
    // bug class is inherent to Apollo Client v3, not our typePolicies config.
    const freshCache = new InMemoryCache();
    freshCache.writeQuery({
      query: REVIEW_PROFS_QUERY,
      data: {
        reviewProfs: [
          { __typename: 'review', id: 1, course_id: 10, prof_id: 100 },
          { __typename: 'review', id: 2, course_id: 11, prof_id: 101 },
        ],
      },
    });

    const data = freshCache.readQuery<{
      reviewProfs: { id: number }[];
    }>({ query: REVIEW_PROFS_QUERY })!;

    expect(Object.isFrozen(data.reviewProfs)).toBe(true);
    expect(() => data.reviewProfs.sort((a, b) => b.id - a.id)).toThrow(
      /read only property/,
    );
    expect(
      [...data.reviewProfs].sort((a, b) => b.id - a.id).map((r) => r.id),
    ).toEqual([2, 1]);
  });
});
