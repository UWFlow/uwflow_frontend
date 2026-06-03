import { defaultDataIdFromObject, StoreObject } from '@apollo/client';

/**
 * Cache-normalization key generator for UWFlow types whose primary key isn't a
 * plain `id`/`_id` field (Hasura views and composite-key relationships). Every
 * other type falls back to Apollo's `defaultDataIdFromObject`.
 *
 * Extracted from the ApolloClient setup in `apollo.js` so the normalization
 * logic can be unit-tested in isolation.
 */
export const dataIdFromObject = (
  object: Readonly<StoreObject>,
): string | undefined => {
  // The store object is loosely typed (`StoreValue`); read the key fields off a
  // permissive view to keep the original (untyped) behaviour intact.
  const obj = object as Record<string, any>;

  switch (object.__typename) {
    case 'course_search_index':
      return `${obj.course_id}`;
    case 'prof_search_index':
      return `${obj.prof_id}`;
    case 'queue_section_subscribed':
      return `${obj.section_id}:${obj.user_id}`;
    case 'user_shortlist':
      return `${obj.course_id}:${obj.user_id}`;
    case 'user_schedule':
      return `${obj.user_id}:${obj.section.id}`;
    case 'user_course_taken':
      return `${obj.term_id}:${obj.course_id}`;
    default:
      return defaultDataIdFromObject(object);
  }
};
