import { Route } from 'react-router-dom';
import * as Sentry from '@sentry/react';

import { history } from './browserhistory';

Sentry.init({
  dsn:
    'https://1185dfd648e675f96285c2fecd697d6c@o4508810215686144.ingest.us.sentry.io/4508810216800256',
  integrations: [
    Sentry.reactRouterV5BrowserTracingIntegration({ history }),
    Sentry.replayIntegration(),
  ],
  tracePropagationTargets: ['localhost'],
  // Session Replay
  replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.

  // We recommend adjusting this value in production, or using tracesSampler
  // for finer control
  tracesSampleRate: 1.0,
});

// Optionally export anything from here if needed
export const SentryRoute = Sentry.withSentryRouting(Route);
