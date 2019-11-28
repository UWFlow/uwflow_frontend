import gql from 'graphql-tag';

const ProfFragment = {
  profInfo: gql`
    fragment ProfInfoFragment on prof {
      id
      name
      code
    }
  `,
  profCoursesTaught: gql`
    fragment ProfCoursesTaughtFragment on prof {
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
    fragment ProfRatingFragment on prof {
      id
      rating {
        liked
        clear
        engaging
        filled_count
        comment_count
      }
    }
  `
};

export default ProfFragment;
