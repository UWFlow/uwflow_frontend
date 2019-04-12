/* Selectors */
import { getDataState } from './DataReducer';

export default (
  state = {
    userID: null,
  },
  action,
) => {
  switch (action.type) {
    default:
      break;
  }
  return state;
};

// Selectors
export const getUserState = state => getDataState(state).user;
export const getUserID = state => getUserState(state).userID;
