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

const CourseInfoHeader = ({ course, liked, useful, easy }) => {
  return (
    <CourseInfoHeaderWrapper>
      <CourseCodeAndNameSection>
        <CourseCodeAndNameWrapper>
          <CourseCode ratingBoxWidth={RATING_BOX_WIDTH}>{course.code}</CourseCode>
          <CourseName ratingBoxWidth={RATING_BOX_WIDTH}>{course.name}</CourseName>
        </CourseCodeAndNameWrapper>
      </CourseCodeAndNameSection>
      <CourseDescriptionSection>
        <RatingsSection ratingBoxHeight={RATING_BOX_HEIGHT}>
          <RatingBox
            numRatings={liked.aggregate.sum.count}
            numReviews={course.course_reviews_aggregate.aggregate.count}
            percentages={[
              {
                displayName: 'Likes',
                percent:
                  liked.aggregate.avg.liked / 5,
              },
              {
                displayName: 'Useful',
                percent:
                  useful.aggregate.avg.useful / 5,
              },
              {
                displayName: 'Easy',
                percent:
                  easy.aggregate.avg.easy / 5,
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
  course: PropTypes.object.isRequired,
  liked: PropTypes.object.isRequired,
  useful: PropTypes.object.isRequired,
  easy: PropTypes.object.isRequired
};

export default CourseInfoHeader;
