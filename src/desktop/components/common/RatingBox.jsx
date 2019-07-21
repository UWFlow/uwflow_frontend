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
  ProgressWrapper,
  ProgressTextLabel,
  ProgressBarWrapper,
  ProgressNumberLabel,
  NumReviewsAndRatingsWrapper,
  NumReviewsWrapper,
  NumRatingsWrapper,
} from './styles/RatingBox';

/* Child Components */
import ProgressBar from './ProgressBar';

export const RATING_BOX_HEIGHT = 244;

/*
  NOTE DATA FOR "LIKED" MUST BE PERCENTAGES[0]
*/
const RatingBox = ({ percentages, numRatings, numReviews, theme }) => {
  const likedPercent = Math.round(percentages[0].percent * 100);
  return (
    <RatingBoxWrapper ratingBoxHeight={RATING_BOX_HEIGHT}>
      <LikesColumn>
        <PieChart
          width={RATING_BOX_HEIGHT - 32}
          height={RATING_BOX_HEIGHT - 32}
        >
          <Pie
            dataKey="value"
            data={[{ value: likedPercent }, { value: 100 - likedPercent }]}
            cx="50%"
            cy="50%"
            outerRadius={RATING_BOX_HEIGHT / 2 - 16}
            innerRadius={RATING_BOX_HEIGHT / 2 - 32}
          >
            <Cell fill={theme.primary} />
            <Cell fill={theme.light3} />
          </Pie>
        </PieChart>
        <NumbersInCircle ratingBoxHeight={RATING_BOX_HEIGHT}>
          <LargePercentage>{likedPercent}%</LargePercentage>
          <GreyText>liked it</GreyText>
        </NumbersInCircle>
      </LikesColumn>
      <ProgressBarColumn>
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
