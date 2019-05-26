import { queryBackend } from '../../../utils/Api';

/*
  INCOMPLETE
  MISSING:
    upvotes
    term_course_taken: string
    date_course_taken: string
*/
export default async courseID => {
  const data = await queryBackend(`
    {
      course_review(where: {course_id: {_eq: ${courseID}}}) {
        easy
        liked
        useful
        user {
          program
          id
        }
        text
      }
    }
  `);
  return data.course_review;
};
