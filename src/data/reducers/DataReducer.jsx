import { combineReducers } from 'redux';

/* Reducers */
import HistoryReducer from './HistoryReducer';
import BrowserReducer from './BrowserReducer';
import AuthReducer from './AuthReducer';

const reducers = {
  history: HistoryReducer,
  browser: BrowserReducer,
  auth: AuthReducer,
};

// Selectors
export const getDataState = state => state.data;

export default combineReducers(reducers);
