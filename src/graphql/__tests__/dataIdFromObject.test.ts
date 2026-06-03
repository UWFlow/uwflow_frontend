import { defaultDataIdFromObject } from '@apollo/client';

import { dataIdFromObject } from '../dataIdFromObject';

describe('dataIdFromObject (Apollo InMemoryCache normalization)', () => {
  it('keys course_search_index by course_id', () => {
    expect(
      dataIdFromObject({ __typename: 'course_search_index', course_id: 42 }),
    ).toBe('42');
  });

  it('keys prof_search_index by prof_id', () => {
    expect(
      dataIdFromObject({ __typename: 'prof_search_index', prof_id: 7 }),
    ).toBe('7');
  });

  it('keys queue_section_subscribed by section_id:user_id', () => {
    expect(
      dataIdFromObject({
        __typename: 'queue_section_subscribed',
        section_id: 100,
        user_id: 5,
      }),
    ).toBe('100:5');
  });

  it('keys user_shortlist by course_id:user_id', () => {
    expect(
      dataIdFromObject({
        __typename: 'user_shortlist',
        course_id: 11,
        user_id: 5,
      }),
    ).toBe('11:5');
  });

  it('keys user_schedule by user_id:section.id', () => {
    expect(
      dataIdFromObject({
        __typename: 'user_schedule',
        user_id: 5,
        section: { id: 99 },
      }),
    ).toBe('5:99');
  });

  it('keys user_course_taken by term_id:course_id', () => {
    expect(
      dataIdFromObject({
        __typename: 'user_course_taken',
        term_id: 1205,
        course_id: 11,
      }),
    ).toBe('1205:11');
  });

  it('falls back to Apollo defaultDataIdFromObject for normal typenames', () => {
    const object = { __typename: 'course', id: 123 };
    expect(dataIdFromObject(object)).toBe('course:123');
    expect(dataIdFromObject(object)).toBe(defaultDataIdFromObject(object));
  });

  it('returns undefined (via default) for objects without an id', () => {
    expect(
      dataIdFromObject({ __typename: 'something_unkeyed' }),
    ).toBeUndefined();
  });
});
