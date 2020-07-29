import React from 'react';
import { ApolloProvider } from 'react-apollo';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import App from 'App';
import { createBrowserHistory } from 'history';
import { configureStore } from 'Store';
import { ThemeProvider } from 'styled-components';
// eslint-disable-next-line import/no-webpack-loader-syntax
import SearchWorker from 'worker-loader!search/search.worker';

import ModalProvider from 'components/modal/ModalProvider';
import Theme from 'constants/GlobalTheme';
import client from 'graphql/apollo.js';
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
