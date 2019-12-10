export const LOGGED_IN = 'LOGGED_IN';
export const LOGGED_OUT = 'LOGGED_OUT';
export const AUTH_MODAL_OPEN = 'AUTH_MODEL_OPEN';
export const AUTH_MODAL_CLOSE = 'AUTH_MODEL_CLOSE';

export const loggedIn = () => ({
  type: LOGGED_IN,
});

export const loggedOut = () => ({
  type: LOGGED_OUT,
});

export const authModalOpen = () => ({
  type: AUTH_MODAL_OPEN,
});

export const authModalClose = () => ({
  type: AUTH_MODAL_CLOSE,
});
