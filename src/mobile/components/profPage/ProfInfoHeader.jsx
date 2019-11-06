import React from 'react';
import PropTypes from 'prop-types';

/* Child Components */
import RatingBox from '../../../components/display/RatingBox';

/* Styled Components */
import {
  ProfInfoHeaderWrapper,
  ProfNameSection,
  ProfName,
  ProfCoursesText,
} from './styles/ProfInfoHeader';

import { splitCourseCode } from '../../../utils/Misc';

const ProfInfoHeader = ({ prof }) => {
  const percentClear = prof.prof_reviews_aggregate.aggregate.avg.clear / 5;
  const percentEngaging =
    prof.prof_reviews_aggregate.aggregate.avg.engaging / 5;
  const profCourses = prof.prof_courses.map(course =>
    splitCourseCode(course.code),
  );

  return (
    <ProfInfoHeaderWrapper>
      <ProfNameSection>
        <ProfName>{prof.name}</ProfName>
      </ProfNameSection>
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
      <ProfCoursesText>
        {profCourses.length > 0
          ? `Currently teaches ${profCourses.join(', ')}`
          : 'Not currently teaching anything'}
      </ProfCoursesText>
    </ProfInfoHeaderWrapper>
  );
};

ProfInfoHeader.propTypes = {
  prof: PropTypes.object,
};

export default ProfInfoHeader;
