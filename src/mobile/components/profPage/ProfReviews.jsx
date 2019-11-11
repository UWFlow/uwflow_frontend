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
  NoReviewsBox,
  DropdownPanelWrapper,
  DropdownTableText,
  ReviewsForSingleCourseWrapper,
  CourseCode,
  CourseLikedMetric,
  CourseLikedPercent,
  CourseLikedPercentLabel,
  ShowMoreReviewsSection,
  ShowMoreReviewsText,
} from './styles/ProfReviews';

/* Child Components */
import DropdownList from '../../../components/input/DropdownList.jsx';
import Review from '../../../components/display/Review.jsx';
import LoadingSpinner from '../../../components/display/LoadingSpinner.jsx';

import { splitCourseCode } from '../../../utils/Misc';
import { getCoursePageRoute } from '../../../Routes.jsx';
import { MIN_REVIEWS_SHOWN } from '../../../constants/PageConstants';

const ProfReviews = ({ profID, theme }) => {
  const [selectedFilter, setSelectedFilter] = useState(0);
  const { loading, data } = useQuery(GET_PROF_REVIEW, {
    variables: { id: profID },
  });
  const [reviewDataState, dispatch] = useProfReviewsReducer(data);
  const [showingReviewsMap, setShowingReviewsMap] = useState({});

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

  if (reviewDataState.courses.length == 0) {
    return <NoReviewsBox>No Reviews</NoReviewsBox>;
  }

  return (
    <>
      <DropdownPanelWrapper>
        <DropdownTableText>Filter by course: </DropdownTableText>
        <DropdownList
          color={theme.courses}
          selectedIndex={selectedFilter}
          options={courseFilterDisplayOptions}
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
              {course.reviews.map((review, i) => {
                if (i < MIN_REVIEWS_SHOWN || showingReviewsMap[course.code]) {
                  return <Review key={i} review={review} />;
                }
              })}
              {course.reviews.length > MIN_REVIEWS_SHOWN && (
                <ShowMoreReviewsSection
                  onClick={() =>
                    setShowingReviewsMap({
                      ...showingReviewsMap,
                      [course.code]: !showingReviewsMap[course.code],
                    })
                  }
                >
                  <ShowMoreReviewsText>
                    {showingReviewsMap[course.code]
                      ? `Show less reviews`
                      : `Show all ${course.reviews.length} reviews`}
                  </ShowMoreReviewsText>
                </ShowMoreReviewsSection>
              )}
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
