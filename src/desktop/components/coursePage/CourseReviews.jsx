import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';

/* Styled Components */
import {
  CourseReviewWrapper,
  CourseCourseReviewsWrapper,
  ReviewsOptionsWrapper,
  DropdownPanelWrapper,
  DropdownTableText,
} from './styles/CourseReviews';

/* Child Components */
import TabContainer from '../common/TabContainer';
import Review from '../common/Review';
import DropdownList from '../common/dropdownList/DropdownList';

/* GraphQL Queries */
import { GET_COURSE_REVIEW } from '../../../graphql/queries/course/CourseReview.jsx';

const CourseCourseReviews = reviews => {
  return (
    <CourseCourseReviewsWrapper>
      <ReviewsOptionsWrapper>
        <DropdownPanelWrapper>
          <DropdownTableText>Sort by: </DropdownTableText>
          <DropdownList selectedIndex={0} list={['most helpful']} />
        </DropdownPanelWrapper>
        <DropdownPanelWrapper>
          <DropdownTableText>Filter by professor: </DropdownTableText>
          <DropdownList selectedIndex={0} list={['show all professors']} />
        </DropdownPanelWrapper>
      </ReviewsOptionsWrapper>
      {reviews.map((review, ind) => {
        return (
          <Review
            key={review.reviewer}
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
      reviewer: PropTypes.object,
      metrics: PropTypes.arrayOf(
        PropTypes.shape({
          useful: PropTypes.number,
          easy: PropTypes.number,
          liked: PropTypes.boolean,
        }),
      ),
    }),
  ),
};

const CourseReviews = ({ courseID }) => {
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
          console.log(data);

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

          const tabList = [
            { title: `Course reviews (${666})`, render: () => <div /> },
            { title: `Professor reviews (${666})`, render: () => <div /> },
          ];

          return <TabContainer tabList={tabList} initialSelectedTab={0} />;
        }}
      </Query>
    </CourseReviewWrapper>
  );
};

CourseReviews.propTypes = {
  courseID: PropTypes.number,
};

export default CourseReviews;
