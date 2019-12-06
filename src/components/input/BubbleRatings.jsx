import React from 'react';
import PropTypes from 'prop-types';
import { ThumbsUp, ThumbsDown } from 'react-feather';
import { withTheme } from 'styled-components';

/* Styled Components */
import {
  BubbleRatingsWrapper,
  UnitCircle,
  ThumbsWrapper,
  Thumb
} from './styles/BubbleRatings';

const Thumbs = ({ boolRating }) => (
  <ThumbsWrapper>
    <Thumb colored={boolRating === true}>
      <ThumbsUp width={20} height={20} strokeWidth={3} fill='white' />
    </Thumb>
    <Thumb colored={boolRating === false}>
      <ThumbsDown width={20} height={20} fill='white' />
    </Thumb>
  </ThumbsWrapper>
);

const Squares = ({ rating, total }) => (
  <>
    {Array.apply(null, Array(total)).map((_, ind) => {
      return (
        <UnitCircle
          key={ind}
          filled={ind < rating}
          diameter={16}
        />
      );
    })}
  </>
);

/*
  Provides either a row of circles indicating a rating out of 5 or 
  a Y and N block indicating a rating for yes or no (for the liked it rating for courses)
*/
const BubbleRatings = ({ total = 5, rating, boolRating, theme }) => {
  return (
    <BubbleRatingsWrapper>
      {boolRating === true || boolRating === false ? (
        <Thumbs boolRating={boolRating} />
      ) : (
        <Squares rating={rating} total={total} />
      )}
    </BubbleRatingsWrapper>
  );
};

BubbleRatings.propTypes = {
  total: PropTypes.number, //int total that the rating is out of (5 for us rn)
  rating: PropTypes.number, // int rating that is given (out of 5)
  boolRating: PropTypes.bool, //This will be not null/undefined if we want to use this intead of a number out of 5
  theme: PropTypes.object,
};

export default withTheme(BubbleRatings);
