import { BROWSER_WINDOW_RESIZED } from '../actions/BrowserActions';

/* Selectors */
import { getDataState } from './DataReducer';

export default (
  state = {
    width: 0,
    height: 0,
  },
  action,
) => {
  switch (action.type) {
    case BROWSER_WINDOW_RESIZED:
      return {
        ...state,
        ...action.payload,
      };
    default:
      break;
  }
  return state;
};

// Selectors
export const getBrowserState = state => getDataState(state).browser;
export const getWidth = state => getBrowserState(state).width;
export const getHeight = state => getBrowserState(state).height;
export const getIsBrowserDesktop = state =>
  getBrowserState(state).width > 767 && getBrowserState(state).height > 500;
