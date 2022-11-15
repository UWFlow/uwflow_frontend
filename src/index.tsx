import React from 'react';
import { ApolloProvider } from 'react-apollo';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';
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

Sentry.init({
  dsn:
    'https://b7c690df83634243877b9e322c371f08@o4504154328465408.ingest.sentry.io/4504154360643584',
  integrations: [new BrowserTracing()],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

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
