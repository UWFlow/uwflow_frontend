import { LOGGED_IN, LOGGED_OUT } from '../actions/AuthActions';

/* Selectors */
import { getDataState } from './DataReducer';

import { isLoggedIn } from '../../utils/Auth';

export default (
  state = {
    loggedIn: isLoggedIn(),
  },
  action,
) => {
  switch (action.type) {
    case LOGGED_IN:
      return {
        ...state,
        loggedIn: true,
      };
    case LOGGED_OUT:
      return {
        ...state,
        loggedIn: false,
      };
    default:
      break;
  }
  return state;
};

// Selectors
export const getAuthState = (state) => getDataState(state).auth;
export const getIsLoggedIn = (state) => getAuthState(state).loggedIn;
