import React from 'react';
import PropTypes from 'prop-types';

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

const RatingBox = ({ percentages }) => {
  const numLikedRatings = percentages[0].for + percentages[0].against;
  const likedPercent = numLikedRatings === 0 ? 0 : Math.round((percentages[0].for * 100) / numLikedRatings);
  return (
    <RatingBoxWrapper>
      <LikesColumn>
        <LargePercentage>{likedPercent}%</LargePercentage>
        <GreyText>
          {numLikedRatings} rating{numLikedRatings !== 1 ? 's' : ''}
        </GreyText>
      </LikesColumn>
      <ProgressBarColumn>
        {percentages.map((metric, ind) =>
          ind === 0 ? null : (
            <ProgressWrapper key={metric.displayName}>
              <ProgressTextLabel>{metric.displayName}</ProgressTextLabel>
              <ProgressBarWrapper>
                <ProgressBar
                  percentComplete={metric.for + metric.against === 0 ? 0 :
                    metric.for / (metric.for + metric.against)}
                />
                <ProgressNumberLabel>
                  {metric.for + metric.against === 0 ? 0 :
                    Math.round((metric.for * 100) / (metric.for + metric.against))}
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

RatingBox.propTypes = {
  percentages: PropTypes.arrayOf(PropTypes.shape({
    displayName: PropTypes.string,
    for: PropTypes.number,
    against: PropTypes.number
  }))
}

export default RatingBox;
