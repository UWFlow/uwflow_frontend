import styled from 'styled-components';
import { Heading2, Body, Heading4 } from '../../../../constants/Mixins';

export const ProfCourseReviewWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
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
`;

export const CourseLikedPercent = styled.div`
  ${Heading2}
`;

export const CourseLikedPercentLabel = styled.div`
  ${Body}
`;
