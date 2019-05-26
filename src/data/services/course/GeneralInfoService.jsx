import { queryBackend } from '../../../utils/Api';

/*
  INCOMPLETE
  MISSING:
    profsTeaching
    prereqs
    postreqs
    antireqs
    termOfferings
    requiredTextbooks
*/
export default async courseID => {
  const data = await queryBackend(`
    {
      course(where: {id: {_eq: ${courseID}}}) {
        code
        name
        description
        course_review_stats {
          easy
          liked
          not_easy
          not_liked
          not_useful
          useful
        }
      }
    }
  `);
  return data.course[0];
};
