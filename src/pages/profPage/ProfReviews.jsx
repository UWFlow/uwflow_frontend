import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useQuery } from 'react-apollo';
import { withTheme } from 'styled-components';

/* Styled Components */

/* Child Components */
import Review from 'components/display/Review';
import DropdownList from 'components/input/DropdownList';
import LoadingSpinner from 'components/display/LoadingSpinner';

/* Hooks */
import useProfReviewsReducer, {
  UPDATE_REVIEW_DATA,
} from 'data/hooks/UseProfReviewsReducer';

/* GraphQL Queries */
import { buildProfReviewQuery } from 'graphql/queries/prof/ProfReview';

/* Utils */
import { formatCourseCode, processRating } from 'utils/Misc';
import { sortReviews, sortByReviews, sortByLiked } from 'utils/Review';
import { getCoursePageRoute } from 'Routes';
import {
  MIN_REVIEWS_SHOWN_PROF,
  REVIEWS_DIV_ID,
} from 'constants/PageConstants';
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
  ShowMoreReviewsSection,
  ShowMoreReviewsText,
  CourseDropdownsWrapper,
  SortFilterDropdownWrapper,
} from './styles/ProfReviews';

const mapStateToProps = (state) => ({
  isLoggedIn: state.auth.loggedIn,
});

const ProfReviews = ({ profID, theme, isLoggedIn }) => {
  const [courseSort, setCourseSort] = useState(0);
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
    // eslint-disable-next-line
  }, [data]);

  if (loading) {
    return (
      <ProfCourseReviewWrapper>
        <LoadingSpinner />
      </ProfCourseReviewWrapper>
    );
  }

  const courseFilterDisplayOptions = [
    'show all courses',
    ...reviewDataState.courses
      .map((code) => formatCourseCode(code))
      .sort((a, b) => a.localeCompare(b)),
  ];

  const sortCourses = (a, b) =>
    courseSort === 0
      ? sortByReviews(a, b, (x, y) => x.code.localeCompare(y.code))
      : sortByLiked(a, b);

  const reviewsByCourseToShow = reviewDataState.reviewsByCourse
    .sort(sortCourses)
    .filter(
      (course) =>
        selectedFilter === 0 ||
        formatCourseCode(course.code) ===
          courseFilterDisplayOptions[selectedFilter],
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
    <ProfCourseReviewWrapper id={REVIEWS_DIV_ID}>
      <CourseDropdownsWrapper>
        <SortFilterDropdownWrapper>
          <DropdownTableText>Sort courses: </DropdownTableText>
          <DropdownList
            color={theme.primary}
            selectedIndex={courseSort}
            options={['most reviews', 'most liked']}
            onChange={(value) => setCourseSort(value)}
            zIndex={6}
          />
        </SortFilterDropdownWrapper>
        <SortFilterDropdownWrapper>
          <DropdownTableText>Filter by course: </DropdownTableText>
          <DropdownList
            color={theme.courses}
            selectedIndex={selectedFilter}
            options={courseFilterDisplayOptions}
            onChange={(value) => setSelectedFilter(value)}
            zIndex={5}
            searchable
          />
        </SortFilterDropdownWrapper>
      </CourseDropdownsWrapper>
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
                    {processRating(course.liked)}
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
                  onChange={(value) => {
                    curSelectedSort[idx] = value;
                    setSelectedSort(curSelectedSort);
                  }}
                />
              </DropdownPanelWrapper>
              {sortReviews(course.reviews, selectedSort[idx] === 0)
                .filter((_, i) => {
                  return (
                    i < MIN_REVIEWS_SHOWN_PROF || showingReviewsMap[course.code]
                  );
                })
                .map((review) => (
                  <Review
                    key={review.id}
                    review={review}
                    isCourseReview={false}
                  />
                ))}
            </ReviewListWrapper>
            {course.reviews.length > MIN_REVIEWS_SHOWN_PROF && (
              <ShowMoreReviewsSection
                onClick={() => {
                  setShowingReviewsMap({
                    ...showingReviewsMap,
                    [course.code]: !showingReviewsMap[course.code],
                  });
                  if (showingReviewsMap[course.code]) {
                    document.getElementById(course.code).scrollIntoView();
                  }
                }}
                onMouseDown={(e) => e.preventDefault()}
              >
                <ShowMoreReviewsText>
                  {showingReviewsMap[course.code]
                    ? `Show fewer reviews`
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
