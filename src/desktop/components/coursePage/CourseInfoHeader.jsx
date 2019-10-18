import React from 'react';
import PropTypes from 'prop-types';

/* Styled Components */
import {
  CourseInfoHeaderWrapper,
  CourseCodeAndNameSection,
  CourseDescriptionSection,
  CourseCodeAndNameWrapper,
  CourseCode,
  CourseName,
  Description,
  RatingsSection,
} from './styles/CourseInfoHeader';

/* Child Components */
import RatingBox, { RATING_BOX_HEIGHT, RATING_BOX_WIDTH } from '../common/RatingBox';
import { splitCourseCode } from '../../../utils/Misc';

const CourseInfoHeader = ({ course }) => {
  const { liked, easy, useful } = course.course_reviews_aggregate.aggregate.avg;
  const { count, text_count } = course.course_reviews_aggregate.aggregate;

  return (
    <CourseInfoHeaderWrapper>
      <CourseCodeAndNameSection>
        <CourseCodeAndNameWrapper>
          <CourseCode ratingBoxWidth={RATING_BOX_WIDTH}>
            {splitCourseCode(course.code)}
          </CourseCode>
          <CourseName ratingBoxWidth={RATING_BOX_WIDTH}>{course.name}</CourseName>
        </CourseCodeAndNameWrapper>
      </CourseCodeAndNameSection>
      <CourseDescriptionSection>
        <RatingsSection ratingBoxHeight={RATING_BOX_HEIGHT}>
          <RatingBox
            numRatings={count}
            numComments={text_count}
            percentages={[
              {
                displayName: 'Likes',
                percent: liked / 5,
              },
              {
                displayName: 'Useful',
                percent: useful / 5,
              },
              {
                displayName: 'Easy',
                percent: easy / 5,
              },
            ]}
          />
        </RatingsSection>
        <Description ratingBoxWidth={RATING_BOX_WIDTH}>
          {course.description}
        </Description>
      </CourseDescriptionSection>
    </CourseInfoHeaderWrapper>
  );
};

CourseInfoHeader.propTypes = {
  course: PropTypes.object.isRequired
};

export default CourseInfoHeader;
