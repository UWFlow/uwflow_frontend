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
import RatingBox, { RATING_BOX_HEIGHT } from '../common/RatingBox';

const CourseInfoHeader = ({ course, liked, useful, easy }) => {
  return (
    <CourseInfoHeaderWrapper>
      <CourseCodeAndNameSection>
        <CourseCodeAndNameWrapper>
          <CourseCode>{course.code}</CourseCode>
          <CourseName>{course.name}</CourseName>
        </CourseCodeAndNameWrapper>
      </CourseCodeAndNameSection>
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
      <CourseDescriptionSection>
        <Description>{course.description}</Description>
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
