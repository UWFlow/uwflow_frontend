import React from 'react';
import { ApolloProvider } from 'react-apollo';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import App from 'App';
import { history } from 'browserhistory';
import { configureStore } from 'Store';
import { ThemeProvider } from 'styled-components';

import ModalProvider from 'components/modal/ModalProvider';
import Theme from 'constants/GlobalTheme';
import client from 'graphql/apollo.js';
import SearchWorker from 'search/search.worker?worker';
import SearchProvider from 'search/SearchProvider';

import './sentry';

import './tailwind.css';

const StartApp = () => {
  const store = configureStore();

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
