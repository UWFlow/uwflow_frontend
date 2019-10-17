import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Heading2, Heading4, Body } from '../../../../constants/Mixins';

export const CourseReviewWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const CourseCourseReviewsWrapper = styled.div`
  background: white;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const ReviewsOptionsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 16px;
`;
export const DropdownPanelWrapper = styled.div`
  display: flex;
  :not(first-child) {
    margin-top: 24px;
  }
`;

export const DropdownTableText = styled.div`
  ${Heading4}
  white-space: nowrap;
`;

export const CourseProfReviewsWrapper = styled.div`
  background: white;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const ReviewsForSingleProfWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ProfName = styled(Link)`
  ${Heading2}
  color: ${({ theme }) => theme.professors}
  margin: 16px;
`;

export const ProfLikedMetric = styled.div`
  display: flex;
  margin: 8px 16px 16px 16px;
  align-items: center;
`;

export const ProfLikedPercent = styled.div`
  ${Heading2}
  margin-right: 16px;
`;

export const ProfLikedPercentLabel = styled.div`
  ${Body}
`;

export const ProfDropdownPanelWrapper = styled.div`
  display: flex;
  padding: 24px 16px;
  border-bottom: 2px solid ${({ theme }) => theme.light2};
`;
