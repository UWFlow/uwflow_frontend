import React, { useState } from 'react';
import {
  CourseInfoFragment,
  CourseRatingFragment,
  CourseReviewDistributionFragment,
} from 'generated/graphql';

import RatingBox, { RATING_BOX_WIDTH } from 'components/display/RatingBox';
import ShortlistStar from 'components/input/ShortlistStar';
import { formatCourseCode } from 'utils/Misc';

import {
  CourseCode,
  CourseCodeAndNameSection,
  CourseCodeAndStar,
  CourseDescriptionSection,
  CourseInfoHeaderWrapper,
  CourseName,
  CourseNameWrapper,
  Description,
  StarAlignmentWrapper,
} from './styles/CourseInfoHeader';

type CourseInfoHeaderProps = {
  course: CourseInfoFragment &
    CourseRatingFragment &
    CourseReviewDistributionFragment;
  distributions: {
    useful: Distribution;
    easy: Distribution;
  };
  shortlisted: boolean;
};

type Distribution = {
  hasDistribution: boolean;
  displayName: string;
  buckets: Buckets;
  total: number;
};

type Buckets = Array<{
  value: number;
  count: number;
}>;

const CourseInfoHeader = ({
  course,
  shortlisted,
  distributions,
}: CourseInfoHeaderProps) => {
  const { liked, easy, useful, filled_count, comment_count } = course.rating!;

  return (
    <CourseInfoHeaderWrapper>
      <CourseCodeAndNameSection>
        <CourseCodeAndStar>
          <CourseCode ratingBoxWidth={RATING_BOX_WIDTH}>
            {formatCourseCode(course.code)}
          </CourseCode>
          <StarAlignmentWrapper>
            <ShortlistStar
              size={36}
              initialState={shortlisted}
              courseId={course.id}
              courseCode={course.code}
            />
          </StarAlignmentWrapper>
        </CourseCodeAndStar>
        <CourseNameWrapper>
          <CourseName ratingBoxWidth={RATING_BOX_WIDTH}>
            {course.name}
          </CourseName>
        </CourseNameWrapper>
      </CourseCodeAndNameSection>
      <CourseDescriptionSection>
        <RatingBox
          numRatings={filled_count}
          numComments={comment_count}
          percentages={[
            {
              displayName: 'Likes',
              percent: liked,
            },
            {
              displayName: 'Easy',
              percent: easy,
              distribution: distributions.easy,
            },
            {
              displayName: 'Useful',
              percent: useful,
              distribution: distributions.useful,
            },
          ]}
        />
        <Description>{course.description}</Description>
      </CourseDescriptionSection>
    </CourseInfoHeaderWrapper>
  );
};

export default CourseInfoHeader;
