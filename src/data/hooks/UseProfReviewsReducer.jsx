import { useState } from 'react';

export const UPDATE_REVIEW_DATA = 'update review data';

const convertInputToState = data => {
  if (!data) {
    return {
      reviewsByCourse: [],
      courses: [],
    };
  }
  const reviewsByCourse = data.review.reduce((allCourses, current) => {
    let courseObject;
    let foundCourseObject = false;
    for (let i of allCourses) {
      if (current.course && current.course.id === i.id) {
        courseObject = i;
        foundCourseObject = true;
        break;
      }
    }
    if (!foundCourseObject) {
      courseObject = {
        id: current.course ? current.course.id : -1,
        name: current.course ? current.course.name : '',
        code: current.course ? current.course.code : '',
        liked: current.course
          ? current.course.reviews_aggregate.aggregate.avg.liked
          : 0,
        reviews: [],
      };
      allCourses.push(courseObject);
    }
    courseObject.reviews.push({
      id: current.id,
      upvotes: current.prof_review_rating.upvote_count,
      upvote_users: current.prof_review_upvotes ?
        current.prof_review_upvotes.map(vote => Number(vote.user_id)) : [],
      review: current.prof_comment,
      author: current.author,
      user: current.user,
      created_at: current.created_at,
      updated_at: current.updated_at,
      metrics: {
        clear: current.prof_clear,
        engaging: current.prof_engaging,
      },
    });
    return allCourses;
  }, []);

  const courses = reviewsByCourse.map(obj => obj.code);

  return {
    reviewsByCourse,
    courses,
  };
};

const processDispatch = (currentState, action) => {
  switch (action.type) {
    case UPDATE_REVIEW_DATA:
      return convertInputToState(action.payload);
    default:
      return currentState;
  }
};

const useProfReviewsReducer = initialState => {
  const [state, setState] = useState(convertInputToState(initialState));

  const dispatch = action => {
    const newState = processDispatch(state, action);
    setState(newState);
  };

  return [state, dispatch];
};

export default useProfReviewsReducer;
