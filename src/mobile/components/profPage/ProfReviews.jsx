import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-apollo';
import PropTypes from 'prop-types';
import { withTheme } from 'styled-components';

/* Custom Reducers */
import useProfReviewsReducer, {
  UPDATE_REVIEW_DATA,
} from '../../../data/custom_hooks/UseProfReviewsReducer';

/* GraphQL Queries */
import { GET_PROF_REVIEW } from '../../../graphql/queries/prof/ProfReview.jsx';

/* Styled Components */
import {
  ProfCourseReviewWrapper,
  DropdownPanelWrapper,
  DropdownTableText,
  ReviewsForSingleCourseWrapper,
  CourseCode,
  CourseLikedMetric,
  CourseLikedPercent,
  CourseLikedPercentLabel,
} from './styles/ProfReviews';

/* Child Components */
import DropdownList from '../../../sharedComponents/input/DropdownList.jsx';
import Review from '../common/Review.jsx';
import LoadingSpinner from '../../../sharedComponents/display/LoadingSpinner.jsx';

import { splitCourseCode } from '../../../utils/Misc';
import { getCoursePageRoute } from '../../../Routes.jsx';

const ProfReviews = ({ profID, theme }) => {
  const [selectedFilter, setSelectedFilter] = useState(0);
  const { loading, data } = useQuery(GET_PROF_REVIEW, {
    variables: { id: profID },
  });
  const [reviewDataState, dispatch] = useProfReviewsReducer(data);

  useEffect(() => {
    if (data) {
      dispatch({
        type: UPDATE_REVIEW_DATA,
        payload: data,
      });
    }
  }, [data]);

  if (loading) {
    return (
      <ProfCourseReviewWrapper>
        <LoadingSpinner />
      </ProfCourseReviewWrapper>
    );
  }

  const courseFilterOptions = ['show all courses', ...reviewDataState.courses];

  const reviewsByCourseToShow = reviewDataState.reviewsByCourse.filter(
    reviews =>
      selectedFilter === 0 ||
      reviews.code === courseFilterOptions[selectedFilter],
  );

  return (
    <>
      <DropdownPanelWrapper>
        <DropdownTableText>Filter by course: </DropdownTableText>
        <DropdownList
          color={theme.primary}
          selectedIndex={selectedFilter}
          options={courseFilterOptions}
          onChange={value => setSelectedFilter(value)}
        />
      </DropdownPanelWrapper>
      <ProfCourseReviewWrapper>
        {reviewsByCourseToShow.map((course, idx) => {
          return (
            <ReviewsForSingleCourseWrapper key={idx}>
              <CourseCode to={getCoursePageRoute(course.code)}>
                {splitCourseCode(course.code)}
              </CourseCode>
              <CourseLikedMetric>
                <CourseLikedPercent>
                  {Math.round(course.liked * 100)}%
                </CourseLikedPercent>
                <CourseLikedPercentLabel>
                  liked this course
                </CourseLikedPercentLabel>
              </CourseLikedMetric>
              {course.reviews.map(review => {
                return (
                  <Review
                    key={review.reviewer.full_name}
                    upvotes={review.upvotes}
                    review={review.review}
                    reviewer={review.reviewer}
                    metrics={review.metrics}
                  />
                );
              })}
            </ReviewsForSingleCourseWrapper>
          );
        })}
      </ProfCourseReviewWrapper>
    </>
  );
};

ProfReviews.propTypes = {
  profID: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  theme: PropTypes.object.isRequired,
};

export default withTheme(ProfReviews);
