import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useQuery } from 'react-apollo';
import { withTheme } from 'styled-components';

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
  ProfHeader,
  ProfName,
  ProfLikedMetric,
  ProfLikedPercent,
  ProfLikedPercentLabel,
} from './styles/CourseReviews';

/* Child Components */
import TabContainer from '../common/TabContainer';
import Review from '../common/Review';
import DropdownList from '../common/dropdownList/DropdownList';

/* GraphQL Queries */
import { GET_COURSE_REVIEW } from '../../../graphql/queries/course/CourseReview.jsx';

const CourseCourseReviews = (
  reviews,
  theme,
  courseSort,
  setCourseSort,
  courseProfFilter,
  setCourseProfFilter,
) => {
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
          />
        </DropdownPanelWrapper>
        <DropdownPanelWrapper>
          <DropdownTableText>Filter by professor: </DropdownTableText>
          <DropdownList
            color={theme.professors}
            selectedIndex={courseProfFilter}
            options={['show all professors']}
            onChange={value => setCourseProfFilter(value)}
          />
        </DropdownPanelWrapper>
      </ReviewsOptionsWrapper>
      {reviews.map((review, i) => {
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

const CourseProfReviews = reviewsByProf => {
  return (
    <CourseProfReviewsWrapper>
      {reviewsByProf.map((curr, idx) => (
        <ReviewsForSingleProfWrapper key={idx}>
          <ProfHeader>
            <ProfName>{curr.prof}</ProfName>
            <ProfLikedMetric>
              <ProfLikedPercent>
                {Math.round(curr.likes * 100)}%
              </ProfLikedPercent>
              <ProfLikedPercentLabel>
                liked this professor
              </ProfLikedPercentLabel>
            </ProfLikedMetric>
          </ProfHeader>
          {curr.reviews.map(review => {
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

  if (loading) {
    return (
      <CourseReviewWrapper>
        <div>Loading ...</div>
      </CourseReviewWrapper>
    );
  }

  const courseReviews = data.course_review.map(r => ({
    upvotes: r.course_review_votes_aggregate.aggregate.sum.vote,
    review: r.text,
    reviewer: r.user,
    metrics: {
      useful: r.useful,
      easy: r.easy,
      liked: r.liked != null,
    },
    prof: r.prof ? r.prof.name : '',
  }));

  const reviewsByProf = data.prof_review.reduce((allProfs, current) => {
    let profObject;
    let foundProfObject = false;
    for (let i of allProfs) {
      if (current.prof && current.prof.name === i.prof) {
        profObject = i;
        foundProfObject = true;
        break;
      }
    }
    if (!foundProfObject) {
      profObject = {
        prof: current.prof ? current.prof.name : '',
        likes: current.prof
          ? current.prof.course_reviews_aggregate.aggregate.avg.liked / 5
          : 0,
        reviews: [],
      };
      allProfs.push(profObject);
    }
    profObject.reviews.push({
      upvotes: current.prof_review_votes_aggregate.aggregate.sum.vote,
      review: current.text,
      reviewer: current.user,
      metrics: {
        clear: current.clear,
        engaging: current.engaging,
      },
    });
    return allProfs;
  }, []);

  const ProfFilterDropdown = (
    <ProfDropdownPanelWrapper>
      <DropdownTableText>Filter by professor: </DropdownTableText>
      <DropdownList
        color={theme.professors}
        selectedIndex={profReviewFilter}
        options={['show all professors']}
        onChange={value => setProfReviewFilter(value)}
      />
    </ProfDropdownPanelWrapper>
  );

  const tabList = [
    {
      title: `Course reviews (${data.course_review_aggregate.aggregate.count})`,
      render: () =>
        CourseCourseReviews(
          courseReviews,
          theme,
          courseSort,
          setCourseSort,
          courseProfFilter,
          setCourseProfFilter,
        ),
      onClick: () => setShowingProfReviews(false),
    },
    {
      title: `Professor reviews (${data.prof_review_aggregate.aggregate.count})`,
      render: () => ProfFilterDropdown,
      onClick: () => setShowingProfReviews(true),
    },
  ];

  return (
    <CourseReviewWrapper>
      <TabContainer tabList={tabList} initialSelectedTab={0} />
      {showingProfReviews && CourseProfReviews(reviewsByProf)}
    </CourseReviewWrapper>
  );
};

CourseReviews.propTypes = {
  courseID: PropTypes.string.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withTheme(CourseReviews);
