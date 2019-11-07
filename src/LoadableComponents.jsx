import loadable from '@loadable/component';

export const LoadableLandingPage = loadable(() =>
  import(/* webpackPrefetch: true */ './pageSwitches/LandingPageSwitch'),
);

export const LoadableProfilePage = loadable(() =>
  import(/* webpackPrefetch: true */ './pageSwitches/ProfilePageSwitch'),
);

export const LoadableCoursePage = loadable(() =>
  import(/* webpackPrefetch: true */ './pages/coursePage/CoursePage'),
);

export const LoadableProfPage = loadable(() =>
  import(/* webpackPrefetch: true */ './pageSwitches/ProfPageSwitch'),
);

export const LoadableExplorePage = loadable(() =>
  import(/* webpackPrefetch: true */ './pageSwitches/ExplorePageSwitch'),
);

export const LoadableNotFoundPage = loadable(() =>
  import(/* webpackPrefetch: true */ './pageSwitches/NotFoundPageSwitch'),
);

export const LoadableAboutPage = loadable(() =>
  import(
    /* webpackPrefetch: true */ './desktop/components/aboutPage/AboutPage'
  ),
);

export const LoadablePrivacyPage = loadable(() =>
  import(
    /* webpackPrefetch: true */ './desktop/components/privacyPage/PrivacyPage'
  ),
);

export const LoadableTestPage = loadable(() =>
  import(/* webpackPrefetch: true */ './desktop/components/testPage/TestPage'),
);
