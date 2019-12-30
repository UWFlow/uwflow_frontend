import gql from 'graphql-tag';

const SearchFragment = {
  courseSearch: gql`
    fragment CourseSearchFragment on course_search_index {
      course_id
      name
      code
      useful
      terms
      ratings
      prof_ids
      liked
      easy
    }
  `,
  profSearch: gql`
    fragment ProfSearchFragment on prof_search_index {
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
