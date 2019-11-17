import { combineReducers } from 'redux';

/* Reducers */
import HistoryReducer from './HistoryReducer';
import BrowserReducer from './BrowserReducer';
import AuthReducer from './AuthReducer';
import TextboxReducer from './TextboxReducer';

const reducers = {
  history: HistoryReducer,
  browser: BrowserReducer,
  auth: AuthReducer,
  textbox: TextboxReducer,
};

// Selectors
export const getDataState = state => state.data;

export default combineReducers(reducers);
