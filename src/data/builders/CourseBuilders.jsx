import _ from 'lodash';

/*
  Typeof data:
  Array<{
      id,
      name,
      code
  }>
*/
export const buildAllCoursesShallowInfo = (courseState, data) => {
  var infoMapCopy = _.cloneDeep(courseState.courseInfoMap);
  return {
    ...courseState,
    allCourses: data,
    courseInfoMap: data.reduce((infoMap, curr) => {
      if (!infoMap[curr.id]) {
        infoMap[curr.id] = {
          dataStatus: {
            isFetchingGeneralInfo: false,
            hasGeneralInfo: false,
            isFetchingCourseSlots: false,
            isFetchingReviews: false,
          },
        };
      }
      infoMap[curr.id].courseName = curr.name;
      infoMap[curr.id].courseCode = curr.code;
      return infoMap;
    }, infoMapCopy),
    isFetchingAllShallowInfo: false,
    allShallowInfoFetched: true,
  };
};

/*
  Typeof data:
  {
    code
    name
    description
    course_review_stats: {
      easy
      liked
      not_easy
      not_liked
      not_useful
      useful
    }
  }
*/
export const buildCourseGeneralInfo = (courseState, data, id) => {
  // DATA INCOMPLETE
  return {
    ...courseState,
    courseInfoMap: {
      ...courseState.courseInfoMap,
      [id]: {
        ...courseState.courseInfoMap[id],
        courseName: data.name,
        courseCode: data.code,
        description: data.description,
        ratings: {
          likes: data.course_review_stats.liked,
          dislikes: data.course_review_stats.not_liked,
          easy: data.course_review_stats.easy,
          notEasy: data.course_review_stats.not_easy,
          useful: data.course_review_stats.useful,
          notUseful: data.course_review_stats.not_useful,
        },
        dataStatus: {
          ...(courseState.courseInfoMap[id] &&
            courseState.courseInfoMap[id].dataStatus),
          isFetchingGeneralInfo: false,
          hasGeneralInfo: true,
        },
      },
    },
  };
};

/*
  Typeof data:
  Array<{
    easy
    liked
    useful
    user {
      program
      id
    }
  text
  }>
}
*/
export const buildCourseReviewInfo = (courseState, data, id) => {
  return {
    ...courseState,
    courseInfoMap: {
      ...courseState.courseInfoMap,
      [id]: {
        ...courseState.courseInfoMap,
        reviews: data.reduce((all, curr) => {
          all[curr.user.id] = {
            review: curr.text,
            useful: curr.useful,
            easy: curr.easy,
            liked: curr.liked,
            program_of_reviewer: curr.user.program,
          };
          return all;
        }, {}),
      },
    },
  };
};
