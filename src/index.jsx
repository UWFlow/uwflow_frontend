import React from 'react';
import { ApolloProvider } from 'react-apollo';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import App from 'App';
import { createBrowserHistory } from 'history';
import { configureStore } from 'Store';
import { ThemeProvider } from 'styled-components';

import Theme from 'constants/GlobalTheme';
import ModalProvider from 'data/providers/ModalProvider';
import client from 'graphql/apollo.js';
/* eslint-disable-next-line */
import SearchWorker from 'search/search.worker.js';
import SearchProvider from 'search/SearchProvider';

const StartApp = () => {
  const store = configureStore();
  const history = createBrowserHistory();

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

StartApp();
