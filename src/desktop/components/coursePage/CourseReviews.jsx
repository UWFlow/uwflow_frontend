import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import { withTheme } from 'styled-components';

/* Styled Components */
import {
  CourseReviewWrapper,
  CourseCourseReviewsWrapper,
  ReviewsOptionsWrapper,
  DropdownPanelWrapper,
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

const CourseCourseReviews = (reviews, theme) => {
  return (
    <CourseCourseReviewsWrapper>
      <ReviewsOptionsWrapper>
        <DropdownPanelWrapper>
          <DropdownTableText>Sort by: </DropdownTableText>
          <DropdownList
            color={theme.primary}
            selectedIndex={0}
            list={['most helpful']}
          />
        </DropdownPanelWrapper>
        <DropdownPanelWrapper>
          <DropdownTableText>Filter by professor: </DropdownTableText>
          <DropdownList
            color={theme.professors}
            selectedIndex={0}
            list={['show all professors']}
          />
        </DropdownPanelWrapper>
      </ReviewsOptionsWrapper>
      {reviews.map((review, ind) => {
        return (
          <Review
            key={review.reviewer.name}
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
  return reviewsByProf.map(curr => {
    return (
      <>
        <ProfHeader key={curr.prof}>
          <ProfName>{curr.prof}</ProfName>
          <ProfLikedMetric>
            <ProfLikedPercent>{Math.round(curr.likes * 100)}</ProfLikedPercent>
            <ProfLikedPercentLabel>liked this professor</ProfLikedPercentLabel>
          </ProfLikedMetric>
        </ProfHeader>
        {curr.reviews.map(review => {
          return (
            <Review
              key={review.reviewer.name}
              upvotes={review.upvotes}
              review={review.review}
              reviewer={review.reviewer}
              metrics={review.metrics}
            />
          );
        })}
      </>
    );
  });
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
  return (
    <CourseReviewWrapper>
      <Query query={GET_COURSE_REVIEW} variables={{ id: courseID }}>
        {({ loading, error, data }) => {
          if (loading) {
            return <div>Loading...</div>;
          }
          if (error) {
            return <div>Error</div>;
          }

          if (data.course_review.length === 0) {
            return <div>Course Doesn't Exist</div>;
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
            prof: r.prof.name,
          }));

          const reviewsByProf = data.prof_review.reduce((allProfs, current) => {
            let profObject;
            let foundProfObject = false;
            for (let i of allProfs) {
              if (current.prof.name === i.prof) {
                profObject = i;
                foundProfObject = true;
                break;
              }
            }
            if (!foundProfObject) {
              profObject = {
                prof: current.prof.name,
                likes:
                  current.prof.course_reviews_aggregate.aggregate.avg.liked / 5,
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

          const tabList = [
            {
              title: `Course reviews (${
                data.course_review_aggregate.aggregate.count
              })`,
              render: () => CourseCourseReviews(courseReviews, theme),
            },
            {
              title: `Professor reviews (${
                data.prof_review_aggregate.aggregate.count
              })`,
              render: () => CourseProfReviews(reviewsByProf),
            },
          ];

          return <TabContainer tabList={tabList} initialSelectedTab={0} />;
        }}
      </Query>
    </CourseReviewWrapper>
  );
};

CourseReviews.propTypes = {
  courseID: PropTypes.string.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withTheme(CourseReviews);
