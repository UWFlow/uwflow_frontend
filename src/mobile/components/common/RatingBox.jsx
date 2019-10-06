import React from 'react';
import PropTypes from 'prop-types';

const RatingBox = ({ percentages, numRatings, numReviews, theme }) => {
  return <>Rating Box</>;
};

RatingBox.propTypes = {
  percentages: PropTypes.arrayOf(
    PropTypes.shape({
      displayName: PropTypes.string,
      percent: PropTypes.number,
    }),
  ),
  numRatings: PropTypes.number,
  numReviews: PropTypes.number,
  theme: PropTypes.object,
};

export default RatingBox;
