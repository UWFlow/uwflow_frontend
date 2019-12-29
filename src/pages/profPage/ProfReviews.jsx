import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useQuery } from 'react-apollo';
import { withTheme } from 'styled-components';
import moment from 'moment';

/* Styled Components */
import {
  ProfCourseReviewWrapper,
  ReviewsForSingleCourseWrapper,
  ReviewListWrapper,
  NoReviewsBox,
  CourseHeader,
  CourseNameAndCode,
  CourseCode,
  CourseName,
  DropdownPanelWrapper,
  DropdownTableText,
  CourseLikedMetric,
  CourseLikedPercent,
  CourseLikedPercentLabel,
  ProfCourseFilterWrapper,
  ShowMoreReviewsSection,
  ShowMoreReviewsText,
} from './styles/ProfReviews';

/* Child Components */
import Review from '../../components/display/Review';
import DropdownList from '../../components/input/DropdownList';
import LoadingSpinner from '../../components/display/LoadingSpinner';

/* Hooks */
import useProfReviewsReducer, {
  UPDATE_REVIEW_DATA,
} from '../../data/hooks/UseProfReviewsReducer';

/* GraphQL Queries */
import { buildProfReviewQuery } from '../../graphql/queries/prof/ProfReview.jsx';

/* Selectors */
import { getIsLoggedIn } from '../../data/reducers/AuthReducer';

/* Utils */
import { formatCourseCode } from '../../utils/Misc';
import { sortReviews } from '../../utils/Review';
import { getCoursePageRoute } from '../../Routes';
import { MIN_REVIEWS_SHOWN } from '../../constants/PageConstants';

const mapStateToProps = state => ({
  isLoggedIn: getIsLoggedIn(state),
});

const ProfReviews = ({ profID, theme, isLoggedIn }) => {
  const [selectedFilter, setSelectedFilter] = useState(0);
  const [selectedSort, setSelectedSort] = useState(Array(1).fill(0));
  const { loading, data } = useQuery(buildProfReviewQuery(isLoggedIn), {
    variables: { id: profID },
  });
  const [reviewDataState, dispatchReviews] = useProfReviewsReducer(data);
  const [showingReviewsMap, setShowingReviewsMap] = useState({});

  useEffect(() => {
    if (data) {
      dispatchReviews({
        type: UPDATE_REVIEW_DATA,
        payload: data,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    ...reviewDataState.courses.map(code => formatCourseCode(code)),
  ];

  const reviewsByCourseToShow = reviewDataState.reviewsByCourse.filter(
    reviews =>
      selectedFilter === 0 ||
      reviews.code === courseFilterOptions[selectedFilter],
  );

  const curSelectedSort =
    selectedSort.length >= reviewsByCourseToShow.length
      ? selectedSort.slice()
      : [
          ...selectedSort,
          ...Array(reviewsByCourseToShow.length - selectedSort.length).fill(0),
        ];

  if (reviewDataState.courses.length === 0) {
    return <NoReviewsBox>No Reviews</NoReviewsBox>;
  }

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
            searchable
          />
        </DropdownPanelWrapper>
      </ProfCourseFilterWrapper>
      {reviewsByCourseToShow.map((course, idx) => {
        return (
          <ReviewsForSingleCourseWrapper key={idx}>
            <ReviewListWrapper>
              <CourseHeader key={course.id}>
                <CourseNameAndCode>
                  <CourseCode to={getCoursePageRoute(course.code)}>
                    {formatCourseCode(course.code)}
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
                  selectedIndex={curSelectedSort[idx]}
                  options={['most recent', 'most helpful']}
                  onChange={value => {
                    curSelectedSort[idx] = value;
                    setSelectedSort(curSelectedSort);
                  }}
                />
              </DropdownPanelWrapper>
              {sortReviews(course.reviews, selectedSort[idx] === 0)
                .filter((_, i) => {
                  return (
                    i < MIN_REVIEWS_SHOWN || showingReviewsMap[course.code]
                  );
                })
                .map(review => (
                  <Review
                    key={review.id}
                    review={review}
                    isCourseReview={false}
                  />
                ))}
            </ReviewListWrapper>
            {course.reviews.length > MIN_REVIEWS_SHOWN && (
              <ShowMoreReviewsSection
                id={course.code}
                onClick={() => {
                  setShowingReviewsMap({
                    ...showingReviewsMap,
                    [course.code]: !showingReviewsMap[course.code],
                  });
                  if (showingReviewsMap[course.code]) {
                    document.getElementById(course.code).scrollIntoView();
                  }
                }}
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
  );
};

ProfReviews.propTypes = {
  profID: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  theme: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(withTheme(ProfReviews));
