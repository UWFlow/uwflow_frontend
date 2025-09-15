import gql from 'graphql-tag';

const SearchFragment = {
  courseSearch: gql`
    fragment CourseSearch on course_search_index {
      course_id
      name
      code
      useful
      terms
      terms_with_seats
      ratings
      prof_ids
      liked
      easy
      has_prereqs
      course {
        term_delivery_modes {
          term_id
          delivery_mode
        }
      }
    }
  `,
  profSearch: gql`
    fragment ProfSearch on prof_search_index {
      prof_id
      name
      code
      clear
      course_ids
      course_codes
      engaging
      liked
      ratings
    }
  `,
};

export default SearchFragment;
