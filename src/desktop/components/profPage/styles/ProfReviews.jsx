import styled from 'styled-components';
import {
  Heading2,
  Body,
  Heading4,
  Heading1,
  BoxShadow,
} from '../../../../constants/Mixins';

export const ProfCourseReviewWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const ReviewsForSingleCourseWrapper = styled.div`
  background-color: white;
  padding: 32px;
  margin-bottom: 32px;
  border-radius: 5px;
  ${BoxShadow}
`;

export const CourseRatings = styled.div`
  display: flex;
  flex-direction: column;
`;

export const CourseHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

export const CourseNameAndCode = styled.div`
  display: flex;
  flex-direction: column;
`;

export const CourseCode = styled.div`
  ${Heading1}
`;

export const CourseName = styled.div`
  ${Heading2}
`;

export const DropdownPanelWrapper = styled.div`
  display: flex;
  margin: 0 32px 32px 0;
  align-items: center;
`;

export const DropdownTableText = styled.div`
  ${Heading4}
`;

export const CourseLikedMetric = styled.div`
  display: flex;
  align-items: center;
`;

export const CourseLikedPercent = styled.div`
  ${Heading1}
`;

export const CourseLikedPercentLabel = styled.div`
  ${Body}
  width: 65px;
  margin-left: 12px;
`;
