export const LOGGED_IN = 'LOGGED_IN';
export const LOGGED_OUT = 'LOGGED_OUT';

export const loggedIn = () => ({
  type: LOGGED_IN,
});

export const loggedOut = () => ({
  type: LOGGED_OUT,
});
