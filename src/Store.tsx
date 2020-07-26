import { createStore, applyMiddleware } from 'redux';

import { debounce } from 'lodash';

/* Middleware */
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';

/* Reducers */
import rootReducer from './data/reducers/RootReducer';

/* Actions */
import { BrowserWindowResized } from './data/actions/BrowserActions';

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
