export const LOCAL_BACKEND_ENDPOINT = 'http://localhost:8080/v1/graphql';
export const AUTH_DICT = { 'x-hasura-admin-secret': 'secretinprod' };

export const BACKEND_ENDPOINT =
  process.env.NODE_ENV === 'development' ? LOCAL_BACKEND_ENDPOINT : null;
