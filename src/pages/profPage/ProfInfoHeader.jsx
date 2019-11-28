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
  const { liked, clear, engaging, filled_count, comment_count } = prof.rating;
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
            numRatings={filled_count}
            numComments={comment_count}
            percentages={[
              {
                displayName: 'Likes',
                percent: liked,
              },
              {
                displayName: 'Clear',
                percent: clear,
              },
              {
                displayName: 'Engaging',
                percent: engaging,
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
