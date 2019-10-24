import styled from 'styled-components';
import { Link } from 'react-router-dom';
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
  margin-bottom: 32px;
`;

export const DropdownTableText = styled.div`
  ${Heading4}
  white-space: nowrap;
`;

export const ReviewsForSingleCourseWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background: white;
  margin-bottom: 48px;
  ${BoxShadow}
`;

export const CourseCode = styled(Link)`
  ${Heading2}
  color: ${({ theme }) => theme.courses}
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

export const ShowMoreReviewsSection = styled.div`
  background: ${({ theme }) => theme.light3};
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 64px;
  cursor: pointer;
`;

export const ShowMoreReviewsText = styled.div`
  ${Heading4}
  cursor: pointer;
`;
