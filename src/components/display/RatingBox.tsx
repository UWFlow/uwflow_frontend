import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import ProgressBar from 'components/display/ProgressBar';
import CircularPercentage from 'components/statistics/CircularPercentage';
import { REVIEWS_DIV_ID } from 'constants/PageConstants';
import { getIsBrowserDesktop, RootState } from 'data/reducers/RootReducer';

import {
  CircularPercentageWrapper,
  FilterWrapper,
  MetricBox,
  MetricLabel,
  MetricsRow,
  MetricsRowWrapper,
  MetricValue,
  NumCommentsAndRatingsWrapper,
  NumCommentsWrapper,
  NumRatingsWrapper,
  ProgressBarWrapper,
  ProgressNumberLabel,
  ProgressWrapper,
  RatingBarsColumn,
  RatingBoxWrapper,
  RatingDistributionToggle,
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
  usefulBuckets?: { value: number; count: number }[];
  easyBuckets?: { value: number; count: number }[];
};

const RatingBox = ({
  percentages,
  numRatings,
  numComments,
  usefulBuckets = [],
  easyBuckets = [],
}: RatingBoxProps) => {
  const width = useSelector((state: RootState) => state.browser.width);
  const [filter, setFilter] = useState<'difficulty' | 'usefulness'>(
    'usefulness',
  );
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

  // Create a map of all buckets with default 0 values
  const getFullBuckets = (
    buckets: { value: number; count: number }[],
  ): Array<number> => {
    const bucketMap = new Array(5).fill(0);

    buckets.forEach((bucket) => {
      bucketMap[bucket.value] = bucket.count;
    });

    return bucketMap;
  };

  const currentBuckets: Array<number> =
    filter === 'usefulness'
      ? getFullBuckets(usefulBuckets)
      : getFullBuckets(easyBuckets);

  const totalCount = currentBuckets.reduce((acc, val) => acc + val, 0);

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
        <MetricsRowWrapper>
          <MetricsRow>
            {percentages.slice(1).map((metric) => (
              <MetricBox key={metric.displayName}>
                <MetricValue>{Math.round(metric.percent * 100)}%</MetricValue>
                <MetricLabel>
                  found {metric.displayName.toLowerCase()}
                </MetricLabel>
              </MetricBox>
            ))}
          </MetricsRow>
        </MetricsRowWrapper>
        <ProgressWrapper key={filter}>
          <FilterWrapper>
            Ratings for&nbsp;
            <RatingDistributionToggle
              onClick={() =>
                setFilter(filter === 'usefulness' ? 'difficulty' : 'usefulness')
              }
            >
              {filter === 'usefulness' ? 'Usefulness' : 'Easyness'}
            </RatingDistributionToggle>
          </FilterWrapper>
          {[...currentBuckets].reverse().map((val, index) => (
            <ProgressBarWrapper key={currentBuckets.length - 1 - index}>
              <ProgressNumberLabel>
                {currentBuckets.length - index}
              </ProgressNumberLabel>
              <ProgressBar
                percentComplete={totalCount > 0 ? val / totalCount : 0}
              />
            </ProgressBarWrapper>
          ))}
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
        </ProgressWrapper>
      </RatingBarsColumn>
    </RatingBoxWrapper>
  );
};

export default RatingBox;
