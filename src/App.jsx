import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';

/* Routes */
import {
  LANDING_PAGE_ROUTE,
  PROFILE_PAGE_ROUTE,
  COURSE_PAGE_ROUTE,
  EXPLORE_PAGE_ROUTE,
  PROF_PAGE_ROUTE,
  TREE_PAGE_ROUTES,
  ABOUT_PAGE_ROUTE,
  TEST_PAGE_ROUTE,
  PRIVACY_PAGE_ROUTE,
} from './Routes';

/* Child Components */
import {
  LoadableLandingPage,
  LoadableProfilePage,
  LoadableCoursePage,
  LoadableExplorePage,
  LoadableProfPage,
  LoadableTreePage,
  LoadableAboutPage,
  LoadableTestPage,
  LoadableNotFoundPage,
  LoadablePrivacyPage,
} from './LoadableComponents';
import ModalRoot from './basicComponents/modal/ModalRoot';
import Navbar from './desktop/components/common/Navbar';

const App = () => {
  return (
    <>
      <Navbar />
      <Switch>
        <Route
          exact
          path={LANDING_PAGE_ROUTE}
          component={() => <LoadableLandingPage />}
        />
        <Route
          exact
          path={PROFILE_PAGE_ROUTE}
          component={() => <LoadableProfilePage />}
        />
        <Route
          exact
          path={COURSE_PAGE_ROUTE}
          component={() => <LoadableCoursePage />}
        />
        <Route
          exact
          path={PROF_PAGE_ROUTE}
          component={() => <LoadableProfPage />}
        />
        <Route
          exact
          path={EXPLORE_PAGE_ROUTE}
          component={() => <LoadableExplorePage />}
        />
        {TREE_PAGE_ROUTES.map((route, index) => (
          <Route
            key={index}
            exact
            path={route}
            component={() => <LoadableTreePage />}
          />
        ))}
        <Route
          exact
          path={ABOUT_PAGE_ROUTE}
          component={() => <LoadableAboutPage />}
        />
        <Route
          exact
          path={PRIVACY_PAGE_ROUTE}
          component={() => <LoadablePrivacyPage />}
        />
        <Route
          exact
          path={TEST_PAGE_ROUTE}
          component={() => <LoadableTestPage />}
        />
        <Route path="*" component={() => <LoadableNotFoundPage />} />
      </Switch>
      <ModalRoot />
    </>
  );
};

export default withRouter(App);
