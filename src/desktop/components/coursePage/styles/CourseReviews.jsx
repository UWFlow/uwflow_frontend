import styled from 'styled-components';
import { Heading4, Heading2, Body } from '../../../../constants/Mixins';

export const CourseReviewWrapper = styled.div``;

export const CourseCourseReviewsWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ReviewsOptionsWrapper = styled.div`
  display: flex;
`;

export const DropdownPanelWrapper = styled.div`
  display: flex;
  margin: 0 32px 32px 0;
  align-items: center;
`;

export const DropdownTableText = styled.div`
  ${Heading4}
`;

export const ProfHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const ProfName = styled.div`
  ${Heading2}
`;

export const ProfLikedMetric = styled.div`
  display: flex;
`;

export const ProfLikedPercent = styled.div`
  ${Heading2}
`;

export const ProfLikedPercentLabel = styled.div`
  ${Body}
`;
