import React from 'react';
import PropTypes from 'prop-types';
import { withTheme } from 'styled-components';

/* Styled Components */
import {
  SquareRatingWrapper,
  UnitCircle,
  YNText,
} from './styles/SquareRatings';

const YesNoRating = ({ boolRating, theme, diameter = 20 }) => (
  <>
    <UnitCircle
      filled={boolRating}
      diameter={diameter}
      emptyColor={theme.dark3}
    >
      <YNText>Y</YNText>
    </UnitCircle>
    <UnitCircle
      filled={!boolRating}
      diameter={diameter}
      emptyColor={theme.dark3}
    >
      <YNText>N</YNText>
    </UnitCircle>
  </>
);

const Squares = ({ rating, total }) => (
  <>
    {Array.apply(null, Array(total)).map((v, ind) => {
      return (
        <UnitCircle
          key={ind}
          filled={ind < rating}
          diameter={16}
          border={!(ind < rating)}
        />
      );
    })}
  </>
);

/*
  Provides either a row of circles indicating a rating out of 5 or 
  a Y and N block indicating a rating for yes or no (for the liked it rating for courses)
*/
const SquareRatings = ({ total = 5, rating, boolRating, theme }) => {
  return (
    <SquareRatingWrapper>
      {boolRating === true || boolRating === false ? (
        <YesNoRating boolRating={boolRating} theme={theme} />
      ) : (
        <Squares rating={rating} total={total} />
      )}
    </SquareRatingWrapper>
  );
};

SquareRatings.propTypes = {
  total: PropTypes.number, //int total that the rating is out of (5 for us rn)
  rating: PropTypes.number, // int rating that is given (out of 5)
  boolRating: PropTypes.bool, //This will be not null/undefined if we want to use this intead of a number out of 5
  theme: PropTypes.object,
};

export default withTheme(SquareRatings);
