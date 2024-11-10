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

  const [distribution, setDistribution] = useState<Distribution | null>(null);
  const [showDistribution, setShowDistribution] = useState(false);

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
              hasDistribution: false,
            },
            {
              displayName: 'Easy',
              percent: easy,
              hasDistribution: distributions.easy.hasDistribution,
              onDistributionClick: () => {
                if (!showDistribution) {
                  setDistribution(distributions.easy);
                  setShowDistribution(true);
                } else if (distribution?.displayName !== 'Easy') {
                  setDistribution(distributions.easy);
                } else {
                  setShowDistribution(false);
                }
              },
            },
            {
              displayName: 'Useful',
              percent: useful,
              hasDistribution: distributions.useful.hasDistribution,
              onDistributionClick: () => {
                if (!showDistribution) {
                  setDistribution(distributions.useful);
                  setShowDistribution(true);
                } else if (distribution?.displayName !== 'Useful') {
                  setDistribution(distributions.useful);
                } else {
                  setShowDistribution(false);
                }
              },
            },
          ]}
          distribution={distribution}
          showDistribution={showDistribution}
        />
        <Description>{course.description}</Description>
      </CourseDescriptionSection>
    </CourseInfoHeaderWrapper>
  );
};

export default CourseInfoHeader;
