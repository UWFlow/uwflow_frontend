import { useState } from 'react';
import PropTypes from 'prop-types';

export const UPDATE_REVIEW_DATA = 'update review data';

const convertInputToState = data => {
  if (!data) {
    return {
      reviewsByCourse: [],
      courses: [],
    };
  }
  const reviewsByCourse = data.prof_review.reduce((allCourses, current) => {
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
          ? current.course.course_reviews_aggregate.aggregate.avg.liked
          : 0,
        reviews: [],
      };
      allCourses.push(courseObject);
    }
    courseObject.reviews.push({
      upvotes: current.prof_review_votes_aggregate.aggregate.sum.vote,
      review: current.text,
      author: current.author,
      user: current.user,
      updated_at: current.updated_at,
      metrics: {
        clear: current.clear,
        engaging: current.engaging,
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

useProfReviewsReducer.propTypes = {
  prof_review: PropTypes.arrayOf(
    PropTypes.shape({
      clear: PropTypes.number,
      course: PropTypes.shape({
        code: PropTypes.string,
        course_reviews_aggregate: PropTypes.shape({
          aggregate: PropTypes.shape({
            avg: PropTypes.shape({
              liked: PropTypes.number,
            }),
          }),
        }),
        id: PropTypes.number,
        name: PropTypes.string,
      }),
      prof_review_votes_aggregate: PropTypes.shape({
        aggregate: PropTypes.shape({
          sum: PropTypes.shape({
            vote: PropTypes.number,
          }),
        }),
      }),
      text: PropTypes.string,
      author: PropTypes.shape({
        full_name: PropTypes.string,
        program: PropTypes.string,
        picture_url: PropTypes.string,
      }),
      user: PropTypes.shape({
        user_id: PropTypes.number
      })
    }),
  ),
};

export default useProfReviewsReducer;
