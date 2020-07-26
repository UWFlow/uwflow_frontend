import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { ApolloProvider } from 'react-apollo';
import { createBrowserHistory } from 'history';

/* eslint-disable-next-line */
import SearchWorker from 'search/search.worker.js';

import { configureStore } from 'Store';
import Theme from 'constants/GlobalTheme';
import client from 'graphql/apollo.js';

/* Child Components */
import App from 'App';
import SearchProvider from 'search/SearchProvider';
import ModalProvider from 'data/providers/ModalProvider';

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
