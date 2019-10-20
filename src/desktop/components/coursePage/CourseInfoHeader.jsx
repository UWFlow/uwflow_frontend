import React, { useState } from 'react';
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
  CourseCodeAndStar,
  StarAlignmentWrapper,
} from './styles/CourseInfoHeader';

/* Child Components */
import RatingBox, { RATING_BOX_WIDTH } from '../common/RatingBox';
import ShortlistStar from '../../../sharedComponents/input/ShortlistStar';

import { splitCourseCode } from '../../../utils/Misc';
import { isLoggedIn } from '../../../utils/Auth';

const CourseInfoHeader = ({ course, shortlisted, setAuthModalOpen }) => {
  const { liked, easy, useful } = course.course_reviews_aggregate.aggregate.avg;
  const { count, text_count } = course.course_reviews_aggregate.aggregate;
  const [isStarClicked, setIsStarClicked] = useState(shortlisted);

  const onStarClick = () => {
    isLoggedIn() ? setIsStarClicked(!isStarClicked) : setAuthModalOpen(true);
  };

  return (
    <CourseInfoHeaderWrapper>
      <CourseCodeAndNameSection>
        <CourseCodeAndNameWrapper>
          <CourseCodeAndStar>
            <CourseCode ratingBoxWidth={RATING_BOX_WIDTH}>
              {splitCourseCode(course.code)}
            </CourseCode>
            <StarAlignmentWrapper>
              <ShortlistStar
                size={36}
                checked={isStarClicked}
                onClick={onStarClick}
              />
            </StarAlignmentWrapper>
          </CourseCodeAndStar>
          <CourseName ratingBoxWidth={RATING_BOX_WIDTH}>
            {course.name}
          </CourseName>
        </CourseCodeAndNameWrapper>
      </CourseCodeAndNameSection>
      <CourseDescriptionSection>
        <RatingsSection>
          <RatingBox
            numRatings={count}
            numComments={text_count}
            percentages={[
              {
                displayName: 'Likes',
                percent: liked,
              },
              {
                displayName: 'Useful',
                percent: useful / 5,
              },
              {
                displayName: 'Easy',
                percent: easy / 5,
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
