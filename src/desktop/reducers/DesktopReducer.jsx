import { combineReducers } from 'redux';

import TextboxReducer from './TextboxReducer';

const reducers = { textbox: TextboxReducer };

export default combineReducers(reducers);

export const getDesktopState = state => state.desktop;
