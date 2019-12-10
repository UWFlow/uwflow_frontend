/* Utils */
import { pathToRegexp, compile } from 'path-to-regexp';

/* Page Routes */
export const LANDING_PAGE_ROUTE = '/';
export const PROFILE_PAGE_ROUTE = '/profile';
export const COURSE_PAGE_ROUTE = '/course/:courseCode';
export const PROF_PAGE_ROUTE = '/prof/:profCode';
export const EXPLORE_PAGE_ROUTE = '/explore';
export const ABOUT_PAGE_ROUTE = '/about';
export const PRIVACY_PAGE_ROUTE = '/privacy';
export const TEST_PAGE_ROUTE = '/api-test';

/* Route Testers */
export const LANDING_PAGE_TESTER = pathToRegexp(LANDING_PAGE_ROUTE);
export const PROFILE_PAGE_TESTER = pathToRegexp(PROFILE_PAGE_ROUTE);
export const COURSE_PAGE_TESTER = pathToRegexp(COURSE_PAGE_ROUTE);
export const EXPLORE_PAGE_TESTER = pathToRegexp(EXPLORE_PAGE_ROUTE);
export const PROF_PAGE_TESTER = pathToRegexp(PROF_PAGE_ROUTE);
export const ABOUT_PAGE_TESTER = pathToRegexp(ABOUT_PAGE_ROUTE);
export const PRIVACY_PAGE_TESTER = pathToRegexp(PRIVACY_PAGE_ROUTE);
export const TEST_PAGE_TESTER = pathToRegexp(TEST_PAGE_ROUTE);

/* Page Testers */
export const isOnLandingPageRoute = location =>
  LANDING_PAGE_TESTER.test(location.pathname);

export const isOnProfilePageRoute = location =>
  PROFILE_PAGE_TESTER.test(location.pathname);

export const isOnCoursePageRoute = location =>
  COURSE_PAGE_TESTER.test(location.pathname);

export const isOnProfPageRoute = location =>
  PROF_PAGE_TESTER.test(location.pathname);

export const isOnExplorePageRoute = location =>
  EXPLORE_PAGE_TESTER.test(location.pathname);

export const isOnAboutPageRoute = location =>
  ABOUT_PAGE_TESTER.test(location.pathname);

export const isOnPrivacyPageRoute = location =>
  PRIVACY_PAGE_TESTER.test(location.pathname);

export const isOnTestPageRoute = location =>
  TEST_PAGE_TESTER.test(location.pathname);

/* Route Generators */
export const toCoursePageRoute = compile(COURSE_PAGE_ROUTE);
export const toProfPageRoute = compile(PROF_PAGE_ROUTE);

/* Route Getters */
export const getCoursePageRoute = courseCode =>
  toCoursePageRoute({ courseCode });
export const getProfPageRoute = profCode => toProfPageRoute({ profCode });
