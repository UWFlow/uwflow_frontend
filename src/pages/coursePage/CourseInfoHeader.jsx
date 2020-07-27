import React from 'react';
import PropTypes from 'prop-types';

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

const CourseInfoHeader = ({ course, shortlisted }) => {
  const { liked, easy, useful, filled_count, comment_count } = course.rating;

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
              courseID={course.id}
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

CourseInfoHeader.propTypes = {
  course: PropTypes.object.isRequired,
};

export default CourseInfoHeader;
