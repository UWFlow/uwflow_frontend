import React from 'react';
import {
  ProfCoursesTaughtFragment,
  ProfInfoFragment,
  ProfRatingFragment,
} from 'generated/graphql';
import { getCoursePageRoute } from 'Routes';

import RatingBox, {
  RATING_BOX_HEIGHT,
  RATING_BOX_WIDTH,
} from 'components/display/RatingBox';
import { formatCourseCode } from 'utils/Misc';

import {
  CourseLink,
  Description,
  ProfDescriptionSection,
  ProfInfoHeaderWrapper,
  ProfName,
  ProfNameSection,
  ProfNameWrapper,
  RatingsSection,
} from './styles/ProfInfoHeader';

type ProfInfoHeaderProps = {
  prof: ProfInfoFragment & ProfCoursesTaughtFragment & ProfRatingFragment;
};

const ProfInfoHeader = ({ prof }: ProfInfoHeaderProps) => {
  const { liked, clear, engaging, filled_count, comment_count } = prof.rating!;

  const profCourses = prof.prof_courses.map(
    (courseObj) => courseObj.course!.code,
  );
  const profCourseLinks = profCourses.map((courseCode, i) => (
    <span key={courseCode}>
      <CourseLink to={getCoursePageRoute(courseCode)}>
        {formatCourseCode(courseCode)}
      </CourseLink>
      {i < profCourses.length - 1 && ','}
    </span>
  ));

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
            ? 'Currently teaches'
            : 'Not currently teaching anything'}
          {profCourseLinks}
        </Description>
      </ProfDescriptionSection>
    </ProfInfoHeaderWrapper>
  );
};

export default ProfInfoHeader;
