import React, { useState, useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useQuery } from 'react-apollo';
import { withTheme } from 'styled-components';

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
  NumProfReviews,
  NameNumReviewsWrapper,
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
import CollapsibleContainer from '../../components/display/CollapsibleContainer';

/* Selectors */
import { getIsBrowserDesktop } from '../../data/reducers/BrowserReducer';
import { getIsLoggedIn } from '../../data/reducers/AuthReducer';

/* GraphQL Queries */
import { buildCourseReviewQuery } from '../../graphql/queries/course/CourseReview.jsx';

/* Constants */
import {
  MIN_REVIEWS_SHOWN_COURSE,
  MIN_REVIEWS_SHOWN_PROF,
  REVIEWS_DIV_ID,
} from '../../constants/PageConstants';

/* Hooks */
import useCourseReviewsReducer, {
  UPDATE_REVIEW_DATA,
} from '../../data/hooks/UseCourseReviewsReducer';

/* Utils */
import { sortReviews } from '../../utils/Review';
import { getProfPageRoute } from '../../Routes';
import { processRating } from '../../utils/Misc';

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
      sortReviews(reviews, courseSort === 0)
        .filter((_, i) => {
          return showingAllReviews || i < MIN_REVIEWS_SHOWN_COURSE;
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
      {reviews.length > MIN_REVIEWS_SHOWN_COURSE && (
        <ShowMoreReviewsSection
          onClick={() => setShowingAllReviews(!showingAllReviews)}
          onMouseDown={e => e.preventDefault()}
        >
          <ShowMoreReviewsText>
            {showingAllReviews
              ? `Show fewer reviews`
              : `Show all ${reviews.length} reviews`}
          </ShowMoreReviewsText>
        </ShowMoreReviewsSection>
      )}
    </CourseCourseReviewsWrapper>
  );
};

const CourseProfReviews = ({
  theme,
  reviewsByProf,
  ProfFilterDropdown,
  selectedSort,
  setSelectedSort,
}) => {
  const [showingReviewsMap, setShowingReviewsMap] = useState({});

  const curSelectedSort =
    selectedSort.length >= reviewsByProf.length
      ? selectedSort.slice()
      : [
          ...selectedSort,
          ...Array(reviewsByProf.length - selectedSort.length).fill(0),
        ];

  const reviewList = useMemo(
    () =>
      reviewsByProf.map((prof, idx) => (
        <ReviewsForSingleProfWrapper key={idx}>
          <ReviewListWrapper>
            <ProfHeader>
              <NameNumReviewsWrapper>
                <ProfName to={getProfPageRoute(prof.code)}>
                  {prof.name}
                </ProfName>
                <NumProfReviews>
                  {prof.reviews.length > 0
                    ? `${prof.reviews.length} review${
                        prof.reviews.length === 1 ? '' : 's'
                      } for this course`
                    : `${prof.comment_count} review${
                        prof.comment_count === 1 ? '' : 's'
                      } for other courses`}
                </NumProfReviews>
              </NameNumReviewsWrapper>
              <ProfLikedMetric>
                <ProfLikedPercent>{processRating(prof.liked)}</ProfLikedPercent>
                <ProfLikedPercentLabel>
                  liked this professor
                </ProfLikedPercentLabel>
              </ProfLikedMetric>
            </ProfHeader>
            {prof.reviews.length > 0 && (
              <ReviewsOptionsWrapper>
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
                    zIndex={4}
                  />
                </DropdownPanelWrapper>
              </ReviewsOptionsWrapper>
            )}
            {sortReviews(prof.reviews, selectedSort[idx] === 0)
              .filter((_, i) => {
                return i < MIN_REVIEWS_SHOWN_PROF || showingReviewsMap[prof.name];
              })
              .map(review => (
                <Review
                  key={review.id}
                  review={review}
                  isCourseReview={false}
                />
              ))}
          </ReviewListWrapper>
          {prof.reviews.length > MIN_REVIEWS_SHOWN_PROF && (
            <ShowMoreReviewsSection
              id={prof.name}
              onClick={() => {
                setShowingReviewsMap({
                  ...showingReviewsMap,
                  [prof.name]: !showingReviewsMap[prof.name],
                });
                if (showingReviewsMap[prof.name]) {
                  document.getElementById(prof.name).scrollIntoView();
                }
              }}
              onMouseDown={e => e.preventDefault()}
            >
              <ShowMoreReviewsText>
                {showingReviewsMap[prof.name]
                  ? `Show fewer reviews`
                  : `Show all ${prof.reviews.length} reviews`}
              </ShowMoreReviewsText>
            </ShowMoreReviewsSection>
          )}
        </ReviewsForSingleProfWrapper>
      )),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [reviewsByProf, showingReviewsMap, selectedSort, curSelectedSort],
  );

  return (
    <CourseProfReviewsWrapper>
      {ProfFilterDropdown}
      {reviewList}
    </CourseProfReviewsWrapper>
  );
};

const mapStateToProps = state => ({
  isBrowserDesktop: getIsBrowserDesktop(state),
  isLoggedIn: getIsLoggedIn(state),
});

const CourseReviews = ({
  courseID,
  profsTeaching,
  theme,
  isBrowserDesktop,
  isLoggedIn,
}) => {
  const { loading, data } = useQuery(buildCourseReviewQuery(isLoggedIn), {
    variables: { id: courseID },
  });
  const [courseSort, setCourseSort] = useState(0);
  const [courseProfFilter, setCourseProfFilter] = useState(0);
  const [profReviewFilter, setProfReviewFilter] = useState(0);
  const [showingProfReviews, setShowingProfReviews] = useState(false);
  const [reviewDataState, dispatchReviews] = useCourseReviewsReducer(data);
  const [selectedProfSort, setSelectedProfSort] = useState(Array(1).fill(0));

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
    ...reviewDataState.courseReviewProfs.sort((a, b) => a.localeCompare(b)),
  ];

  const courseReviewsToShow = reviewDataState.courseReviews.filter(
    review =>
      courseProfFilter === 0 ||
      review.prof === courseProfFilterOptions[courseProfFilter],
  );

  // find profs who don't have reviews but are currently teaching the course
  const profsWithReviews = reviewDataState.reviewsByProf.map(prof => prof.code);
  const additionalProfs = profsTeaching
    .filter(profObj => !profsWithReviews.includes(profObj.prof.code))
    .map(profObj =>
      Object({
        ...profObj.prof,
        ...profObj.prof.rating,
        reviews: [],
      }),
    );

  const profFilterOptions = [
    'all professors',
    ...[
      ...reviewDataState.profReviewProfs,
      ...additionalProfs.map(prof => prof.name),
    ].sort((a, b) => a.localeCompare(b)),
  ];

  const profReviewsToShow = reviewDataState.reviewsByProf
    .concat(additionalProfs)
    .sort((a, b) => a.name.localeCompare(b.name))
    .filter(
      prof =>
        profReviewFilter === 0 ||
        prof.name === profFilterOptions[profReviewFilter],
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
        options={profFilterOptions}
        onChange={value => setProfReviewFilter(value)}
        zIndex={6}
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
    <CourseReviewWrapper id={REVIEWS_DIV_ID}>
      {isBrowserDesktop && (
        <TabContainer
          tabList={tabList}
          initialSelectedTab={0}
          contentPadding="0"
        />
      )}
      {showingProfReviews && isBrowserDesktop && (
        <CourseProfReviews
          theme={theme}
          reviewsByProf={profReviewsToShow}
          ProfFilterDropdown={!isBrowserDesktop && ProfFilterDropdown}
          selectedSort={selectedProfSort}
          setSelectedSort={setSelectedProfSort}
        />
      )}
      {!isBrowserDesktop && (
        <>
          <CollapsibleContainer
            title={`Course reviews (${courseReviewsToShow.length})`}
            margin="0 auto"
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
          </CollapsibleContainer>
          <CollapsibleContainer title={`Professor reviews (${numProfReviews})`}>
            <CourseProfReviews
              theme={theme}
              reviewsByProf={profReviewsToShow}
              ProfFilterDropdown={ProfFilterDropdown}
              selectedSort={selectedProfSort}
              setSelectedSort={setSelectedProfSort}
            />
          </CollapsibleContainer>
        </>
      )}
    </CourseReviewWrapper>
  );
};

CourseReviews.propTypes = {
  courseID: PropTypes.number.isRequired,
  profsTeaching: PropTypes.array.isRequired,
};

export default withTheme(connect(mapStateToProps)(CourseReviews));
