import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

/* Selectors */
import {
  getWidth,
  getIsBrowserDesktop,
} from '../../data/reducers/BrowserReducer';

/* Styled Components */
import {
  RatingBoxWrapper,
  CircularPercentageWrapper,
  RatingBarsColumn,
  ProgressWrapper,
  ProgressTextLabel,
  ProgressBarWrapper,
  ProgressNumberLabel,
  ReviewsAndGraphButtonWrapper,
  NumCommentsAndRatingsWrapper,
  NumCommentsWrapper,
  NumRatingsWrapper,
} from './styles/RatingBox';

/* Child Components */
import ProgressBar from './ProgressBar';
import CircularPercentage from '../statistics/CircularPercentage';
import { processRating } from '../../utils/Misc';

export const RATING_BOX_HEIGHT = 244;
export const RATING_BOX_WIDTH = 512;

const mapStateToProps = state => ({
  width: getWidth(state),
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
  const likedPercent = percentages[0].percent ?
    Math.round(percentages[0].percent * 100) : null;

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
                  {metric.percent ? Math.round(metric.percent * 100) : '-'}%
                </ProgressNumberLabel>
              </ProgressBarWrapper>
            </ProgressWrapper>
          ),
        )}
        <ReviewsAndGraphButtonWrapper>
          <NumCommentsAndRatingsWrapper>
            <NumCommentsWrapper>
              {numComments ? numComments : 0} {numComments === 1 ? 'comment' : 'comments'}
            </NumCommentsWrapper>
            <NumRatingsWrapper>
              {numRatings ? numRatings : 0} {numRatings === 1 ? 'rating' : 'ratings'}
            </NumRatingsWrapper>
          </NumCommentsAndRatingsWrapper>
          {/* Graph button goes here */}
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
