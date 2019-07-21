import React from 'react';
import PropTypes from 'prop-types';

/* Styled Components */
import {
  ProfInfoHeaderWrapper,
  ProfNameSection,
  ProfNameWrapper,
  ProfDescriptionSection,
  ProfName,
  Description,
  RatingsSection,
} from './styles/ProfInfoHeader';

/* Child Components */
import RatingBox, { RATING_BOX_HEIGHT } from '../common/RatingBox';

const ProfInfoHeader = ({ prof }) => {
  const percentClear = prof.reviewsAggregate.aggregate.avg.clear / 5;
  const percentEngaging = prof.reviewsAggregate.aggregate.avg.engaging / 5;

  return (
    <ProfInfoHeaderWrapper>
      <ProfNameSection>
        <ProfNameWrapper>
          <ProfName>{prof.name}</ProfName>
        </ProfNameWrapper>
      </ProfNameSection>
      <ProfDescriptionSection>
        <RatingsSection ratingBoxHeight={RATING_BOX_HEIGHT}>
          <RatingBox
            numRatings={prof.course_reviews_aggregate.aggregate.count}
            numReviews={prof.prof_reviews_aggregate.aggregate.count}
            percentages={[
              {
                displayName: 'Likes',
                percent: prof.course_reviews_aggregate.aggregate.avg.liked / 5,
              },
              {
                displayName: 'Clear',
                percent: percentClear,
              },
              {
                displayName: 'Engaging',
                percent: percentEngaging,
              },
            ]}
          />
        </RatingsSection>
        <Description>Teaches ECE 105, ECE 106</Description>
      </ProfDescriptionSection>
    </ProfInfoHeaderWrapper>
  );
};

ProfInfoHeader.propTypes = {
  prof: PropTypes.object,
};

export default ProfInfoHeader;
