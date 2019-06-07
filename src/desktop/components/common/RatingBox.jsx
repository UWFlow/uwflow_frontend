import React from 'react';

/* Styled Components */
import {
  RatingBoxWrapper,
  LikesColumn,
  LargePercentage,
  GreyText,
  ProgressBarColumn,
  ProgressWrapper,
  ProgressTextLabel,
  ProgressBarWrapper,
  ProgressNumberLabel,
} from './styles/RatingBox';

/* Child Components */
import ProgressBar from './ProgressBar';

/*
  percentages: Array< NOTE number of likes must always be first
    {
      displayName: string
      for: int
      against: int
    }
  >
*/
const RatingBox = ({ percentages }) => {
  const numLikedRatings = percentages[0].for + percentages[0].against;
  const likedPercent = Math.round((percentages[0].for * 100) / numLikedRatings);
  return (
    <RatingBoxWrapper>
      <LikesColumn>
        <LargePercentage>{likedPercent}%</LargePercentage>
        <GreyText>
          {numLikedRatings} rating {numLikedRatings !== 1 ? 's' : ''}
        </GreyText>
      </LikesColumn>
      <ProgressBarColumn>
        {percentages.map((metric, ind) =>
          ind === 0 ? null : (
            <ProgressWrapper key={metric.displayName}>
              <ProgressTextLabel>{metric.displayName}</ProgressTextLabel>
              <ProgressBarWrapper>
                <ProgressBar
                  percentComplete={metric.for / (metric.for + metric.against)}
                />
                <ProgressNumberLabel>
                  {Math.round(
                    (metric.for * 100) / (metric.for + metric.against),
                  )}
                  %
                </ProgressNumberLabel>
              </ProgressBarWrapper>
            </ProgressWrapper>
          ),
        )}
      </ProgressBarColumn>
    </RatingBoxWrapper>
  );
};

export default RatingBox;
