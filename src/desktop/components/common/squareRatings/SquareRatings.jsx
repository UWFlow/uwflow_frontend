import React from 'react';
import PropTypes from 'prop-types';

/*
  Provides either a row of squares indicating a rating out of 5 or 
  a Y and N block indicating a rating for yes or no (for the liked it rating for courses)
*/
const SquareRatings = ({ total, rating, boolRating }) => {return <div>SQUARE RATING</div>};

SquareRatings.propTypes = {
  total: PropTypes.number, //int total that the rating is out of (5 for us rn)
  rating: PropTypes.number, // int rating that is given (out of 5)
  boolRating: PropTypes.bool, //This will be not null/undefined if we want to use this intead of a number out of 5
};

export const SquareRatings