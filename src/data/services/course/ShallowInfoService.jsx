import { queryBackend } from '../../../utils/Api';

export default async () => {
  const data = await queryBackend(`
    {
      course{
        id
        name
        code
      }
    }
  `);
  return data.course;
};
