import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';

import { Body, BoxShadow, Hover, Link } from 'constants/Mixins';

type RatingBoxWidth = {
  ratingBoxWidth: number;
};

type RatingBoxHeight = {
  ratingBoxHeight: number;
};

export const RatingBoxWrapper = styled.div<{
  ratingBoxWidth: number;
  ratingBoxHeight: number;
}>`
  width: 100%;
  display: flex;
  justify-content: space-between;
  height: 100%;
  margin-right: 32px;

  ${breakpoint('tablet')`
    width: ${({ ratingBoxWidth }: RatingBoxWidth) => ratingBoxWidth}px;
    background-color: white;
    border-radius: ${({ ratingBoxHeight }: RatingBoxHeight) =>
      ratingBoxHeight / 2}px 5px 5px
      ${({ ratingBoxHeight }: RatingBoxHeight) => ratingBoxHeight / 2}px;
    position: relative;
    ${BoxShadow}
    margin-right: 32px;
  `}
`;

export const CircularPercentageWrapper = styled.div`
  padding: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const RatingBarsColumn = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  margin: 8px;
  align-items: center;

  ${breakpoint('tablet')`
    align-items: flex-start;
  `}
`;

export const ProgressWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0px;
  width: 80%;

  &:first-child {
    margin-top: 13px;
  }

  ${breakpoint('tablet')`
    width: 100%;
    margin: 0;
  `}

  ${breakpoint('zero', 'desktop')`
  `}
`;

export const ProgressTextLabel = styled.div``;

export const ProgressBarWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const ProgressNumberLabel = styled.div`
  ${Body};
  margin-right: 8px;
  text-wrap: wrap;
  width: 5%;
  color: ${({ theme }) => theme.dark3};
`;

export const ReviewsAndGraphButtonWrapper = styled.div`
  justify-content: center;
`;

export const NumCommentsAndRatingsWrapper = styled.div`
  display: flex;
  margin: 8px;

  ${breakpoint('zero', 'desktop')`
    flex-direction: column;
    margin: 0 0 16px 0;
  `}
`;

export const NumCommentsWrapper = styled.a<{ hasComments: boolean }>`
  background: none;
  border: none;
  padding: 0;

  ${({ hasComments }) =>
    hasComments
      ? `
    text-decoration: underline;
    cursor: pointer;
    ${Hover(true)}
    ${Link}
  `
      : `
    ${Body}
  `};
  color: ${({ hasComments, theme }) =>
    hasComments ? theme.primary : theme.dark3};
`;

export const NumRatingsWrapper = styled.div`
  ${Body};
  color: ${({ theme }) => theme.dark3};

  ${breakpoint('desktop')`
    margin-left: 24px;
  `}
`;

export const MetricHeader = styled.div`
  display: flex;
  align-items: baseline;
  margin-bottom: 16px;
`;

export const ProgressPercentage = styled.div`
  ${Body}
  width: 48px;
  text-align: right;
  color: ${({ theme }) => theme.dark2};
`;

export const MetricsRow = styled.div`
  display: flex;
  margin: 8px;
  width: 100%;
  justify-content: space-evenly;

  ${breakpoint('tablet')`
    gap: 32px;
    justify-content: flex-start;
  `}
`;

export const MetricBox = styled.div`
  flex-direction: column;
  align-items: flex-start;
  align-items: center;
`;

export const MetricValue = styled.div`
  color: ${({ theme }) => theme.dark1};
  font-size: min(32px, 6vw);
  font-weight: 700;
  text-align: center;
  ${breakpoint('tablet')`
    text-align: left;
  `}
`;

export const MetricLabel = styled.div`
  ${Body}
  font-size: min(16px, 3.5vw);
  color: ${({ theme }) => theme.dark2};
`;

export const MetricsRowWrapper = styled.div`
  width: 100%;
`;

export const FilterWrapper = styled.div`
  display: flex;
  align-items: center;
  ${Body};
  margin-top: 15px;
  text-wrap: wrap;
  color: ${({ theme }) => theme.dark3};
  ${breakpoint('zero', 'mobileLarge')`
    margin-top: 10px;
    flex-direction: column;
    align-items: flex-start;
  `}
`;

export const RatingDistributionToggle = styled.div`
  text-decoration: underline;
  cursor: pointer;
  ${Hover(true)}
  ${Link}
  color: ${({ theme }) => theme.primary};
`;
