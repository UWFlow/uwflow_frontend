import { combineReducers } from 'redux';

/* Reducers */
import HistoryReducer from './HistoryReducer';
import BrowserReducer from './BrowserReducer';

const reducers = {
  history: HistoryReducer,
  browser: BrowserReducer,
};

// Selectors
export const getDataState = state => state.data;

export default combineReducers(reducers);
