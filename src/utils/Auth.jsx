// returns if a user is logged in or not
export const isLoggedIn = () => {
  return localStorage.getItem('token') !== null
    && localStorage.getItem('user_id') !== null;
}