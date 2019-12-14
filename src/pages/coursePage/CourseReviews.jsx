import React, { useState, useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useQuery } from 'react-apollo';
import { withTheme } from 'styled-components';
import moment from 'moment';

/* Constants */
import { MIN_REVIEWS_SHOWN } from '../../constants/PageConstants';

/* Custom Hooks */
import useCourseReviewsReducer, {
  UPDATE_REVIEW_DATA,
} from '../../data/hooks/UseCourseReviewsReducer';

/* Styled Components */
import {
  CourseReviewWrapper,
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
import TabContainer from '../../components/display/TabContainer';
import Review from '../../components/display/Review';
import DropdownList from '../../components/input/DropdownList';
import LoadingSpinner from '../../components/display/LoadingSpinner';
import CollapseableContainer from '../../components/display/CollapseableContainer';

/* Selectors */
import { getIsBrowserDesktop } from '../../data/reducers/BrowserReducer';
import { getIsLoggedIn } from '../../data/reducers/AuthReducer';

/* GraphQL Queries */
import { buildCourseReviewQuery } from '../../graphql/queries/course/CourseReview.jsx';
import { getProfPageRoute } from '../../Routes';

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

  const renderReviews = useMemo(
    () =>
      reviews
        .sort((a, b) => {
          const timeSort =
            moment(b.created_at).format('YYYYMMDD') -
            moment(a.created_at).format('YYYYMMDD');
          return courseSort === 0
            ? timeSort
            : b.upvotes === a.upvotes
            ? timeSort
            : b.upvotes - a.upvotes;
        })
        .filter((_, i) => {
          return showingAllReviews || i < MIN_REVIEWS_SHOWN;
        })
        .map(review => (
          <Review key={review.id} review={review} isCourseReview />
        )),
    [reviews, showingAllReviews, courseSort],
  );

  return (
    <CourseCourseReviewsWrapper>
      <ReviewListWrapper>
        <ReviewsOptionsWrapper>
          <DropdownPanelWrapper>
            <DropdownTableText>Sort by: </DropdownTableText>
            <DropdownList
              color={theme.primary}
              selectedIndex={courseSort}
              options={['most recent', 'most helpful']}
              onChange={value => setCourseSort(value)}
              zIndex={6}
            />
          </DropdownPanelWrapper>
          <DropdownPanelWrapper>
            <DropdownTableText>Filter by professor: </DropdownTableText>
            <DropdownList
              color={theme.professors}
              selectedIndex={courseProfFilter}
              options={courseProfFilterOptions}
              onChange={value => setCourseProfFilter(value)}
              searchable
            />
          </DropdownPanelWrapper>
        </ReviewsOptionsWrapper>
        {renderReviews}
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
      review: PropTypes.string,
      author: PropTypes.shape({
        full_name: PropTypes.string,
        program: PropTypes.string,
        picture_url: PropTypes.string,
      }),
      user: PropTypes.shape({
        user_id: PropTypes.number,
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

  const reviewList = useMemo(
    () =>
      reviewsByProf.map((prof, idx) => (
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
            {prof.reviews
              .sort((a, b) => {
                return (
                  moment(b.created_at).format('YYYYMMDD') -
                  moment(a.created_at).format('YYYYMMDD')
                );
              })
              .filter((_, i) => {
                return i < MIN_REVIEWS_SHOWN || showingReviewsMap[prof.name];
              })
              .map(review => (
                <Review
                  key={review.id}
                  review={review}
                  isCourseReview={false}
                />
              ))}
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
      )),
    [reviewsByProf, showingReviewsMap],
  );

  return (
    <CourseProfReviewsWrapper>
      {ProfFilterDropdown}
      {reviewList}
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
          review: PropTypes.string,
          author: PropTypes.shape({
            full_name: PropTypes.string,
            program: PropTypes.string,
            picture_url: PropTypes.string,
          }).isRequired,
          user: PropTypes.shape({
            user_id: PropTypes.number,
          }),
          metrics: PropTypes.shape({
            clear: PropTypes.number,
            engaging: PropTypes.number,
          }).isRequired,
        }),
      ),
    }),
  ).isRequired,
};

const mapStateToProps = state => ({
  isBrowserDesktop: getIsBrowserDesktop(state),
  isLoggedIn: getIsLoggedIn(state),
});

const CourseReviews = ({ courseID, theme, isBrowserDesktop, isLoggedIn }) => {
  const { loading, data } = useQuery(buildCourseReviewQuery(isLoggedIn), {
    variables: { id: courseID },
  });
  const [courseSort, setCourseSort] = useState(0);
  const [courseProfFilter, setCourseProfFilter] = useState(0);
  const [profReviewFilter, setProfReviewFilter] = useState(0);
  const [showingProfReviews, setShowingProfReviews] = useState(false);
  const [reviewDataState, dispatchReviews] = useCourseReviewsReducer(data);

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
      <CourseReviewWrapper>
        <LoadingSpinner />
      </CourseReviewWrapper>
    );
  }

  const courseProfFilterOptions = [
    'all professors',
    ...reviewDataState.courseReviewProfs,
  ];

  const courseReviewsToShow = reviewDataState.courseReviews.filter(
    review =>
      courseProfFilter === 0 ||
      review.prof === courseProfFilterOptions[courseProfFilter],
  );

  const profProfFilterOptions = [
    'all professors',
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
        searchable
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
      {isBrowserDesktop && (
        <TabContainer
          tabList={tabList}
          initialSelectedTab={0}
          contentPadding="0"
        />
      )}
      {showingProfReviews && isBrowserDesktop && (
        <CourseProfReviews
          reviewsByProf={profReviewsToShow}
          ProfFilterDropdown={!isBrowserDesktop && ProfFilterDropdown}
        />
      )}
      {!isBrowserDesktop && (
        <>
          <CollapseableContainer
            title={`Course reviews (${courseReviewsToShow.length})`}
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
            title={`Professor reviews (${numProfReviews})`}
          >
            <CourseProfReviews
              reviewsByProf={profReviewsToShow}
              ProfFilterDropdown={ProfFilterDropdown}
            />
          </CollapseableContainer>
        </>
      )}
    </CourseReviewWrapper>
  );
};

CourseReviews.propTypes = {
  courseID: PropTypes.number.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withTheme(connect(mapStateToProps)(CourseReviews));
