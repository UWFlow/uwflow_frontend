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

      isFullProf: boolean
      ** Will exist if isFullProf is true **
      coursesTaught: Array<courseID>
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
          term_course_taken: string
          date_course_taken: string
          program_of_reviewer: string
        }
      }
    }
  }
}
\**************************************/

export default (
  state = {
    allProfs: ['TP123'],
    profInfoMap: {
      TP123: {
        profName: 'Test Prof',
        isFullProf: true,
        coursesTaught: ['TC123'],
        profPicture: 'abc',
        ratings: {
          likes: 10,
          dislikes: 3,
          clear: 15,
          unclear: 4,
          engaging: 8,
          unengaging: 14,
        },
      },
    },
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
export const getProfRatings = (state, profID) => {
  const info = getProfInfo(state, profID);
  return info ? info.ratings : null;
};
export const getProfReviews = (state, profID) =>
  getProfState(state).profReviewsMap[profID];
export const getProfCourseReviews = (state, profID, courseID) => {
  const reviews = getProfReviews(state, profID);
  return reviews ? reviews[courseID] : null;
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
