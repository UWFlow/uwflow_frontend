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

const computeStats = course => {
  const totals = {
    liked: course.course_liked_buckets.reduce(
      (total, curr) => curr.count + total,
      0,
    ),
    easy: course.course_easy_buckets.reduce(
      (total, curr) => curr.count + total,
      0,
    ),
    useful: course.course_useful_buckets.reduce(
      (total, curr) => curr.count + total,
      0,
    ),
  };
  return [
    totals,
    {
      liked:
        totals.liked == 0
          ? 0
          : course.course_liked_buckets.reduce(
              (total, curr, index) =>
                total +
                (curr.count * index) /
                  (course.course_liked_buckets.length - 1) /
                  totals.liked,
              0,
            ),
      easy:
        totals.easy == 0
          ? 0
          : course.course_easy_buckets.reduce(
              (total, curr, index) =>
                total +
                (curr.count * index) /
                  (course.course_easy_buckets.length - 1) /
                  totals.easy,
              0,
            ),
      useful:
        totals.useful == 0
          ? 0
          : course.course_useful_buckets.reduce(
              (total, curr, index) =>
                total +
                (curr.count * index) /
                  (course.course_useful_buckets.length - 1) /
                  totals.useful,
              0,
            ),
    },
  ];
};

const CourseInfoHeader = ({ course }) => {
  const [totals, ratingStats] = computeStats(course);

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
          numRatings={totals.liked}
          numReviews={course.course_reviews_aggregate.aggregate.count}
          percentages={[
            {
              displayName: 'Likes',
              percent: ratingStats.liked,
            },
            {
              displayName: 'Useful',
              percent: ratingStats.useful,
            },
            {
              displayName: 'Easy',
              percent: ratingStats.easy,
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
  course: PropTypes.object,
};

export default CourseInfoHeader;
