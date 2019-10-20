import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useQuery } from 'react-apollo';
import { withTheme } from 'styled-components';

/* Custom Reducers */
import useProfReviewsReducer, {
  UPDATE_REVIEW_DATA,
} from '../../../data/custom_hooks/UseProfReviewsReducer';

/* Styled Components */
import {
  ProfCourseReviewWrapper,
  ReviewsForSingleCourseWrapper,
  CourseHeader,
  CourseNameAndCode,
  CourseCode,
  CourseName,
  DropdownPanelWrapper,
  DropdownTableText,
  CourseLikedMetric,
  CourseLikedPercent,
  CourseLikedPercentLabel,
  ProfCourseFilterWrapper
} from './styles/ProfReviews';

/* Child Components */
import Review from '../common/Review';
import DropdownList from '../../../sharedComponents/input/DropdownList';
import LoadingSpinner from '../../../sharedComponents/display/LoadingSpinner';

/* GraphQL Queries */
import { GET_PROF_REVIEW } from '../../../graphql/queries/prof/ProfReview.jsx';

import { splitCourseCode } from '../../../utils/Misc';
import { getCoursePageRoute } from '../../../Routes';

const ProfReviews = ({ profID, theme }) => {
  const [selectedFilter, setSelectedFilter] = useState(0);
  const [selectedSort, setSelectedSort] = useState(0);
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
  const courseFilterDisplayOptions = [
    'show all courses',
    ...reviewDataState.courses.map(code => splitCourseCode(code)),
  ];

  const reviewsByCourseToShow = reviewDataState.reviewsByCourse.filter(
    reviews =>
      selectedFilter === 0 ||
      reviews.code === courseFilterOptions[selectedFilter],
  );

  return (
    <ProfCourseReviewWrapper>
      <ProfCourseFilterWrapper>
        <DropdownPanelWrapper>
          <DropdownTableText>Filter by course: </DropdownTableText>
          <DropdownList
            color={theme.courses}
            selectedIndex={selectedFilter}
            options={courseFilterDisplayOptions}
            onChange={value => setSelectedFilter(value)}
            zIndex={5}
          />
        </DropdownPanelWrapper>
      </ProfCourseFilterWrapper>
      {reviewsByCourseToShow.map((course, idx) => {
        return (
          <ReviewsForSingleCourseWrapper key={idx}>
            <CourseHeader key={course.id}>
              <CourseNameAndCode>
                <CourseCode to={getCoursePageRoute(course.code)}>
                  {splitCourseCode(course.code)}
                </CourseCode>
                <CourseName>{course.name}</CourseName>
              </CourseNameAndCode>
              <CourseLikedMetric>
                <CourseLikedPercent>
                  {Math.round(course.liked * 100)}%
                </CourseLikedPercent>
                <CourseLikedPercentLabel>
                  liked this course
                </CourseLikedPercentLabel>
              </CourseLikedMetric>
            </CourseHeader>
            <DropdownPanelWrapper>
              <DropdownTableText>Sort by: </DropdownTableText>
              <DropdownList
                color={theme.primary}
                selectedIndex={selectedSort}
                options={['most helpful', 'most recent']}
                onChange={value => setSelectedSort(value)}
              />
            </DropdownPanelWrapper>
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
  );
};

ProfReviews.propTypes = {
  profID: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  theme: PropTypes.object.isRequired,
};

export default withTheme(ProfReviews);
