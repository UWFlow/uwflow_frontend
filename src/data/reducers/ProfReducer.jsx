/* Selectors */
import { getDataState } from './DataReducer';

export default (
  state = {
    allProfs: [],
    profInfoMap: {},
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
export const getProfState = state => getDataState(state).professor;
export const getAllCourses = state => getProfState(state).allProfs;
export const getCourseInfo = (state, profID) =>
  getProfState(state).profInfoMap[profID];
