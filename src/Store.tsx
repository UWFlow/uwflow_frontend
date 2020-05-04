import { combineReducers, createStore, applyMiddleware } from 'redux';

import { debounce } from 'lodash';

/* Middleware */
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';

/* Reducers */
import DataReducer from './data/reducers/DataReducer';

/* Actions */
import { BrowserWindowResized } from './data/actions/BrowserActions';

const rootReducer = combineReducers({
  data: DataReducer,
});

const loggerMiddleware = createLogger({
  predicate: () => process.env.NODE_ENV === 'development',
});

const middleware = [thunk, loggerMiddleware];

export const configureStore = () => {
  const store = createStore(rootReducer, applyMiddleware(...middleware));

  store.dispatch(BrowserWindowResized(window.innerWidth, window.innerHeight));

  // List on browser resize
  window.addEventListener(
    'resize',
    debounce(() => {
      store.dispatch(
        BrowserWindowResized(window.innerWidth, window.innerHeight),
      );
    }, 100),
  );

  return store;
};
