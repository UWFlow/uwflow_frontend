import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ProgressBar from 'components/display/ProgressBar';
import CircularPercentage from 'components/statistics/CircularPercentage';
import { REVIEWS_DIV_ID } from 'constants/PageConstants';
import { getIsBrowserDesktop } from 'data/reducers/RootReducer';
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

const mapStateToProps = (state) => ({
  width: state.browser.width,
  isBrowserDesktop: getIsBrowserDesktop(state),
});

/*
  NOTE DATA FOR "LIKED" MUST BE PERCENTAGES[0]
*/
const RatingBox = ({
  percentages,
  numRatings,
  numComments,
  width,
  isBrowserDesktop,
}) => {
  const likedPercent = percentages[0].percent
    ? Math.round(percentages[0].percent * 100)
    : null;

  const scrollToReviews = () => {
    if (numComments) {
      document
        .getElementById(REVIEWS_DIV_ID)
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
                <ProgressBar percentComplete={metric.percent} width="100%" />
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

RatingBox.propTypes = {
  percentages: PropTypes.arrayOf(
    PropTypes.shape({
      displayName: PropTypes.string,
      percent: PropTypes.number,
    }),
  ),
  numRatings: PropTypes.number,
  numComments: PropTypes.number,
  theme: PropTypes.object,
};

export default connect(mapStateToProps)(RatingBox);
