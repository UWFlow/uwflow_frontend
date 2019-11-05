import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useQuery } from 'react-apollo';
import { withTheme } from 'styled-components';

/* Custom Hooks */
import useCourseReviewsReducer, {
  UPDATE_REVIEW_DATA,
  SORT_COURSE_REVIEWS_BY_PROF,
} from '../../../data/custom_hooks/UseCourseReviewsReducer';

/* Styled Components */
import {
  CourseReviewWrapper,
  CourseCourseReviewsWrapper,
  CourseProfReviewsWrapper,
  ReviewsForSingleProfWrapper,
  ReviewsOptionsWrapper,
  DropdownPanelWrapper,
  ProfDropdownPanelWrapper,
  DropdownTableText,
  ProfName,
  ProfLikedMetric,
  ProfLikedPercent,
  ProfLikedPercentLabel,
  ShowMoreReviewsSection,
  ShowMoreReviewsText,
} from './styles/CourseReviews';

/* Child Components */
import CollapseableContainer from '../../../components/display/CollapseableContainer';
import Review from '../common/Review';
import DropdownList from '../../../components/input/DropdownList';
import LoadingSpinner from '../../../components/display/LoadingSpinner';

/* GraphQL Queries */
import { GET_COURSE_REVIEW } from '../../../graphql/queries/course/CourseReview.jsx';

import { getProfPageRoute } from '../../../Routes';
import { MIN_REVIEWS_SHOWN } from '../../../constants/PageConstants';

const CourseCourseReviews = ({
  reviews,
  theme,
  courseSort,
  setCourseSort,
  courseProfFilter,
  courseProfFilterOptions,
  setCourseProfFilter,
}) => {
  const [showingAllReviews, setShowingAllReviews] = useState(false);

  return (
    <CourseCourseReviewsWrapper>
      <ReviewsOptionsWrapper>
        <DropdownPanelWrapper>
          <DropdownTableText>Sort by: </DropdownTableText>
          <DropdownList
            color={theme.primary}
            selectedIndex={courseSort}
            options={[
              'least recent',
              'least helpful',
              'most helpful',
              'most recent',
            ]}
            onChange={value => setCourseSort(value)}
            zIndex={5}
          />
        </DropdownPanelWrapper>
        <DropdownPanelWrapper>
          <DropdownTableText>Filter by professor: </DropdownTableText>
          <DropdownList
            color={theme.professors}
            selectedIndex={courseProfFilter}
            options={courseProfFilterOptions}
            onChange={value => setCourseProfFilter(value)}
            zIndex={4}
          />
        </DropdownPanelWrapper>
      </ReviewsOptionsWrapper>
      {reviews.map((review, i) => {
        if (i < MIN_REVIEWS_SHOWN || showingAllReviews)
          return (
            <Review
              key={i}
              upvotes={review.upvotes}
              review={review.review}
              reviewer={review.reviewer}
              metrics={review.metrics}
            />
          );
      })}
      {reviews.length > MIN_REVIEWS_SHOWN && (
        <ShowMoreReviewsSection
          onClick={() => setShowingAllReviews(!showingAllReviews)}
        >
          <ShowMoreReviewsText>
            {showingAllReviews
              ? `Show less reviews`
              : `Show all ${reviews.length} reviews`}
          </ShowMoreReviewsText>
        </ShowMoreReviewsSection>
      )}
    </CourseCourseReviewsWrapper>
  );
};

CourseCourseReviews.propTypes = {
  reviews: PropTypes.arrayOf(
    PropTypes.shape({
      upvotes: PropTypes.number,
      review: PropTypes.object,
      reviewer: PropTypes.shape({
        name: PropTypes.string,
        program: PropTypes.string,
      }),
      metrics: PropTypes.shape({
        useful: PropTypes.number,
        easy: PropTypes.number,
        liked: PropTypes.boolean,
      }),
    }),
  ).isRequired,
  theme: PropTypes.object.isRequired,
};

const CourseProfReviews = ({ reviewsByProf, ProfFilterDropdown }) => {
  const [showingReviewsMap, setShowingReviewsMap] = useState({});

  return (
    <CourseProfReviewsWrapper>
      {ProfFilterDropdown}
      {reviewsByProf.map((prof, idx) => (
        <ReviewsForSingleProfWrapper key={idx}>
          <ProfName to={getProfPageRoute(prof.code)}>{prof.name}</ProfName>
          <ProfLikedMetric>
            <ProfLikedPercent>{Math.round(prof.liked * 100)}%</ProfLikedPercent>
            <ProfLikedPercentLabel>liked this professor</ProfLikedPercentLabel>
          </ProfLikedMetric>
          {prof.reviews.map((review, i) => {
            if (i < MIN_REVIEWS_SHOWN || showingReviewsMap[prof.name])
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
          {prof.reviews.length > MIN_REVIEWS_SHOWN && (
            <ShowMoreReviewsSection
              onClick={() =>
                setShowingReviewsMap({
                  ...showingReviewsMap,
                  [prof.name]: !showingReviewsMap[prof.name],
                })
              }
            >
              <ShowMoreReviewsText>
                {showingReviewsMap[prof.name]
                  ? `Show less reviews`
                  : `Show all ${prof.reviews.length} reviews`}
              </ShowMoreReviewsText>
            </ShowMoreReviewsSection>
          )}
        </ReviewsForSingleProfWrapper>
      ))}
    </CourseProfReviewsWrapper>
  );
};

CourseProfReviews.propTypes = {
  reviewsByProf: PropTypes.arrayOf(
    PropTypes.shape({
      prof: PropTypes.string,
      likes: PropTypes.number,
      reviews: PropTypes.arrayOf(
        PropTypes.shape({
          upvotes: PropTypes.number,
          review: PropTypes.object,
          reviewer: PropTypes.shape({
            name: PropTypes.string,
            program: PropTypes.string,
          }),
          metrics: PropTypes.shape({
            clear: PropTypes.bool, //these probably should be numbers but server returns bools rn
            engaging: PropTypes.bool,
          }),
        }),
      ),
    }),
  ).isRequired,
};

const CourseReviews = ({ courseID, theme }) => {
  const { loading, data } = useQuery(GET_COURSE_REVIEW, {
    variables: { id: courseID },
  });
  const [courseSort, setCourseSort] = useState(0);
  const [courseProfFilter, setCourseProfFilter] = useState(0);
  const [profReviewFilter, setProfReviewFilter] = useState(0);
  const [reviewDataState, dispatch] = useCourseReviewsReducer(data);

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
      <CourseReviewWrapper>
        <LoadingSpinner />
      </CourseReviewWrapper>
    );
  }

  const courseProfFilterOptions = [
    'show all professors',
    ...reviewDataState.courseReviewProfs,
  ];

  const courseReviewsToShow = reviewDataState.courseReviews.filter(
    review =>
      courseProfFilter === 0 ||
      review.prof === courseProfFilterOptions[courseProfFilter],
  );

  const profProfFilterOptions = [
    'show all professors',
    ...reviewDataState.profReviewProfs,
  ];

  const profReviewsToShow = reviewDataState.reviewsByProf.filter(
    review =>
      profReviewFilter === 0 ||
      review.name === profProfFilterOptions[profReviewFilter],
  );

  const ProfFilterDropdown = (
    <ProfDropdownPanelWrapper>
      <DropdownTableText>Filter by professor: </DropdownTableText>
      <DropdownList
        color={theme.professors}
        selectedIndex={profReviewFilter}
        options={profProfFilterOptions}
        onChange={value => setProfReviewFilter(value)}
      />
    </ProfDropdownPanelWrapper>
  );

  return (
    <CourseReviewWrapper>
      <CollapseableContainer
        title={`Course comments (${data.course_review_aggregate.aggregate.count})`}
      >
        <CourseCourseReviews
          reviews={courseReviewsToShow}
          theme={theme}
          courseSort={courseSort}
          setCourseSort={setCourseSort}
          courseProfFilter={courseProfFilter}
          courseProfFilterOptions={courseProfFilterOptions}
          setCourseProfFilter={setCourseProfFilter}
        />
      </CollapseableContainer>
      <CollapseableContainer
        title={`Professor comments (${data.prof_review_aggregate.aggregate.count})`}
      >
        <CourseProfReviews
          reviewsByProf={profReviewsToShow}
          ProfFilterDropdown={ProfFilterDropdown}
        />
      </CollapseableContainer>
    </CourseReviewWrapper>
  );
};

CourseReviews.propTypes = {
  courseID: PropTypes.string.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withTheme(CourseReviews);
