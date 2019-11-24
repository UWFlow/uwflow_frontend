import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useQuery } from 'react-apollo';
import { withTheme } from 'styled-components';
import moment from 'moment';

/* Custom Reducers */
import useProfReviewsReducer, {
  UPDATE_REVIEW_DATA,
} from '../../data/hooks/UseProfReviewsReducer';

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

/* GraphQL Queries */
import { GET_PROF_REVIEW } from '../../graphql/queries/prof/ProfReview.jsx';

import { splitCourseCode } from '../../utils/Misc';
import { getCoursePageRoute } from '../../Routes';
import { MIN_REVIEWS_SHOWN } from '../../constants/PageConstants';

const ProfReviews = ({ profID, theme }) => {
  const [selectedFilter, setSelectedFilter] = useState(0);
  // TODO(Edwin): figure out how to get the actual length of courses
  const [selectedSort, setSelectedSort] = useState(Array(150).fill(0));
  const { loading, data } = useQuery(GET_PROF_REVIEW, {
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
    ...reviewDataState.courses.map(code => splitCourseCode(code)),
  ];

  const reviewsByCourseToShow = reviewDataState.reviewsByCourse.filter(
    reviews =>
      selectedFilter === 0 ||
      reviews.code === courseFilterOptions[selectedFilter],
  );

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
                  selectedIndex={selectedSort[idx]}
                  options={['most recent', 'most helpful']}
                  onChange={value => {
                    const selectedSortSlice = selectedSort.slice();
                    selectedSortSlice[idx] = value;
                    setSelectedSort(selectedSortSlice)
                  }}
                />
              </DropdownPanelWrapper>
              {course.reviews.sort((a, b) => {
                const timeSort = moment(b.created_at).format('YYYYMMDD') - moment(a.created_at).format('YYYYMMDD');
                return selectedSort[idx] === 0 ?
                  timeSort : timeSort || a.upvotes - b.upvotes;
              }).filter((_, i) => {
                return i < MIN_REVIEWS_SHOWN || showingReviewsMap[course.code];
              }).map((review, i) => (
                <Review key={i} review={review} />
              ))}
            </ReviewListWrapper>
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
  );
};

ProfReviews.propTypes = {
  profID: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  theme: PropTypes.object.isRequired,
};

export default withTheme(ProfReviews);
