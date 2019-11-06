import styled from 'styled-components';
import { Link } from 'react-router-dom';
import {
  Card,
  Heading1,
  Heading4,
  Heading2,
  Body,
  BoxShadow,
} from '../../../constants/Mixins';

export const CourseReviewWrapper = styled.div``;

export const ReviewWithButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const CourseCourseReviewsWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const CourseProfReviewsWrapper = styled.div`
  padding-top: 12px;
`;

export const ReviewsForSingleProfWrapper = styled.div`
  ${Card('0')}
  ${BoxShadow}
  margin-bottom: 32px;
`;

export const ReviewListWrapper = styled.div`
  padding: 32px 32px 0 32px;
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
  padding: 32px;
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

export const ProfName = styled(Link)`
  ${Heading2}
  color: ${({ theme }) => theme.professors}
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
  width: 64px;
  margin-left: 12px;
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
