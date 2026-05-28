import { getApolloDataId } from './cacheId';

describe('getApolloDataId', () => {
  it('keeps composite IDs stable for user-owned cache records', () => {
    expect(
      getApolloDataId({
        __typename: 'queue_section_subscribed',
        section_id: 123,
        user_id: 456,
      }),
    ).toBe('123:456');

    expect(
      getApolloDataId({
        __typename: 'user_schedule',
        section: { id: 789 },
        user_id: 456,
      }),
    ).toBe('456:789');
  });

  it('keeps search index IDs independent of GraphQL typename prefixes', () => {
    expect(
      getApolloDataId({
        __typename: 'course_search_index',
        course_id: 'CS135',
      }),
    ).toBe('CS135');
  });
});
