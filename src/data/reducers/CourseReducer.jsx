/* Selectors */
import { getDataState } from './DataReducer';

/**  Course State Important Types **\
state: {
  courseInfoMap: {
    courseID: {
      courseName: string
      courseCode: string
      description: string
      prereqs: Array<courseID>
      postreqs: Array<courseID>
      antireqs: Array<courseID>
      termOfferings: Array<string>
      ratings: {
        likes: int
        dislikes: int
        useful: int
        notUseful: int
        easy: int
        notEasy: int
      }
      requiredTextbooks: Array<string>
    }
  }
  courseReviewsMap:{
    courseID: {
      userID: {
        review: string
        useful: boolean
        easy: boolean
        liked: boolean
        upvotes: int
        profID?: string
      }
    }
  }
}
\***********************************/

export default (
  state = {
    allCourses: [],
    courseInfoMap: {},
    courseReviewsMap: {},
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

export const getCourseReviews = (state, courseID) =>
  getCourseState(state).courseReviewsMap[courseID];

export const getRequiredTextbooks = (state, courseID) => {
  const courseInfo = getCourseInfo(state, courseID);
  return courseInfo ? courseInfo.requiredTextbooks : null;
};
