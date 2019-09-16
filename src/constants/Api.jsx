export const LOCAL_GRAPHQL_ENDPOINT = 'http://localhost:8080/v1/graphql';
export const LOCAL_BACKEND_ENDPOINT = 'http://localhost:8081';

export const AUTH_DICT = { 'x-hasura-admin-secret': 'secretinprod' };

export const GRAPHQL_ENDPOINT =
  process.env.NODE_ENV === 'development'
    ? LOCAL_GRAPHQL_ENDPOINT
    : '/v1/graphql';

export const BACKEND_ENDPOINT =
  process.env.NODE_ENV === 'development' ? LOCAL_BACKEND_ENDPOINT : null;

export const EMAIL_AUTH_LOGIN_ENDPOINT = '/auth/email/login';
export const EMAIL_AUTH_REGISTER_ENDPOINT = '/auth/email/register';
export const GOOGLE_AUTH_ENDPOINT = '/auth/google/login';
export const FACEBOOK_AUTH_ENDPOINT = '/auth/facebook/login';

export const SCHEDULE_PARSE_ENDPOINT = '/parse/schedule';
export const TRANSCRIPT_PARSE_ENDPOINT = '/parse/transcript';

export const GOOGLE_APP_ID = '292230821846-cogmasv1s0rbvhp0dr886vik2c73etb3';
export const FACEBOOK_APP_ID = '289196947861602';
