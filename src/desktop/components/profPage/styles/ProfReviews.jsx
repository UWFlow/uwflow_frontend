import styled from 'styled-components';
import { Link } from 'react-router-dom';

import {
  Card,
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
  color: ${({ theme }) => theme.dark2};
`;

export const ProfCourseFilterWrapper = styled.div`
  ${Card()}
  ${BoxShadow}
  padding-bottom: 0;
  padding-top: 16px;
  margin-bottom: 32px;
`;

export const ReviewsForSingleCourseWrapper = styled.div`
  ${Card()}
  ${BoxShadow}
  padding-bottom: 0;
  margin-bottom: 32px;
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
