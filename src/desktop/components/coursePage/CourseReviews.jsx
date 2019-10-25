import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useQuery } from 'react-apollo';
import { withTheme } from 'styled-components';

/* Constants */
import { MIN_REVIEWS_SHOWN } from '../../../constants/PageConstants';

/* Custom Hooks */
import useCourseReviewsReducer, {
  UPDATE_REVIEW_DATA,
  SORT_COURSE_REVIEWS_BY_PROF,
} from '../../../data/custom_hooks/UseCourseReviewsReducer';

/* Styled Components */
import {
  CourseReviewWrapper,
  ReviewWithButtonWrapper,
  CourseCourseReviewsWrapper,
  CourseProfReviewsWrapper,
  ReviewsForSingleProfWrapper,
  ReviewListWrapper,
  ReviewsOptionsWrapper,
  DropdownPanelWrapper,
  ProfDropdownPanelWrapper,
  DropdownTableText,
  ProfHeader,
  ProfName,
  ProfLikedMetric,
  ProfLikedPercent,
  ProfLikedPercentLabel,
  ShowMoreReviewsSection,
  ShowMoreReviewsText,
} from './styles/CourseReviews';

/* Child Components */
import TabContainer from '../../../sharedComponents/display/TabContainer';
import Review from '../common/Review';
import DropdownList from '../../../sharedComponents/input/DropdownList';
import LoadingSpinner from '../../../sharedComponents/display/LoadingSpinner';

/* GraphQL Queries */
import { GET_COURSE_REVIEW } from '../../../graphql/queries/course/CourseReview.jsx';
import { getProfPageRoute } from '../../../Routes';

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
      <ReviewListWrapper>
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
            />
          </DropdownPanelWrapper>
          <DropdownPanelWrapper>
            <DropdownTableText>Filter by professor: </DropdownTableText>
            <DropdownList
              color={theme.professors}
              selectedIndex={courseProfFilter}
              options={courseProfFilterOptions}
              onChange={value => setCourseProfFilter(value)}
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
      </ReviewListWrapper>
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

const CourseProfReviews = ({ reviewsByProf }) => {
  const [showingReviewsMap, setShowingReviewsMap] = useState({});

  return (
    <CourseProfReviewsWrapper>
      {reviewsByProf.map((prof, idx) => (
        <ReviewsForSingleProfWrapper key={idx}>
          <ReviewListWrapper>
            <ProfHeader>
              <ProfName to={getProfPageRoute(prof.code)}>{prof.name}</ProfName>
              <ProfLikedMetric>
                <ProfLikedPercent>
                  {Math.round(prof.liked * 100)}%
                </ProfLikedPercent>
                <ProfLikedPercentLabel>
                  liked this professor
                </ProfLikedPercentLabel>
              </ProfLikedMetric>
            </ProfHeader>
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
          </ReviewListWrapper>
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
  const [showingProfReviews, setShowingProfReviews] = useState(false);
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

  const numProfReviews = profReviewsToShow.reduce((total, curr) => {
    total += curr.reviews.length;
    return total;
  }, 0);

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

  const tabList = [
    {
      title: `Course reviews (${courseReviewsToShow.length})`,
      render: () => (
        <CourseCourseReviews
          reviews={courseReviewsToShow}
          theme={theme}
          courseSort={courseSort}
          setCourseSort={setCourseSort}
          courseProfFilter={courseProfFilter}
          courseProfFilterOptions={courseProfFilterOptions}
          setCourseProfFilter={setCourseProfFilter}
        />
      ),
      onClick: () => setShowingProfReviews(false),
    },
    {
      title: `Professor reviews (${numProfReviews})`,
      render: () => ProfFilterDropdown,
      onClick: () => setShowingProfReviews(true),
    },
  ];

  return (
    <CourseReviewWrapper>
      <TabContainer
        tabList={tabList}
        initialSelectedTab={0}
        contentPadding="0"
      />
      {showingProfReviews && (
        <CourseProfReviews reviewsByProf={profReviewsToShow} />
      )}
    </CourseReviewWrapper>
  );
};

CourseReviews.propTypes = {
  courseID: PropTypes.number.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withTheme(CourseReviews);
