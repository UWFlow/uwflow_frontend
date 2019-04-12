import { combineReducers } from 'redux';

/* Reducers */
import HistoryReducer from './HistoryReducer';
import BrowserReducer from './BrowserReducer';
import UserReducer from './UserReducer';
import CourseReducer from './CourseReducer';
import ProfReducer from './ProfReducer';

const reducers = {
  history: HistoryReducer,
  browser: BrowserReducer,
  user: UserReducer,
  course: CourseReducer,
  professor: ProfReducer,
};

// Selectors
export const getDataState = state => state.data;

export default combineReducers(reducers);
