import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';

/* Routes */
import {
  LANDING_PAGE_ROUTE,
  PROFILE_PAGE_ROUTE,
  COURSE_PAGE_ROUTE,
  EXPLORE_PAGE_ROUTE,
  PROF_PAGE_ROUTE,
  ABOUT_PAGE_ROUTE,
  TEST_PAGE_ROUTE,
  PRIVACY_PAGE_ROUTE,
} from './Routes';

/* Child Components */
import LandingPage from './desktop/components/landingPage/LandingPage';
import ProfilePage from './desktop/components/profilePage/ProfilePage';
import CoursePage from './desktop/components/coursePage/CoursePage';
import ExplorePage from './desktop/components/explorePage/ExplorePage';
import ProfPage from './desktop/components/profilePage/ProfilePage';
import AboutPage from './desktop/components/aboutPage/AboutPage';
import TestPage from './desktop/components/testPage/TestPage';
import NotFoundPage from './desktop/components/notFoundPage/NotFoundPage';
import PrivacyPage from './desktop/components/privacyPage/PrivacyPage';

import ModalRoot from './sharedComponents/modal/ModalRoot';
import Navbar from './sharedComponents/navigation/Navbar';
import Footer from './sharedComponents/navigation/Footer';

const App = () => {
  return (
    <>
      <Navbar />
      <Switch>
        <Route
          exact
          path={LANDING_PAGE_ROUTE}
          component={() => <LandingPage />}
        />
        <Route
          exact
          path={PROFILE_PAGE_ROUTE}
          component={() => <ProfilePage />}
        />
        <Route
          exact
          path={COURSE_PAGE_ROUTE}
          component={() => <CoursePage />}
        />
        <Route
          exact
          path={PROF_PAGE_ROUTE}
          component={() => <ProfPage />}
        />
        <Route
          exact
          path={EXPLORE_PAGE_ROUTE}
          component={() => <ExplorePage />}
        />
        <Route
          exact
          path={ABOUT_PAGE_ROUTE}
          component={() => <AboutPage />}
        />
        <Route
          exact
          path={PRIVACY_PAGE_ROUTE}
          component={() => <PrivacyPage />}
        />
        <Route
          exact
          path={TEST_PAGE_ROUTE}
          component={() => <TestPage />}
        />
        <Route path="*" component={() => <NotFoundPage />} />
      </Switch>
      <Footer />
      <ModalRoot />
    </>
  );
};

export default withRouter(App);
