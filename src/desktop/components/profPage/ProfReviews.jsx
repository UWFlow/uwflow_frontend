import React from 'react';
import PropTypes from 'prop-types';
import { useQuery } from 'react-apollo';
import { withTheme } from 'styled-components';

/* Styled Components */
import {
  ProfCourseReviewWrapper,
  ReviewsForSingleCourseWrapper,
  CourseHeader,
  CourseNameAndCode,
  CourseCode,
  CourseName,
  DropdownPanelWrapper,
  DropdownTableText,
  CourseLikedMetric,
  CourseLikedPercent,
  CourseLikedPercentLabel,
} from './styles/ProfReviews';

/* Child Components */
import Review from '../common/Review';
import DropdownList from '../common/dropdownList/DropdownList';

/* GraphQL Queries */
import { GET_PROF_REVIEW } from '../../../graphql/queries/prof/ProfReview.jsx';

const ProfReviews = ({ profID, theme }) => {
  const { loading, error, data } = useQuery(GET_PROF_REVIEW, {
    variables: { id: profID },
  });

  if (loading) {
    return (
      <ProfCourseReviewWrapper>
        <div>Loading ...</div>
      </ProfCourseReviewWrapper>
    );
  }
  console.log(data);

  const reviewsByCourse = data.prof_review.reduce((allCourses, current) => {
    let courseObject;
    let foundCourseObject = false;
    for (let i of allCourses) {
      if (current.course && current.course.id === i.courseID) {
        courseObject = i;
        foundCourseObject = true;
        break;
      }
    }
    if (!foundCourseObject) {
      courseObject = {
        course: current.course ? current.course.name : '',
        courseCode: current.course ? current.course.code : '',
        courseID: current.course ? current.course.id : -1,
        likes: current.course
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
    <ProfCourseReviewWrapper>
      {reviewsByCourse.map(curr => {
        return (
          <ReviewsForSingleCourseWrapper key={curr.courseID}>
            <CourseHeader key={curr.course}>
              <CourseNameAndCode>
                <CourseCode>
                  {curr.courseCode.charAt(0).toUpperCase() +
                    curr.courseCode.slice(1)}
                </CourseCode>
                <CourseName>{curr.course}</CourseName>
              </CourseNameAndCode>
              <CourseLikedMetric>
                <CourseLikedPercent>
                  {Math.round(curr.likes * 100)}%
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
                selectedIndex={0}
                options={['most helpful', 'most recent']}
              />
            </DropdownPanelWrapper>
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
          </ReviewsForSingleCourseWrapper>
        );
      })}
    </ProfCourseReviewWrapper>
  );
};

ProfReviews.propTypes = {
  profID: PropTypes.string.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withTheme(ProfReviews);
