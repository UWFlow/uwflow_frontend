import React from 'react';
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
  RatingsSection,
  StarAlignmentWrapper,
} from './styles/CourseInfoHeader';

type CourseInfoHeaderProps = {
  course: CourseInfoFragment &
    CourseRatingFragment &
    CourseReviewDistributionFragment;
  shortlisted: boolean;
};

const CourseInfoHeader = ({ course, shortlisted }: CourseInfoHeaderProps) => {
  const { liked, easy, useful, filled_count, comment_count } = course.rating!;
  const { course_useful_buckets, course_easy_buckets } = course;

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
        <RatingsSection>
          <RatingBox
            numRatings={filled_count}
            numComments={comment_count}
            usefulBuckets={course_useful_buckets.map(({ value, count }) => ({
              value: value!,
              count,
            }))}
            easyBuckets={course_easy_buckets.map(({ value, count }) => ({
              value: value!,
              count,
            }))}
            percentages={[
              {
                displayName: 'Likes',
                percent: liked,
              },
              {
                displayName: 'Easy',
                percent: easy,
              },
              {
                displayName: 'Useful',
                percent: useful,
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

export default CourseInfoHeader;
