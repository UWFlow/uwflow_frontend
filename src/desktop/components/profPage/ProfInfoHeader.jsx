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
import RatingBox, {
  RATING_BOX_HEIGHT,
  RATING_BOX_WIDTH,
} from '../common/RatingBox';

import { splitCourseCode } from '../../../utils/Misc';

const ProfInfoHeader = ({ prof }) => {
  const percentClear = prof.prof_reviews_aggregate.aggregate.avg.clear / 5;
  const percentEngaging = prof.prof_reviews_aggregate.aggregate.avg.engaging / 5;
  const profCourses = prof.prof_courses.map(course => splitCourseCode(course.code));

  return (
    <ProfInfoHeaderWrapper>
      <ProfNameSection>
        <ProfNameWrapper>
          <ProfName ratingBoxWidth={RATING_BOX_WIDTH}>{prof.name}</ProfName>
        </ProfNameWrapper>
      </ProfNameSection>
      <ProfDescriptionSection>
        <RatingsSection ratingBoxHeight={RATING_BOX_HEIGHT}>
          <RatingBox
            numRatings={prof.prof_reviews_aggregate.aggregate.count}
            numComments={prof.prof_reviews_aggregate.aggregate.text_count}
            percentages={[
              {
                displayName: 'Likes',
                percent: prof.course_reviews_aggregate.aggregate.avg.liked,
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
        <Description ratingBoxWidth={RATING_BOX_WIDTH}>
          {profCourses.length > 0 ? `Teaches ${profCourses.join(', ')}` : 'No courses taught'}
        </Description>
      </ProfDescriptionSection>
    </ProfInfoHeaderWrapper>
  );
};

ProfInfoHeader.propTypes = {
  prof: PropTypes.object,
};

export default ProfInfoHeader;
