import {
  LOGGED_IN,
  LOGGED_OUT,
  AUTH_MODAL_CLOSE,
  AUTH_MODAL_OPEN,
} from '../actions/AuthActions';

/* Selectors */
import { getDataState } from './DataReducer';

import { isLoggedIn } from '../../utils/Auth';

export default (
  state = {
    loggedIn: isLoggedIn(),
    authModalOpen: false,
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
    case AUTH_MODAL_OPEN:
      return {
        ...state,
        authModalOpen: true,
      };
    case AUTH_MODAL_CLOSE:
      return {
        ...state,
        authModalOpen: false,
      };
    default:
      break;
  }
  return state;
};

// Selectors
export const getAuthState = state => getDataState(state).auth;
export const getIsLoggedIn = state => getAuthState(state).loggedIn;
export const getIsAuthModalOpen = state => getAuthState(state).authModalOpen;
