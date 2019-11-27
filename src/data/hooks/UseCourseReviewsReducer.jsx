import { useState } from 'react';

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

  const courseReviews = data.review.map(r => ({
    id: r.id,
    upvotes: r.course_review_rating.upvote_count,
    upvote_users: r.course_review_upvotes ?
      r.course_review_upvotes.map(vote => Number(vote.user_id)) : [],
    review: r.course_comment,
    author: r.author,
    user: r.user,
    created_at: r.created_at,
    updated_at: r.updated_at,
    metrics: {
      useful: r.course_useful,
      easy: r.course_easy,
      liked: r.liked != null,
    },
    prof: r.prof ? r.prof.name : '',
  }));

  const reviewsByProf = data.review.reduce((allProfs, current) => {
    let profObject;
    let foundProfObject = false;

    if (!current.prof || !current.prof_comment) {
      return allProfs;
    }

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
          ? current.prof.reviews_aggregate.aggregate.avg.liked
          : 0,
        reviews: [],
      };
      allProfs.push(profObject);
    }
    profObject.reviews.push({
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
    return allProfs;
  }, []);

  const courseReviewProfs = data.review.reduce((allProfs, review) => {
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

export default useCourseReviewsReducer;
