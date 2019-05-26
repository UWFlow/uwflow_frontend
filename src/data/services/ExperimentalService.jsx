import { queryBackend } from '../../utils/Api';

export const testService = () => {
  queryBackend(
    `{
      course{
        id    
        name
      }
    }`,
  );
};
