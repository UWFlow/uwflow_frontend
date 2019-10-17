import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

/* Selectors */
import { getWidth } from '../../../data/reducers/BrowserReducer';

/* Child Components */
import CircularPercentage from '../../../basicComponents/statistics/CircularPercentage';
import ProgressBar from '../../../basicComponents/ProgressBar';

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

const mapStateToProps = state => ({
  width: getWidth(state),
});

const RatingBox = ({ percentages, numRatings, numComments, width }) => {
  const likedPercent = Math.round(percentages[0].percent * 100);
  return (
    <RatingBoxWrapper>
      <CircularPercentageWrapper>
        <CircularPercentage
          height={width / 2 - 32}
          percent={likedPercent}
          barThickness={16}
          label="liked it"
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
                  {Math.round(metric.percent * 100)}%
                </ProgressNumberLabel>
              </ProgressBarWrapper>
            </ProgressWrapper>
          ),
        )}
        <ReviewsAndGraphButtonWrapper>
          <NumCommentsAndRatingsWrapper>
            <NumCommentsWrapper>
              {numComments} {numComments === 1 ? 'review' : 'reviews'}
            </NumCommentsWrapper>
            <NumRatingsWrapper>
              {numRatings}
              {numRatings === 1 ? ' rating' : ' ratings'}
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
};

export default connect(mapStateToProps)(RatingBox);
