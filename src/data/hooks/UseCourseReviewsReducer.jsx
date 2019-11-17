import { useState } from 'react';
import PropTypes from 'prop-types';

export const UPDATE_REVIEW_DATA = 'update_review_data';
export const SORT_COURSE_REVIEWS_BY_PROF = 'sort_by_prof';

const convertInputToState = data => {
  if (!data) {
    return {
      courseReviews: [],
      reviewsByProf: [],
      courseReviewProfs: [],
      profReviewProfs: [],
    };
  }
  const courseReviews = data.course_review.map(r => ({
    upvotes: r.course_review_votes_aggregate.aggregate.sum.vote,
    review: r.text,
    author: r.author,
    user: r.user,
    updated_at: r.updated_at,
    metrics: {
      useful: r.useful,
      easy: r.easy,
      liked: r.liked != null,
    },
    prof: r.prof ? r.prof.name : '',
  }));

  const reviewsByProf = data.prof_review.reduce((allProfs, current) => {
    let profObject;
    let foundProfObject = false;
    for (let i of allProfs) {
      if (current.prof && current.prof.name === i.name) {
        profObject = i;
        foundProfObject = true;
        break;
      }
    }
    if (!foundProfObject) {
      profObject = {
        id: current.prof ? current.prof.id : 0,
        code: current.prof ? current.prof.code : '',
        name: current.prof ? current.prof.name : '',
        liked: current.prof
          ? current.prof.course_reviews_aggregate.aggregate.avg.liked
          : 0,
        reviews: [],
      };
      allProfs.push(profObject);
    }
    profObject.reviews.push({
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
    return allProfs;
  }, []);

  const courseReviewProfs = data.course_review.reduce((allProfs, review) => {
    if (review.prof && !allProfs.includes(review.prof.name)) {
      allProfs.push(review.prof.name);
    }
    return allProfs;
  }, []);

  const profReviewProfs = reviewsByProf.map(obj => obj.name);

  return {
    courseReviews,
    reviewsByProf,
    courseReviewProfs,
    profReviewProfs,
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

const useCourseReviewsReducer = initialState => {
  const [state, setState] = useState(convertInputToState(initialState));

  const dispatch = action => {
    const newState = processDispatch(state, action);
    setState(newState);
  };

  return [state, dispatch];
};

useCourseReviewsReducer.propTypes = {
  initialState: PropTypes.shape({
    course_review: PropTypes.arrayOf(
      PropTypes.shape({
        course: PropTypes.shape({
          code: PropTypes.string,
          id: PropTypes.number,
        }),
        course_review_votes_aggregate: PropTypes.shape({
          aggregate: PropTypes.shape({
            sum: PropTypes.shape({
              vote: PropTypes.number,
            }),
          }),
        }),
        easy: PropTypes.number,
        id: PropTypes.number,
        liked: PropTypes.number,
        prof: PropTypes.shape({
          id: PropTypes.number,
          name: PropTypes.string,
        }),
        text: PropTypes.string,
        useful: PropTypes.number,
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
    prof_review: PropTypes.arrayOf(
      PropTypes.shape({
        clear: PropTypes.number,
        engaging: PropTypes.number,
        id: PropTypes.number,
        prof: PropTypes.shape({
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
  }),
};

export default useCourseReviewsReducer;
