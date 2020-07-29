import React from 'react';
import { useSelector } from 'react-redux';

import ProgressBar from 'components/display/ProgressBar';
import CircularPercentage from 'components/statistics/CircularPercentage';
import { REVIEWS_DIV_ID } from 'constants/PageConstants';
import { getIsBrowserDesktop, RootState } from 'data/reducers/RootReducer';
import { processRating } from 'utils/Misc';

import {
  CircularPercentageWrapper,
  NumCommentsAndRatingsWrapper,
  NumCommentsWrapper,
  NumRatingsWrapper,
  ProgressBarWrapper,
  ProgressNumberLabel,
  ProgressTextLabel,
  ProgressWrapper,
  RatingBarsColumn,
  RatingBoxWrapper,
  ReviewsAndGraphButtonWrapper,
} from './styles/RatingBox';

export const RATING_BOX_HEIGHT = 244;
export const RATING_BOX_WIDTH = 512;

/*
  Data for "liked" must be the first element in percentages
*/
type RatingBoxProps = {
  percentages: {
    displayName: string;
    percent: number;
  }[];
  numRatings: number;
  numComments: number;
};

const RatingBox = ({
  percentages,
  numRatings,
  numComments,
}: RatingBoxProps) => {
  const width = useSelector((state: RootState) => state.browser.width);
  const isBrowserDesktop = useSelector(getIsBrowserDesktop);

  const likedPercent = percentages[0].percent
    ? Math.round(percentages[0].percent * 100)
    : null;

  const scrollToReviews = () => {
    if (numComments) {
      document
        .getElementById(REVIEWS_DIV_ID)!
        .scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <RatingBoxWrapper
      ratingBoxHeight={RATING_BOX_HEIGHT}
      ratingBoxWidth={RATING_BOX_WIDTH}
    >
      <CircularPercentageWrapper>
        <CircularPercentage
          height={
            isBrowserDesktop
              ? RATING_BOX_HEIGHT - 32
              : Math.min(width / 2 - 32, 200)
          }
          percent={likedPercent}
          barThickness={16}
          label="liked"
        />
      </CircularPercentageWrapper>
      <RatingBarsColumn>
        {percentages.map((metric, ind) =>
          ind === 0 ? null : (
            <ProgressWrapper key={metric.displayName}>
              <ProgressTextLabel>{metric.displayName}</ProgressTextLabel>
              <ProgressBarWrapper>
                <ProgressBar percentComplete={metric.percent} />
                <ProgressNumberLabel>
                  {processRating(metric.percent)}
                </ProgressNumberLabel>
              </ProgressBarWrapper>
            </ProgressWrapper>
          ),
        )}
        <ReviewsAndGraphButtonWrapper>
          <NumCommentsAndRatingsWrapper>
            <NumCommentsWrapper
              onClick={scrollToReviews}
              hasComments={Boolean(numComments)}
            >
              {numComments || 0} {numComments === 1 ? 'comment' : 'comments'}
            </NumCommentsWrapper>
            <NumRatingsWrapper>
              {numRatings || 0} {numRatings === 1 ? 'rating' : 'ratings'}
            </NumRatingsWrapper>
          </NumCommentsAndRatingsWrapper>
        </ReviewsAndGraphButtonWrapper>
      </RatingBarsColumn>
    </RatingBoxWrapper>
  );
};

export default RatingBox;
