/* Selectors */
import { getDataState } from './DataReducer';
import { getCourseInfo, getProfCourseReviews } from './CourseReducer';

/**  Professor State Important Types **\
state: {
  allProfs: Array<profID>
  profInfoMap: {
    profID: {
      profName: string
      profPicture: string
      coursesTaught: Array<courseID>
      ratings: {
        likes: int
        dislikes: int
        clear: int
        notClear: int
        engaging: int
        notEngaging: int
      }
    }
  }
}
\**************************************/

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
export const getAllProfs = state => getProfState(state).allProfs;
export const getProfInfo = (state, profID) =>
  getProfState(state).profInfoMap[profID];

export const getProfCoursesTaught = (state, profID) => {
  const profInfo = getProfInfo(state, profID);
  return profInfo ? profInfo.coursesTaught : null;
};

export const getProfCoursesTaughtInfo = (state, profID) => {
  const coursesTaught = getProfCoursesTaught(state, profID);
  if (!coursesTaught) {
    return null;
  }
  return coursesTaught.reduce((map, currentCourseID) => {
    map[currentCourseID] = getCourseInfo(state, currentCourseID);
    return map;
  }, {});
};

export const getProfCoursesTaughtReviews = (state, profID) => {
  const coursesTaught = getProfCoursesTaught(state, profID);
  if (!coursesTaught) {
    return null;
  }
  return coursesTaught.reduce((map, currentCourseID) => {
    map[currentCourseID] = getProfCourseReviews(state, currentCourseID, profID);
    return map;
  }, {});
};
