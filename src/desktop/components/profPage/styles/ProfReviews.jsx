import styled from 'styled-components';
import { Link } from 'react-router-dom';

import {
  Card,
  Heading2,
  Body,
  Heading4,
  Heading1,
  BoxShadow,
  Heading3,
} from '../../../../constants/Mixins';

export const ProfCourseReviewWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  color: ${({ theme }) => theme.dark2};
`;

export const ProfCourseFilterWrapper = styled.div`
  ${Card()}
  ${BoxShadow}
  padding-bottom: 0;
  padding-top: 16px;
  margin-bottom: 32px;
`;

export const NoReviewsBox = styled.div`
  display: flex;
  padding: 32px;
  background: white;
  align-items: center;
  justify-content: flex-start;
  ${Heading3}
  color: ${({ theme }) => theme.dark2}
`;

export const ReviewsForSingleCourseWrapper = styled.div`
  ${Card('0')}
  ${BoxShadow}
  padding-bottom: 0;
  margin-bottom: 32px;
`;

export const ReviewListWrapper = styled.div`
  padding: 32px 32px 0 32px;
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
  margin-right: 24px;
`;

export const CourseNameAndCode = styled.div`
  display: flex;
  flex-direction: column;
`;

export const CourseCode = styled(Link)`
  ${Heading2}
  color: ${({ theme }) => theme.courses};
  margin-bottom: 16px;
`;

export const CourseName = styled.div`
  ${Heading2}
  font-size: 24px;
`;

export const DropdownPanelWrapper = styled.div`
  display: flex;
  margin: 16px 32px 32px 0;
  align-items: center;
`;

export const DropdownTableText = styled.div`
  ${Heading4}
  color: ${({ theme }) => theme.dark1};
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
  width: 64px;
  margin-left: 16px;
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
