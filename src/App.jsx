import React, { useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import { Helmet } from 'react-helmet';
import { Scrollbars } from 'react-custom-scrollbars';
import { Route, Switch, withRouter } from 'react-router-dom';
import { ToastContainer, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
  isOnLandingPageRoute,
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
import CourseNotificationEmailModal from './components/emailInputModals/CourseNotificationEmailModal';
import ScrollProvider from './data/providers/ScrollProvider';
import ModalMount from './components/modal/ModalMount';

/* Constants */
import { SEO_DESCRIPTIONS } from './constants/Messages';
import { NAVBAR_HEIGHT } from './constants/PageConstants';
import { BACKEND_ENDPOINT, AUTH_REFRESH_ENDPOINT } from './constants/Api';

/* Utils */
import { makeAuthenticatedPOSTRequest } from './utils/Api';
import { getIsLoggedIn } from './data/reducers/AuthReducer';

Modal.setAppElement('#root');

const mapStateToProps = state => ({
  isLoggedIn: getIsLoggedIn(state),
});

const App = ({ history, isLoggedIn, location }) => {
  const scrollRef = useRef(null);

  // refresh auth token if logged in
  useEffect(() => {
    if (!isLoggedIn) {
      return;
    }

    const refreshAuth = async () => {
      const [response, status] = await makeAuthenticatedPOSTRequest(
        `${BACKEND_ENDPOINT}${AUTH_REFRESH_ENDPOINT}`,
        {},
      );

      if (status >= 400) {
        return;
      }

      localStorage.setItem('token', response.token);
    };

    refreshAuth();
  });

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
      <Switch>
        <Route exact path={LANDING_PAGE_ROUTE} component={() => <div />} />
        <Route path="*" component={() => <Navbar />} />
      </Switch>
      <Helmet>
        <title>UW Flow</title>
        <meta name="description" content={SEO_DESCRIPTIONS.default} />
      </Helmet>
      <ScrollProvider value={scrollRef}>
        <Scrollbars
          autoHeight
          autoHide
          autoHeightMin="100%"
          autoHeightMax="100%"
        >
          <div
            ref={scrollRef}
            style={{
              height: `calc(100vh - ${
                isOnLandingPageRoute(history.location) ? 0 : NAVBAR_HEIGHT
              }px)`,
            }}
          >
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
      </ScrollProvider>
      <CourseNotificationEmailModal />
      <ModalMount />
    </>
  );
};

export default withRouter(connect(mapStateToProps)(App));
