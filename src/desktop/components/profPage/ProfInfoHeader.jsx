import React from 'react';
import PropTypes from 'prop-types';

/* Styled Components */
import {
  ProfInfoHeaderWrapper,
  ProfNameSection,
  ProfDescriptionSection,
  ProfName,
  Description,
  RatingsSection,
} from './styles/ProfInfoHeader';

/* Child Components */
import RatingBox, { RATING_BOX_HEIGHT } from '../common/RatingBox';

const ProfInfoHeader = ({ prof }) => {
  const percentClear =
    prof.prof_review_stats.clear /
    (prof.prof_review_stats.clear + prof.prof_review_stats.not_clear);
  const percentEngaging =
    prof.prof_review_stats.engaging /
    (prof.prof_review_stats.engaging + prof.prof_review_stats.not_engaging);

  return (
    <ProfInfoHeaderWrapper>
      <ProfNameSection>
        <ProfName>{prof.name}</ProfName>
      </ProfNameSection>
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
      <ProfDescriptionSection>
        <Description>Teaches some courses</Description>
      </ProfDescriptionSection>
    </ProfInfoHeaderWrapper>
  );
};

ProfInfoHeader.propTypes = {
  prof: PropTypes.object,
};

export default ProfInfoHeader;
