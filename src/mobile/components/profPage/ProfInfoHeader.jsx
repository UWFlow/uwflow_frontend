import React from 'react';
import PropTypes from 'prop-types';

/* Child Components */
import RatingBox from '../common/RatingBox';

/* Styled Components */
import {
  ProfInfoHeaderWrapper,
  ProfNameSection,
  ProfNameWrapper,
  ProfName,
} from './styles/ProfInfoHeader';

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
    </ProfInfoHeaderWrapper>
  );
};

ProfInfoHeader.propTypes = {
  prof: PropTypes.object,
};

export default ProfInfoHeader;