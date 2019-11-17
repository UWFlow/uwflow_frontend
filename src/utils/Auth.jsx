import { LOGGED_OUT } from "../data/actions/AuthActions";

// returns if a user is logged in or not
export const isLoggedIn = () => {
  return localStorage.getItem('token') !== null
    && localStorage.getItem('user_id') !== null;
}

export const getUserId = () => {
  return localStorage.getItem('user_id');
}

export const logOut = (dispatch = (_) => {}) => {
  localStorage.removeItem('token');
  localStorage.removeItem('user_id');
  dispatch({ type: LOGGED_OUT });
}