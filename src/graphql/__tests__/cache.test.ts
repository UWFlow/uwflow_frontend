import { cache } from '../apollo';
import { GET_PLANNER_DATA } from '../queries/planner/Planner';

/**
 * Exercises the real `InMemoryCache` `typePolicies` from `apollo.js` (rather
 * than a standalone helper) so the test breaks if the production normalization
 * config drifts. `cache.identify` returns the same string Apollo uses as the
 * store key for a given object.
 */
describe('Apollo InMemoryCache normalization (typePolicies keyFields)', () => {
  it('keys course_search_index by course_id', () => {
    expect(
      cache.identify({ __typename: 'course_search_index', course_id: 42 }),
    ).toBe('course_search_index:{"course_id":42}');
  });

  it('keys prof_search_index by prof_id', () => {
    expect(
      cache.identify({ __typename: 'prof_search_index', prof_id: 7 }),
    ).toBe('prof_search_index:{"prof_id":7}');
  });

  it('keys queue_section_subscribed by section_id + user_id', () => {
    expect(
      cache.identify({
        __typename: 'queue_section_subscribed',
        section_id: 100,
        user_id: 5,
      }),
    ).toBe('queue_section_subscribed:{"section_id":100,"user_id":5}');
  });

  it('keys user_shortlist by course_id + user_id', () => {
    expect(
      cache.identify({
        __typename: 'user_shortlist',
        course_id: 11,
        user_id: 5,
      }),
    ).toBe('user_shortlist:{"course_id":11,"user_id":5}');
  });

  it('keys user_course_taken by term_id + course_id', () => {
    expect(
      cache.identify({
        __typename: 'user_course_taken',
        term_id: 1205,
        course_id: 11,
      }),
    ).toBe('user_course_taken:{"term_id":1205,"course_id":11}');
  });

  it('keys user_schedule by user_id + nested section.id', () => {
    expect(
      cache.identify({
        __typename: 'user_schedule',
        user_id: 5,
        section: { id: 99 },
      }),
    ).toBe('user_schedule:{"user_id":5,"section":{"id":99}}');
  });

  it('falls back to the default id heuristic for ordinary typenames', () => {
    expect(cache.identify({ __typename: 'course', id: 123 })).toBe(
      'course:123',
    );
  });

  it('keys user_course_plan by user_id + term_id + course_id', () => {
    expect(
      cache.identify({
        __typename: 'user_course_plan',
        user_id: 5,
        term_id: 1259,
        course_id: 11,
      }),
    ).toBe('user_course_plan:{"user_id":5,"term_id":1259,"course_id":11}');
  });

  // Regression: the planner query once omitted user_id from user_course_plan,
  // so writing its result threw ("Missing field 'user_id'") and /plan hung on
  // the loading spinner. Writing a real result must select every keyField.
  it('can write a getPlannerData result (selection covers all keyFields)', () => {
    expect(() =>
      cache.writeQuery({
        query: GET_PLANNER_DATA,
        variables: { id: 5 },
        data: {
          user: [{ __typename: 'user', id: 5, program: 'CS' }],
          user_course_taken: [
            {
              __typename: 'user_course_taken',
              term_id: 1239,
              level: '1A',
              course_id: 1,
              course: { __typename: 'course', id: 1, code: 'cs135', name: 'x' },
            },
          ],
          user_course_plan: [
            {
              __typename: 'user_course_plan',
              user_id: 5,
              term_id: 1259,
              course_id: 2,
              course: {
                __typename: 'course',
                id: 2,
                code: 'cs136',
                name: 'y',
                prerequisites: [],
              },
            },
          ],
          checklist: [
            {
              __typename: 'checklist',
              id: 1,
              name: 'Honours CS',
              requirements: [],
            },
          ],
        },
      }),
    ).not.toThrow();
  });
});
