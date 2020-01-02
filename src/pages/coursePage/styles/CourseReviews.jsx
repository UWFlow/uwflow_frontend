import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';
import { Link } from 'react-router-dom';
import {
  Card,
  Heading1,
  Heading4,
  Heading2,
  Body,
  BoxShadow,
  Hover,
} from '../../../constants/Mixins';

export const CourseReviewWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const CourseCourseReviewsWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ReviewListWrapper = styled.div`
  ${breakpoint('tablet')`
    padding: 32px 32px 0 32px;
  `}
`;

export const ReviewsOptionsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 32px;

  ${breakpoint('mobile', 'tablet')`
    flex-direction: column;
    margin: 16px;
  `}
`;

export const DropdownPanelWrapper = styled.div`
  display: flex;
  margin-right: 32px;
  margin-bottom: 8px;
  align-items: center;

  ${breakpoint('mobile', 'tablet')`
    :last-child{
      margin-bottom: 16px;
    }
  `}
`;

export const ProfDropdownPanelWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 32px;

  ${breakpoint('mobile', 'tablet')`
    padding: 24px 16px;
    border-bottom: 1px solid ${({ theme }) => theme.light2};
    background-color: white;
  `}
`;

export const DropdownTableText = styled.div`
  ${Heading4}
  white-space: nowrap;
`;

export const CourseProfReviewsWrapper = styled.div`
  background: ${({ theme }) => theme.light1};
  color: ${({ theme }) => theme.dark2};
  width: 100%;
  display: flex;
  flex-direction: column;

  ${breakpoint('tablet')`
    margin-top: 32px;
  `}
`;

export const ReviewsForSingleProfWrapper = styled.div`
  ${Card('0')}
  ${BoxShadow}
  margin-bottom: 32px;
`;

export const ProfHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 24px;

  ${breakpoint('mobile', 'tablet')`
    flex-direction: column;
    justfiy-content: flex-start;
    align-items: flex-start;
    margin-bottom: 16px;
  `}
`;

export const ProfName = styled(Link)`
  ${Heading2}
  color: ${({ theme }) => theme.professors}

  ${breakpoint('mobile', 'tablet')`
    margin: 16px;
  `}
  ${Hover()}
`;

export const ProfLikedMetric = styled.div`
  display: flex;
  align-items: center;

  ${breakpoint('mobile', 'tablet')`
    margin: 8px 16px 16px 16px;
  `}
`;

export const ProfLikedPercent = styled.div`
  ${Heading1}

  ${breakpoint('mobile', 'tablet')`
    font-size: 32px;
  `}
`;

export const ProfLikedPercentLabel = styled.div`
  ${Body}
  width: 128px;
  margin-left: 12px;

  ${breakpoint('mobile', 'tablet')`
    width: 100%;
  `}
`;

export const ShowMoreReviewsSection = styled.button`
  background: ${({ theme }) => theme.light3};
  border: none;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 64px;
  cursor: pointer;
  border-radius: 0 0 4px 4px;
  ${Hover()}
`;

export const ShowMoreReviewsText = styled.div`
  ${Heading4}
  color: ${({ theme }) => theme.dark2};
  cursor: pointer;
`;
