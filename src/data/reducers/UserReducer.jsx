/* Selectors */
import { getDataState } from './DataReducer';
import { getCourseInfo } from './CourseReducer';

/**  User State Important Types **\
state: {
  coursesTaken: Array<course_id>
  coursesReviewed: Array<course_id>
  profsReviewed: Array<prof_id>
}
\*********************************/

export default (
  state = {
    id: null,
    name: null,
    program: null,
    programID: null,
    picture: null,
    coursesTaken: null,
    coursesReviewed: null,
    profsReviewed: null,
    shortlist: null,
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
export const getUserState = state => getDataState(state).user;
export const getUserID = state => getUserState(state).id;
export const getUserName = state => getUserState(state).name;
export const getUserProgram = state => getUserState(state).program;
export const getUserProgramID = state => getUserState(state).programID;
export const getUserPicture = state => getUserState(state).picture;
export const getUserCoursesTaken = state => getUserState(state).coursesTaken;
export const getUserCoursesTakenInfo = state => {
  const userCoursesTaken = getUserCoursesTaken(state);
  return userCoursesTaken
    ? userCoursesTaken.reduce((list, courseID) => {
        list.append({ ...getCourseInfo(state, courseID), id: courseID });
        return list;
      }, [])
    : null;
};
export const getCoursesReviewed = state => getUserState(state).coursesReviewed;
export const getProfsReviewed = state => getUserState(state).profsReviewed;
export const getUserShortlist = state => getUserState(state).shortlist;
