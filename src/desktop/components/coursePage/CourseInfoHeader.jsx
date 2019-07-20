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

const CourseInfoHeader = ({ course }) => {
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
          numRatings={course.course_liked_buckets_aggregate.aggregate.sum.count}
          numReviews={course.course_reviews_aggregate.aggregate.count}
          percentages={[
            {
              displayName: 'Likes',
              percent:
                course.course_liked_buckets_aggregate.aggregate.avg.liked / 5,
            },
            {
              displayName: 'Useful',
              percent:
                course.course_useful_buckets_aggregate.aggregate.avg.useful / 5,
            },
            {
              displayName: 'Easy',
              percent:
                course.course_easy_buckets_aggregate.aggregate.avg.easy / 5,
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
};

export default CourseInfoHeader;
