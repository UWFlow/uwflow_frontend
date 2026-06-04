import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import App from 'App';
import { createStore } from 'redux';
import {
  ABOUT_PAGE_ROUTE,
  EXPLORE_PAGE_ROUTE,
  getCoursePageRoute,
  getProfPageRoute,
  LANDING_PAGE_ROUTE,
  PRIVACY_PAGE_ROUTE,
  PROFILE_PAGE_ROUTE,
  WELCOME_PAGE_ROUTE,
} from 'Routes';

/**
 * Route reachability: render the *real* <App> Switch at each declared route
 * URL and assert the intended page is reached (not the NotFound catch-all).
 *
 * The page components are loaded lazily through `LoadableComponents`; we mock
 * that module so each page is a synchronous stub tagged with a test id. This
 * keeps the test focused on the routing table (the thing under test) without
 * pulling in Apollo/Redux data fetching from the real pages. Every other leaf
 * that <App> mounts (navbar, footer, banners, analytics, modals, sentry) is
 * mocked to a no-op so the only thing that decides what renders is the Switch.
 *
 * `jest.mock` calls are hoisted above the imports above, so the mocks are in
 * place by the time `App` (and its dependency graph) is loaded.
 */

// Each lazy page becomes a synchronous stub carrying a unique test id, so the
// assertion is simply "which page stub is in the document for this URL".
jest.mock('LoadableComponents', () => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const ReactLib = require('react');
  const stub = (testId: string) => () =>
    ReactLib.createElement('div', { 'data-testid': testId });
  return {
    LoadableLandingPage: stub('page-landing'),
    LoadableProfilePage: stub('page-profile'),
    LoadableCoursePage: stub('page-course'),
    LoadableProfPage: stub('page-prof'),
    LoadableExplorePage: stub('page-explore'),
    LoadableNotFoundPage: stub('page-notfound'),
    LoadableAboutPage: stub('page-about'),
    LoadablePrivacyPage: stub('page-privacy'),
    LoadableWelcomePage: stub('page-welcome'),
  };
});

// SentryRoute is just `withSentryRouting(Route)` in production; for routing
// purposes a plain react-router Route behaves identically.
jest.mock('../sentry', () => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { Route } = require('react-router-dom');
  return { SentryRoute: Route };
});

// Chrome that mounts on every route but is irrelevant to reachability.
jest.mock('components/navigation/Navbar', () => () => null);
jest.mock('components/navigation/Footer', () => () => null);
jest.mock('components/banner/AnnouncementBanner', () => () => null);
jest.mock('components/modal/ModalMount', () => () => null);

// Side-effecting libs that App touches at module load / render time.
jest.mock('react-modal', () => ({ setAppElement: jest.fn() }));
jest.mock('react-ga', () => ({
  initialize: jest.fn(),
  pageview: jest.fn(),
  set: jest.fn(),
}));
jest.mock('react-helmet', () => ({ Helmet: () => null }));
jest.mock('react-toastify', () => ({
  ToastContainer: () => null,
  Bounce: {},
}));

// <App> only reads `state.auth.loggedIn`; a frozen logged-out store is enough.
const renderAt = (path: string) => {
  const store = createStore(() => ({ auth: { loggedIn: false } }));
  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={[path]}>
        <App />
      </MemoryRouter>
    </Provider>,
  );
};

describe('App route reachability', () => {
  const reachable: Array<{ name: string; path: string; testId: string }> = [
    { name: 'landing', path: LANDING_PAGE_ROUTE, testId: 'page-landing' },
    { name: 'profile', path: PROFILE_PAGE_ROUTE, testId: 'page-profile' },
    {
      name: 'course',
      path: getCoursePageRoute('CS135'),
      testId: 'page-course',
    },
    {
      name: 'professor',
      path: getProfPageRoute('jane_doe'),
      testId: 'page-prof',
    },
    { name: 'explore', path: EXPLORE_PAGE_ROUTE, testId: 'page-explore' },
    { name: 'about', path: ABOUT_PAGE_ROUTE, testId: 'page-about' },
    { name: 'privacy', path: PRIVACY_PAGE_ROUTE, testId: 'page-privacy' },
    { name: 'welcome', path: WELCOME_PAGE_ROUTE, testId: 'page-welcome' },
  ];

  // Use a forEach (not it.each `$name`) so titles read clearly on Jest 24,
  // which predates named template interpolation.
  reachable.forEach(({ name, path, testId }) => {
    it(`reaches the ${name} page at "${path}"`, () => {
      renderAt(path);
      expect(screen.getByTestId(testId)).toBeTruthy();
      expect(screen.queryByTestId('page-notfound')).toBeNull();
    });
  });

  it('redirects the short /prof/:profCode route to the professor page', () => {
    renderAt('/prof/jane_doe');
    expect(screen.getByTestId('page-prof')).toBeTruthy();
    expect(screen.queryByTestId('page-notfound')).toBeNull();
  });

  it('treats explore as a prefix route (sub-paths still reach explore)', () => {
    renderAt('/explore/courses');
    expect(screen.getByTestId('page-explore')).toBeTruthy();
  });

  it('renders NotFound for an unknown route', () => {
    renderAt('/this/route/does/not/exist');
    expect(screen.getByTestId('page-notfound')).toBeTruthy();
  });

  it('enforces exact matching (a sub-path of an exact route is NotFound)', () => {
    renderAt('/profile/settings');
    expect(screen.getByTestId('page-notfound')).toBeTruthy();
    expect(screen.queryByTestId('page-profile')).toBeNull();
  });
});
