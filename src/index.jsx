import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { ApolloProvider } from 'react-apollo';

import { configureStore } from './Store';
import Theme from './constants/GlobalTheme';
import client from './graphql/apollo.js';

/* Child Components */
import App from './App';
import SearchProvider from './search/SearchProvider';
import SearchClient from './search/SearchClient';

/* Util */
import createHistory, { syncReduxHistory } from './utils/History';

const StartApp = (store, history) => {
  syncReduxHistory(store, history);
  const searchClient = new SearchClient();

  ReactDOM.render(
    <ApolloProvider client={client}>
      <SearchProvider searchClient={searchClient}>
        <Provider store={store}>
          <Router history={history}>
            <ThemeProvider theme={Theme}>
              <App />
            </ThemeProvider>
          </Router>
        </Provider>
      </SearchProvider>
    </ApolloProvider>,
    document.getElementById('root'),
  );
};

StartApp(configureStore(), createHistory());
