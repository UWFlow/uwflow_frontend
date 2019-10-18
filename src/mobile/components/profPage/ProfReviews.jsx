import React, { useState } from 'react';
import { useQuery } from 'react-apollo';
import PropTypes from 'prop-types';
import { withTheme } from 'styled-components';

/* GraphQL Queries */
import { GET_PROF_REVIEW } from '../../../graphql/queries/prof/ProfReview.jsx';

/* Styled Components */
import {
  ProfCourseReviewWrapper,
  DropdownPanelWrapper,
  DropdownTableText,
  ReviewsForSingleCourseWrapper,
  CourseCode,
  CourseLikedMetric,
  CourseLikedPercent,
  CourseLikedPercentLabel,
} from './styles/ProfReviews';

/* Child Components */
import DropdownList from '../../../basicComponents/DropdownList.jsx';
import Review from '../common/Review.jsx';
import LoadingSpinner from '../../../basicComponents/LoadingSpinner.jsx';

import { splitCourseCode } from '../../../utils/Misc';

const ProfReviews = ({ profID, theme }) => {
  const [selectedSort, setSelectedSort] = useState(0);
  const { loading, data } = useQuery(GET_PROF_REVIEW, {
    variables: { id: profID },
  });

  if (loading) {
    return (
      <ProfCourseReviewWrapper>
        <LoadingSpinner />
      </ProfCourseReviewWrapper>
    );
  }

  const reviewsByCourse = data.prof_review.reduce((allCourses, current) => {
    let courseObject;
    let foundCourseObject = false;
    for (let i of allCourses) {
      if (current.course && current.course.id === i.id) {
        courseObject = i;
        foundCourseObject = true;
        break;
      }
    }
    if (!foundCourseObject) {
      courseObject = {
        id: current.course ? current.course.id : -1,
        name: current.course ? current.course.name : '',
        code: current.course ? current.course.code : '',
        liked: current.course
          ? current.course.course_reviews_aggregate.aggregate.avg.liked / 5
          : 0,
        reviews: [],
      };
      allCourses.push(courseObject);
    }
    courseObject.reviews.push({
      upvotes: current.prof_review_votes_aggregate.aggregate.sum.vote,
      review: current.text,
      reviewer: current.user,
      metrics: {
        clear: current.clear,
        engaging: current.engaging,
      },
    });
    return allCourses;
  }, []);

  return (
    <>
      <DropdownPanelWrapper>
        <DropdownTableText>Filter by course: </DropdownTableText>
        <DropdownList
          color={theme.primary}
          selectedIndex={selectedSort}
          options={['show all courses']}
          onChange={value => setSelectedSort(value)}
        />
      </DropdownPanelWrapper>
      <ProfCourseReviewWrapper>
        {reviewsByCourse.map((course, idx) => {
          return (
            <ReviewsForSingleCourseWrapper key={idx}>
              <CourseCode to={`/course/${course.code}`}>
                {splitCourseCode(course.code)}
              </CourseCode>
              <CourseLikedMetric>
                <CourseLikedPercent>
                  {Math.round(course.liked * 100)}%
                </CourseLikedPercent>
                <CourseLikedPercentLabel>
                  liked this course
                </CourseLikedPercentLabel>
              </CourseLikedMetric>
              {course.reviews.map(review => {
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
            </ReviewsForSingleCourseWrapper>
          );
        })}
      </ProfCourseReviewWrapper>
    </>
  );
};

ProfReviews.propTypes = {
  profID: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  theme: PropTypes.object.isRequired,
};

export default withTheme(ProfReviews);
