/* Selectors */
import { getDataState } from './DataReducer';
import { getCourseInfo } from './CourseReducer';

/**  Professor State Important Types **\
state: {
  allProfs: Array<profID>
  profInfoMap: {
    profID: {
      ** Will exist if profID exists **
      profName: string
      coursesTaught: Array<courseID>

      isFullProf: boolean
      ** Will exist if isFullProf is true **
      profPicture: string
      ratings: {
        likes: int
        dislikes: int
        clear: int
        unclear: int
        engaging: int
        unengaging: int
      }
    }
  }
  profReviewsMap: {
    profID: {
      courseID: {
        userID: {
          review: string
          clear: boolean
          engaging: boolean
          upvotes: int
        }
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
export const getProfReviews = (state, profID) =>
  getProfState(state).profReviewsMap[profID];
export const getProfCourseReview = (state, profID, courseID) => {
  const reviews = getProfReviews(state, profID);
  return reviews[courseID];
};

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
