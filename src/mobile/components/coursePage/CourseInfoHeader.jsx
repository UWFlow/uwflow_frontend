import React, { useState } from 'react';
import PropTypes from 'prop-types';

/* Child Components */
import RatingBox from '../common/RatingBox';
import ShortlistStar from '../../../sharedComponents/input/ShortlistStar';

/* Styled Components */
import {
  CourseInfoHeaderWrapper,
  CourseNameSection,
  CourseCodeAndStar,
  StarAlignmentWrapper,
  CourseCode,
  CourseName,
} from './styles/CourseInfoHeader';

import { splitCourseCode } from '../../../utils/Misc';

const CourseInfoHeader = ({ course }) => {
  const { liked, easy, useful } = course.course_reviews_aggregate.aggregate.avg;
  const { count, text_count } = course.course_reviews_aggregate.aggregate;
  const [isStarClicked, setIsStarClicked] = useState(false);

  return (
    <CourseInfoHeaderWrapper>
      <CourseNameSection>
        <CourseCodeAndStar>
          <CourseCode>{splitCourseCode(course.code)}</CourseCode>
          <StarAlignmentWrapper>
            <ShortlistStar
              size={36}
              checked={isStarClicked}
              onClick={() => setIsStarClicked(!isStarClicked)}
            />
          </StarAlignmentWrapper>
        </CourseCodeAndStar>
        <CourseName>{course.name}</CourseName>
      </CourseNameSection>
      <RatingBox
        numRatings={count}
        numComments={text_count}
        percentages={[
          {
            displayName: 'Likes',
            percent: liked / 5,
          },
          {
            displayName: 'Easy',
            percent: easy / 5,
          },
          {
            displayName: 'Useful',
            percent: useful / 5,
          },
        ]}
      />
    </CourseInfoHeaderWrapper>
  );
};

CourseInfoHeader.propTypes = {
  prof: PropTypes.object,
};

export default CourseInfoHeader;
