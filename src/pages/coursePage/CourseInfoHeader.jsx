import React from 'react';
import PropTypes from 'prop-types';

/* Styled Components */
import {
  CourseInfoHeaderWrapper,
  CourseCodeAndNameSection,
  CourseDescriptionSection,
  CourseCode,
  CourseNameWrapper,
  CourseName,
  Description,
  RatingsSection,
  CourseCodeAndStar,
  StarAlignmentWrapper,
} from './styles/CourseInfoHeader';

/* Child Components */
import RatingBox, {
  RATING_BOX_WIDTH,
} from '../../components/display/RatingBox';
import ShortlistStar from '../../components/input/ShortlistStar';

import { splitCourseCode } from '../../utils/Misc';

const CourseInfoHeader = ({ course, shortlisted }) => {
  const { liked, course_easy, course_useful } = course.reviews_aggregate.aggregate.avg;
  const { count, course_comment_count } = course.reviews_aggregate.aggregate;

  return (
    <CourseInfoHeaderWrapper>
      <CourseCodeAndNameSection>
        <CourseCodeAndStar>
          <CourseCode ratingBoxWidth={RATING_BOX_WIDTH}>
            {splitCourseCode(course.code)}
          </CourseCode>
          <StarAlignmentWrapper>
            <ShortlistStar
              size={36}
              initialState={shortlisted}
              courseID={course.id}
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
            numRatings={count}
            numComments={course_comment_count}
            percentages={[
              {
                displayName: 'Likes',
                percent: liked,
              },
              {
                displayName: 'Useful',
                percent: course_useful / 5,
              },
              {
                displayName: 'Easy',
                percent: course_easy / 5,
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
