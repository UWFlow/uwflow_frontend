import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import styled from 'styled-components';

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
import ModalRoot from './desktop/components/common/modal/ModalRoot';
import Navbar from './desktop/components/common/Navbar';

const PageWrapper = styled.div`
  padding: 50px 125px;

  @media only screen and (max-width: 720px) {
    padding: 50px 5%;
  }
`;

const App = () => {
  return (
    <>
      <Navbar />
      <PageWrapper>
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
      </PageWrapper>
      <ModalRoot />
    </>
  );
};

export default withRouter(App);
