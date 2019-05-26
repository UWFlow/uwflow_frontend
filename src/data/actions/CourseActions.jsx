/* Services */
import ShallowInfoService from '../services/course/ShallowInfoService';
import GeneralInfoService from '../services/course/GeneralInfoService';
import CourseReviewsService from '../services/course/CourseReviewsService';

/* Const Exports */
export const COURSE_SET_ALL_SHALLOW_INFO = 'COURSE_SET_ALL_SHALLOW_INFO';
export const COURSE_FETCHING_ALL_SHALLOW_INFO =
  'COURSE_FETCHING_ALL_SHALLOW_INFO';
export const COURSE_SET_GENERAL_INFO = 'COURSE_SET_GENERAL_INFO';
export const COURSE_FETCHING_GENERAL_INFO = 'COURSE_FETCHING_GENERAL_INFO';
export const COURSE_SET_COURSE_SLOTS = 'COURSE_SET_COURSE_SLOTS';
export const COURSE_FETCHING_COURSE_SLOTS = 'COURSE_FETCHING_COURSE_SLOTS';
export const COURSE_SET_REVIEWS = 'COURSE_SET_REVIEWS';
export const COURSE_FETCHING_REVIEWS = 'COURSE_FETCHING_REVIEWS';

const setFetchingAllShallowInfo = () => ({
  type: COURSE_FETCHING_ALL_SHALLOW_INFO,
  payload: null,
});

const setAllShallowInfo = data => ({
  type: COURSE_SET_ALL_SHALLOW_INFO,
  payload: data,
});

/*
  Load all courses with id, name, courseCode
*/
export const loadAllCourseShallowInfo = () => async dispatch => {
  dispatch(setFetchingAllShallowInfo());
  const data = await ShallowInfoService();
  dispatch(setAllShallowInfo(data));
};

const setFetchingGeneralInfo = courseID => ({
  type: COURSE_FETCHING_GENERAL_INFO,
  payload: courseID,
});

const setGeneralInfo = (courseID, data) => ({
  type: COURSE_SET_GENERAL_INFO,
  payload: { id: courseID, data },
});

export const loadCourseGeneralInfo = courseID => async dispatch => {
  dispatch(setFetchingGeneralInfo(courseID));
  const data = await GeneralInfoService();
  dispatch(setGeneralInfo(courseID, data));
};

const setFetchingCourseReviews = courseID => ({
  type: COURSE_FETCHING_REVIEWS,
  payload: courseID,
});

const setCourseReviews = (courseID, data) => ({
  type: COURSE_SET_REVIEWS,
  payload: { id: courseID, data },
});

export const loadCourseReview = courseID => async dispatch => {
  dispatch(setFetchingCourseReviews);
  const data = await CourseReviewsService(courseID);
  dispatch(setCourseReviews(courseID, data));
};
