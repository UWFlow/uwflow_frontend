import loadable from '@loadable/component';

export const LoadableLandingPage = loadable(() =>
  import('./pages/landingPage/LandingPage'),
);

export const LoadableProfilePage = loadable(() =>
  import('./pages/profilePage/ProfilePage'),
);

export const LoadableCoursePage = loadable(() =>
  import('./pages/coursePage/CoursePage'),
);

export const LoadableProfPage = loadable(() =>
  import('./pages/profPage/ProfPage'),
);

export const LoadableExplorePage = loadable(() =>
  import('./pages/explorePage/ExplorePage'),
);

export const LoadableNotFoundPage = loadable(() =>
  import('./pages/notFoundPage/NotFoundPage'),
);

export const LoadableAboutPage = loadable(() =>
  import('./pages/aboutPage/AboutPage'),
);

export const LoadablePrivacyPage = loadable(() =>
  import('./pages/privacyPage/PrivacyPage'),
);

export const LoadableWelcomePage = loadable(() =>
  import('./pages/welcomePage/WelcomePage'),
);
