import React from 'react';
import loadable from '@loadable/component';

import PageLoading from 'components/display/PageLoading';

// Each page is code-split into its own chunk. Over the network (staging/prod) that
// chunk must download before the page can mount, so without a `fallback` the page
// area renders blank until it arrives. Show a spinner during that fetch instead.
const fallback = <PageLoading />;

export const LoadableLandingPage = loadable(
  () => import(/* webpackPrefetch: true */ './pages/landingPage/LandingPage'),
  { fallback },
);

export const LoadableProfilePage = loadable(
  () => import(/* webpackPrefetch: true */ './pages/profilePage/ProfilePage'),
  { fallback },
);

export const LoadableCoursePage = loadable(
  () => import(/* webpackPrefetch: true */ './pages/coursePage/CoursePage'),
  { fallback },
);

export const LoadableProfPage = loadable(
  () => import(/* webpackPrefetch: true */ './pages/profPage/ProfPage'),
  { fallback },
);

export const LoadableExplorePage = loadable(
  () => import(/* webpackPrefetch: true */ './pages/explorePage/ExplorePage'),
  { fallback },
);

export const LoadableNotFoundPage = loadable(
  () => import(/* webpackPrefetch: true */ './pages/notFoundPage/NotFoundPage'),
  { fallback },
);

export const LoadableAboutPage = loadable(
  () => import(/* webpackPrefetch: true */ './pages/aboutPage/AboutPage'),
  { fallback },
);

export const LoadablePrivacyPage = loadable(
  () => import(/* webpackPrefetch: true */ './pages/privacyPage/PrivacyPage'),
  { fallback },
);

export const LoadableWelcomePage = loadable(
  () => import(/* webpackPrefetch: true */ './pages/welcomePage/WelcomePage'),
  { fallback },
);
