import { combineReducers } from 'redux';

/* Reducers */
import HistoryReducer from './HistoryReducer';
import BrowserReducer from './BrowserReducer';
import AuthReducer from './AuthReducer';
import ModalReducer from './ModalReducer';

const reducers = {
  history: HistoryReducer,
  browser: BrowserReducer,
  auth: AuthReducer,
  modal: ModalReducer,
};

// Selectors
export const getDataState = (state) => state.data;

export default combineReducers(reducers);
