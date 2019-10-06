import React from 'react';
import PropTypes from 'prop-types';
import { PieChart, Pie, Cell } from 'recharts';
import { withTheme } from 'styled-components';

/* Styled Components */
import {
  RatingBoxWrapper,
  LikesColumn,
  NumbersInCircle,
  LargePercentage,
  GreyText,
  ProgressBarColumn,
  ProgressBarColumnWrapper,
  ProgressWrapper,
  ProgressTextLabel,
  ProgressBarWrapper,
  ProgressNumberLabel,
  NumReviewsAndRatingsWrapper,
  NumReviewsWrapper,
  NumRatingsWrapper,
} from './styles/RatingBox';

/* Child Components */
import ProgressBar from '../../../basicComponents/ProgressBar';
import CircularPercentage from '../../../basicComponents/statistics/CircularPercentage';

export const RATING_BOX_HEIGHT = 244;
export const RATING_BOX_WIDTH = 512;

/*
  NOTE DATA FOR "LIKED" MUST BE PERCENTAGES[0]
*/
const RatingBox = ({ percentages, numRatings, numReviews, theme }) => {
  const likedPercent = Math.round(percentages[0].percent * 100);
  return (
    <RatingBoxWrapper
      ratingBoxHeight={RATING_BOX_HEIGHT}
      ratingBoxWidth={RATING_BOX_WIDTH}
    >
      <LikesColumn>
        <CircularPercentage
          height={RATING_BOX_HEIGHT - 32}
          percent={likedPercent}
          barThickness={16}
          label="liked it"
        />
      </LikesColumn>
      <ProgressBarColumn>
        <ProgressBarColumnWrapper>
          {percentages.map((metric, ind) =>
            ind === 0 ? null : (
              <ProgressWrapper key={metric.displayName}>
                <ProgressTextLabel>{metric.displayName}</ProgressTextLabel>
                <ProgressBarWrapper>
                  <ProgressBar percentComplete={metric.percent} />
                  <ProgressNumberLabel>
                    {Math.round(metric.percent * 100)}%
                  </ProgressNumberLabel>
                </ProgressBarWrapper>
              </ProgressWrapper>
            ),
          )}
          <NumReviewsAndRatingsWrapper>
            <NumReviewsWrapper>
              {numReviews} {numReviews === 1 ? 'review' : 'reviews'}
            </NumReviewsWrapper>
            <NumRatingsWrapper>
              {numRatings}
              {numRatings === 1 ? ' rating' : ' ratings'}
            </NumRatingsWrapper>
          </NumReviewsAndRatingsWrapper>
        </ProgressBarColumnWrapper>
      </ProgressBarColumn>
    </RatingBoxWrapper>
  );
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

export default withTheme(RatingBox);
