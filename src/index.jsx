import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { ApolloProvider } from 'react-apollo';

/* eslint-disable-next-line */
import SearchWorker from 'search/search.worker.js';

import { configureStore } from 'Store';
import Theme from 'constants/GlobalTheme';
import client from 'graphql/apollo.js';

/* Util */
import createHistory, { syncReduxHistory } from 'utils/History';

/* Child Components */
import App from 'App';
import SearchProvider from 'search/SearchProvider';
import ModalProvider from 'data/providers/ModalProvider.jsx';

const StartApp = (store, history) => {
  syncReduxHistory(store, history);

  ReactDOM.render(
    <ApolloProvider client={client}>
      <ModalProvider>
        <SearchProvider searchWorker={new SearchWorker()}>
          <Provider store={store}>
            <Router history={history}>
              <ThemeProvider theme={Theme}>
                <App />
              </ThemeProvider>
            </Router>
          </Provider>
        </SearchProvider>
      </ModalProvider>
    </ApolloProvider>,
    document.getElementById('root'),
  );
};

StartApp(configureStore(), createHistory());
