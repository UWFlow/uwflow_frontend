import styled from 'styled-components';
import {
  Heading2,
  Heading4,
  Body,
  BoxShadow,
} from '../../../../constants/Mixins';

export const ProfCourseReviewWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const DropdownPanelWrapper = styled.div`
  display: flex;
  padding: 16px;
  background: white;
  ${BoxShadow}
  margin-bottom: 16px;
`;

export const DropdownTableText = styled.div`
  ${Heading4}
  white-space: nowrap;
`;

export const ReviewsForSingleCourseWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background: white;
  margin-bottom: 16px;
`;

export const CourseCode = styled.div`
  ${Heading2}
  color: ${({ theme }) => theme.professors}
  margin: 16px;
`;

export const CourseLikedMetric = styled.div`
  display: flex;
  margin: 8px 16px 16px 16px;
  align-items: center;
`;

export const CourseLikedPercent = styled.div`
  ${Heading2}
  margin-right: 16px;
`;

export const CourseLikedPercentLabel = styled.div`
  ${Body}
`;

export const ProfDropdownPanelWrapper = styled.div`
  display: flex;
  padding: 24px 16px;
  border-bottom: 2px solid ${({ theme }) => theme.light2};
`;
