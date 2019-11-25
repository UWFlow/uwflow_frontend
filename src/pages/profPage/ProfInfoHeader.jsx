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
} from '../../components/display/RatingBox';

import { splitCourseCode } from '../../utils/Misc';

const ProfInfoHeader = ({ prof }) => {
  const { liked, prof_clear, prof_engaging } = prof.reviews_aggregate.aggregate.avg;
  const { count, prof_comment_count } = prof.reviews_aggregate.aggregate;
  const profCourses = prof.prof_courses.map(course => splitCourseCode(course.course.code));

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
            numRatings={count}
            numComments={prof_comment_count}
            percentages={[
              {
                displayName: 'Likes',
                percent: liked,
              },
              {
                displayName: 'Clear',
                percent: prof_clear / 5,
              },
              {
                displayName: 'Engaging',
                percent: prof_engaging / 5,
              },
            ]}
          />
        </RatingsSection>
        <Description ratingBoxWidth={RATING_BOX_WIDTH}>
          {profCourses.length > 0
            ? `Currently teaches ${profCourses.join(', ')}`
            : 'Not currently teaching anything'}
        </Description>
      </ProfDescriptionSection>
    </ProfInfoHeaderWrapper>
  );
};

ProfInfoHeader.propTypes = {
  prof: PropTypes.object,
};

export default ProfInfoHeader;
