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

			** Check for existence individually **
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

      ** Check for existence individually
      reviews: {
        userID: {
          review: string
          useful: boolean
          easy: boolean
          liked: boolean
          upvotes: int
          term_course_taken: string
          date_course_taken: string
          program_of_reviewer: string
        }
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
        courseCode: 'TC 123',
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
        reviews: {},
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
export const getCourseState = state => getDataState(state).course;
export const getAllCourses = state => getCourseState(state).allCourses;
export const getCourseInfo = (state, courseID) =>
  getCourseState(state).courseInfoMap[courseID];
export const getIsFullCourse = (state, courseID) => {
  const course = getCourseInfo(state, courseID);
  return course && course.hasGeneralInfo; //&& course.course_slots;
};
export const getCourseRatings = (state, courseID) => {
  const course = getCourseInfo(state, courseID);
  return course ? course.ratings : null;
};
export const getCourseReviews = (state, courseID) => {
  const course = getCourseInfo(state, courseID);
  return course ? course.reviews : null;
};

export const getRequiredTextbooks = (state, courseID) => {
  const courseInfo = getCourseInfo(state, courseID);
  return courseInfo ? courseInfo.requiredTextbooks : null;
};
