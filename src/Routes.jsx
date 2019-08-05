/* Utils */
import pathToRegexp from 'path-to-regexp';

/* Page Routes */
export const LANDING_PAGE_ROUTE = '/';
export const PROFILE_PAGE_ROUTE = '/profile';
export const COURSE_PAGE_ROUTE = '/course/:courseID';
export const PROF_PAGE_ROUTE = '/prof/:profID';
export const EXPLORE_PAGE_ROUTE = '/explore';
export const TREE_PAGE_ROUTE = '/tree';
export const TREE_PAGE_WITH_COURSE_ROUTE = '/tree/:courseID';
export const ABOUT_PAGE_ROUTE = '/about';
export const TEST_PAGE_ROUTE = '/api-test';

export const TREE_PAGE_ROUTES = [TREE_PAGE_ROUTE, TREE_PAGE_WITH_COURSE_ROUTE];

/* Route Testers */
export const LANDING_PAGE_TESTER = pathToRegexp(LANDING_PAGE_ROUTE);
export const PROFILE_PAGE_TESTER = pathToRegexp(PROFILE_PAGE_ROUTE);
export const COURSE_PAGE_TESTER = pathToRegexp(COURSE_PAGE_ROUTE);
export const EXPLORE_PAGE_TESTER = pathToRegexp(EXPLORE_PAGE_ROUTE);
export const PROF_PAGE_TESTER = pathToRegexp(PROF_PAGE_ROUTE);
export const TREE_PAGE_TESTER = pathToRegexp(TREE_PAGE_ROUTE);
export const TREE_PAGE_WITH_COURSE_TESTER = pathToRegexp(
  TREE_PAGE_WITH_COURSE_ROUTE,
);
export const ABOUT_PAGE_TESTER = pathToRegexp(ABOUT_PAGE_ROUTE);
export const TEST_PAGE_TESTER = pathToRegexp(TEST_PAGE_ROUTE);

export const TREE_PAGE_TESTERS = [
  TREE_PAGE_TESTER,
  TREE_PAGE_WITH_COURSE_TESTER,
];

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

export const isOnTreePageRoute = location =>
  TREE_PAGE_TESTER.test(location.pathname);

export const isOnTreeWithCoursePageRoute = location =>
  TREE_PAGE_WITH_COURSE_TESTER.test(location.pathname);

export const isOnAnyTreePageRoute = location =>
  TREE_PAGE_TESTERS.some(tester => tester.test(location.pathname));

export const isOnAboutPageRoute = location =>
  ABOUT_PAGE_TESTER.test(location.pathname);

export const isOnTestPageRoute = location =>
  TEST_PAGE_TESTER.test(location.pathname);

/* Route Generators */
export const toCoursePageRoute = pathToRegexp.compile(COURSE_PAGE_ROUTE);
export const toProfPageRoute = pathToRegexp.compile(PROF_PAGE_ROUTE);
export const toTreePageRoute = pathToRegexp.compile(
  TREE_PAGE_WITH_COURSE_ROUTE,
);

/* Route Getters */
export const getCoursePageRoute = courseID => toCoursePageRoute({ courseID });
export const getProfPageRoute = profID => toProfPageRoute({ profID });
export const getTreePageRoute = courseID => toTreePageRoute({ courseID });
