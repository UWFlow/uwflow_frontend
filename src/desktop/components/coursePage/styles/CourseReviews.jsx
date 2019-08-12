import styled from 'styled-components';
import {
  Card,
  Heading1,
  Heading4,
  Heading2,
  Body,
  BoxShadow,
} from '../../../../constants/Mixins';

export const CourseReviewWrapper = styled.div``;

export const CourseCourseReviewsWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const CourseProfReviewsWrapper = styled.div`
  padding-top: 12px;
`;

export const ReviewsForSingleProfWrapper = styled.div`
  ${Card()}
  ${BoxShadow}
  margin-bottom: 32px;
`;

export const ReviewsOptionsWrapper = styled.div`
  display: flex;
`;

export const DropdownPanelWrapper = styled.div`
  display: flex;
  margin: 0 32px 32px 0;
  align-items: center;
`;

export const ProfDropdownPanelWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const DropdownTableText = styled.div`
  ${Heading4}
`;

export const ProfHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 32px;
  align-items: center;
`;

export const ProfName = styled.div`
  ${Heading2}
`;

export const ProfLikedMetric = styled.div`
  display: flex;
  align-items: center;
`;

export const ProfLikedPercent = styled.div`
  ${Heading1}
`;

export const ProfLikedPercentLabel = styled.div`
  ${Body}
  width: 65px;
  margin-left: 12px;
`;
