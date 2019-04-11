import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { configureStore } from './Store';
import Theme from './constants/GlobalTheme';

/* Child Components */
import App from './App';

/* Util */
import createHistory, { syncReduxHistory } from './utils/History';

const StartApp = (store, history) => {
  syncReduxHistory(store, history);

  ReactDOM.render(
    <Provider store={store}>
      <Router history={history}>
        <ThemeProvider theme={Theme}>
          <App />
        </ThemeProvider>
      </Router>
    </Provider>,
    document.getElementById('root'),
  );
};

StartApp(configureStore(), createHistory());
