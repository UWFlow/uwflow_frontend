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
  `
};

export default ProfFragment;
