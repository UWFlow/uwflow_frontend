import React from 'react';
import Modal from 'react-modal';
import { Route, Switch, withRouter } from 'react-router-dom';
import { ToastContainer, Bounce } from 'react-toastify';
import { Helmet } from 'react-helmet';
import 'react-toastify/dist/ReactToastify.css';
import { Scrollbars } from 'react-custom-scrollbars';

/* Routes */
import {
  LANDING_PAGE_ROUTE,
  PROFILE_PAGE_ROUTE,
  COURSE_PAGE_ROUTE,
  EXPLORE_PAGE_ROUTE,
  PROF_PAGE_ROUTE,
  ABOUT_PAGE_ROUTE,
  PRIVACY_PAGE_ROUTE,
  WELCOME_PAGE_ROUTE,
} from './Routes';

/* Child Components */
import {
  LoadableLandingPage,
  LoadableProfilePage,
  LoadableCoursePage,
  LoadableExplorePage,
  LoadableProfPage,
  LoadableAboutPage,
  LoadableNotFoundPage,
  LoadablePrivacyPage,
  LoadableWelcomePage,
} from './LoadableComponents';
import Navbar from './components/navigation/Navbar';
import Footer from './components/navigation/Footer';
import AuthModal from './auth/AuthModal';

/* Constants */
import { SEO_DESCRIPTIONS } from './constants/Messages';

Modal.setAppElement('#root');

const App = () => {
  return (
    <>
      <ToastContainer
        position="bottom-center"
        autoClose={2000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnVisibilityChange
        draggable
        pauseOnHover
        transition={Bounce}
      />
      <Navbar />
      <Helmet>
        <title>UW Flow</title>
        <meta name="description" content={SEO_DESCRIPTIONS.default} />
      </Helmet>
      <Scrollbars autoHeight autoHide autoHeightMin="100%" autoHeightMax="100%">
        <div style={{ height: '100vh' }}>
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
              path={WELCOME_PAGE_ROUTE}
              component={() => <LoadableWelcomePage />}
            />
            <Route path="*" component={() => <LoadableNotFoundPage />} />
          </Switch>
          <Footer />
        </div>
      </Scrollbars>
      <AuthModal />
    </>
  );
};

export default withRouter(App);
