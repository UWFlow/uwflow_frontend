import { defaultDataIdFromObject } from 'apollo-cache-inmemory';

export const getApolloDataId = (object) => {
  switch (object.__typename) {
    case 'course_search_index':
      return `${object.course_id}`;
    case 'prof_search_index':
      return `${object.prof_id}`;
    case 'queue_section_subscribed':
      return `${object.section_id}:${object.user_id}`;
    case 'user_shortlist':
      return `${object.course_id}:${object.user_id}`;
    case 'user_schedule':
      return `${object.user_id}:${object.section.id}`;
    case 'user_course_taken':
      return `${object.term_id}:${object.course_id}`;
    default:
      return defaultDataIdFromObject(object);
  }
};
