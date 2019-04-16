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
      requiredTextbooks: Array<string>
    }
  }
  courseReviewsMap:{
    courseID: {
      userID: {
        review: string
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

export const getProfCourseReviews = (state, courseID, profID) => {
  const courseReviews = getCourseReviews(state, courseID);
  if (!courseReviews) {
    return null;
  }
  return Object.keys(courseReviews).reduce((arr, currentUserID) => {
    if (courseReviews[currentUserID].profID === profID) {
      arr.append({ userID: currentUserID, ...courseReviews[currentUserID] });
    }
    return arr;
  }, []);
};

export const getRequiredTextbooks = (state, courseID) => {
  const courseInfo = getCourseInfo(state, courseID);
  return courseInfo ? courseInfo.requiredTextbooks : null;
};
