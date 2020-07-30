import gql from 'graphql-tag';

const ProfFragment = {
  profInfo: gql`
    fragment ProfInfo on prof {
      id
      name
      code
    }
  `,
  profCoursesTaught: gql`
    fragment ProfCoursesTaught on prof {
      id
      prof_courses {
        course {
          id
          code
        }
      }
    }
  `,
  profRating: gql`
    fragment ProfRating on prof {
      id
      rating {
        liked
        clear
        engaging
        filled_count
        comment_count
      }
    }
  `,
};

export default ProfFragment;
