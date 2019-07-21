import styled from 'styled-components';
import { Heading2, Body } from '../../../../constants/Mixins';

export const ProfCourseReviewWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const CourseInfoWrapper = styled.div`
  display: flex;
`;

export const CourseInfo = styled.div`
  display: flex;
  flex-direction: column;
`;
export const CourseRatingsWrapper = styled.div`
  display: flex;
`;

export const CourseLikes = styled.div`
  display: flex;
  flex-direction: column;
`;

export const CourseRatings = styled.div`
  display: flex;
  flex-direction: column;
`;

export const CourseHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const CourseName = styled.div`
  ${Heading2}
`;

export const CourseLikedMetric = styled.div`
  display: flex;
`;

export const CourseLikedPercent = styled.div`
  ${Heading2}
`;

export const CourseLikedPercentLabel = styled.div`
  ${Body}
`;
