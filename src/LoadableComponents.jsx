import React from 'react';
import loadable from '@loadable/component';

export const LoadableLandingPage = loadable(() =>
  import(/* webpackPrefetch: true */ './desktop/components/landingPage/LandingPage'),
);

export const LoadableProfilePage = loadable(() =>
  import(/* webpackPrefetch: true */ './desktop/components/profilePage/ProfilePage'),
);

export const LoadableCoursePage = loadable(() =>
  import(/* webpackPrefetch: true */ './desktop/components/coursePage/CoursePage'),
);

export const LoadableProfPage = loadable(() =>
  import(/* webpackPrefetch: true */ './desktop/components/profPage/ProfPage'),
);

export const LoadableTreePage = loadable(() =>
  import(/* webpackPrefetch: true */ './desktop/components/treePage/TreePage'),
);

export const LoadableAboutPage = loadable(() =>
  import(/* webpackPrefetch: true */ './desktop/components/aboutPage/AboutPage'),
);

export const LoadableTestPage = loadable(() =>
  import(/* webpackPrefetch: true */ './desktop/components/testPage/TestPage'),
);
