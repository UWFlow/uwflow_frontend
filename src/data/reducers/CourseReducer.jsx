/* Selectors */
import { getDataState } from './DataReducer';

export default (
  state = {
    allCourses: [],
    courseInfoMap: {},
  },
  action,
) => {
  switch (action.type) {
    default:
      break;
  }
  return state;
};

// Selectors
export const getCourseState = state => getDataState(state).course;
export const getAllCourses = state => getCourseState(state).allCourses;
export const getCourseInfo = (state, courseID) =>
  getCourseState(state).courseInfoMap[courseID];
