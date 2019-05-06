/* Selectors */
import { getDataState } from './DataReducer';

/**  Course State Important Types **\
state: {
  courseInfoMap: {
    courseID: {
      ** Will exist if courseID exists **
      courseName: string
      courseCode: string

      hasGeneralInfo: boolean
      ** Will exist if hasGeneralInfo is true **
      description: string
      profsTeaching: Array<profID>
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

      hasSlotInfo: boolean
			** Will exist if hasSlotInfo is true **
			course_slots: {
				term:  (eg. Winter 2019) {
          section: {
            class: int
            campus: string
            openings: int
            openings_taken: int
            time: some format to express time of day and week
            location: string
            instructors?: Array<prof_id or string>
          }
        }
      }
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
      }
    }
  }
}
\***********************************/

export default (
  state = {
    allCourses: [],
    courseInfoMap: {
      TC123: {
        courseName: 'Test Course',
        courseCode: 'TC123',
        hasGeneralInfo: true,
        description:
          'A description lenghthened to be pretty long to stand in for an actual description asliej asef lfaes feasl faesf laes fef elflsefefe la fef eflaf f af ef a fefleasf ele faes f feaf efaf asef fea es f eafse fef a esf ae ',
        profsTeaching: [],
        prereqs: [],
        postreqs: [],
        antireqs: [],
        termOfferings: ['Spring 2019', 'Winter 2019'],
        ratings: {
          likes: 10,
          dislikes: 3,
          useful: 15,
          notUseful: 7,
          easy: 10,
          notEasy: 10,
        },
        requiredTextbooks: ['A Big Textbook', 'Another Big Textboox'],
        hasSlotInfo: true,
      },
    },
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
export const getIsFullCourse = (state, courseID) => {
  const course = getCourseInfo(state, courseID);
  return course && course.hasGeneralInfo && course.hasSlotInfo;
};
export const getCourseRatings = (state, courseID) =>
  getCourseInfo(state, courseID).ratings;
export const getCourseReviews = (state, courseID) =>
  getCourseState(state).courseReviewsMap[courseID];

export const getRequiredTextbooks = (state, courseID) => {
  const courseInfo = getCourseInfo(state, courseID);
  return courseInfo ? courseInfo.requiredTextbooks : null;
};
