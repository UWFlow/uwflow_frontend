/* Constants */
import {
  COURSE_SET_ALL_SHALLOW_INFO,
  COURSE_FETCHING_ALL_SHALLOW_INFO,
  COURSE_SET_GENERAL_INFO,
  COURSE_FETCHING_GENERAL_INFO,
  COURSE_SET_COURSE_SLOTS,
  COURSE_FETCHING_COURSE_SLOTS,
  COURSE_SET_REVIEWS,
  COURSE_FETCHING_REVIEWS,
} from '../actions/CourseActions';

/* Builders */
import {
  buildAllCoursesShallowInfo,
  buildCourseGeneralInfo,
} from '../builders/CourseBuilders';

/* Utils */
import _ from 'lodash';

/* Selectors */
import { getDataState } from './DataReducer';

/**  Course State Important Types **\
state: {
  courseInfoMap: {
    courseID: {
      ** Will exist if courseID exists **
      courseName: string
      courseCode: string
      dataStatus: {
        isFetchingGeneralInfo: boolean
        hasGeneralInfo: boolean
        isFetchingCourseSlots: boolean
        isFetchingReviews: boolean
      }
      
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
			courseSlots: {
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
        dataStatus: {
          isFetchingGeneralInfo: false,
          hasGeneralInfo: true,
          isFetchingCourseSlots: false,
          isFetchingReviews: false,
        },
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
    isFetchingAllShallowInfo: false,
    allShallowInfoFetched: false,
  },
  action,
) => {
  switch (action.type) {
    case COURSE_FETCHING_ALL_SHALLOW_INFO:
      return {
        ...state,
        isFetchingAllShallowInfo: true,
      };
    case COURSE_SET_ALL_SHALLOW_INFO:
      return buildAllCoursesShallowInfo(state, action.payload);
    case COURSE_FETCHING_GENERAL_INFO:
      return {
        ...state,
        courseInfoMap: {
          ...state.courseInfoMap,
          [action.payload.courseID]: {
            ...state.courseInfoMap[action.payload.courseID],
            dataStatus: {
              ...(state.courseInfoMap[action.payload.courseID] &&
                state.courseInfoMap[action.payload.courseID].dataStatus),
              isFetchingGeneralInfo: true,
            },
          },
        },
      };
    case COURSE_SET_GENERAL_INFO:
      // DATA INCOMPLETE
      return buildCourseGeneralInfo(
        state,
        action.payload.data,
        action.payload.id,
      );
    case COURSE_FETCHING_REVIEWS:

    case COURSE_SET_REVIEWS:

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

//Flag Selectors
export const getIsFetchingAllShallowInfo = state => {
  return getCourseState(state).isFetchingAllShallowInfo;
};
export const getIsShallowInfoFetched = state => {
  return getCourseState(state).allShallowInfoFetched;
};
export const getIsFetchingGeneralInfo = (state, courseID) => {
  const course = getCourseInfo(state, courseID);
  return course && course.dataStatus.isFetchingGeneralInfo;
};
export const getCourseHasGeneralInfo = (state, courseID) => {
  const course = getCourseInfo(state, courseID);
  return course && course.dataStatus.hasGeneralInfo; //&& course.course_slots;
};
export const getCourseDataStatus = (state, courseID) => {
  const course = getCourseInfo(state, courseID);
  return (
    course && {
      ...course.dataStatus,
      hasReviews: course.reviews ? true : false,
      hasCourseSlots: course.courseSlots ? true : false,
    }
  );
};
