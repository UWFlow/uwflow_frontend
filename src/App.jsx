import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';

/* Routes */
import {
  LANDING_PAGE_ROUTE,
  PROFILE_PAGE_ROUTE,
  COURSE_PAGE_ROUTE,
  PROF_PAGE_ROUTE,
  TREE_PAGE_ROUTES,
  ABOUT_PAGE_ROUTE,
  TEST_PAGE_ROUTE,
} from './Routes';

/* Child Components */
import {
  LoadableLandingPage,
  LoadableProfilePage,
  LoadableCoursePage,
  LoadableProfPage,
  LoadableTreePage,
  LoadableAboutPage,
  LoadableTestPage,
} from './LoadableComponents';
import NoMatchRedirect from './desktop/components/common/NoMatchRedirect';

const App = () => {
  return (
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
        path={TEST_PAGE_ROUTE}
        component={() => <LoadableTestPage />}
      />
      {/* Catch all other routes and redirect */}
      <Route path="*" component={NoMatchRedirect} />
    </Switch>
  );
};

export default withRouter(App);
