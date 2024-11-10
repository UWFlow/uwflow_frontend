import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';

import { Body, BoxShadow, Hover, Link } from 'constants/Mixins';
import { RATING_BOX_OFFSET } from 'constants/PageConstants';

type RatingBoxWidth = {
  ratingBoxWidth: number;
};

type RatingBoxHeight = {
  ratingBoxHeight: number;
};

// RatingBoxWrapper is the parent contianer for the RatingBox and the DistributionGraph dropdown
export const RatingBoxWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: flex-end;
`;

// RatingBoxContainer is a parent container that allows the rating box to "float" above content
// It has a height of the rating box offset by 150px and a relative position so that its child, RatingBoxContent, can be positioned absolutely
export const RatingBoxContainer = styled.div<{
  ratingBoxHeight: number;
}>`
  width: 100%;

  ${breakpoint('tablet')`
  position: relative;
  overflow: visible;
  height: ${({ ratingBoxHeight }: RatingBoxHeight) =>
    ratingBoxHeight - RATING_BOX_OFFSET}px;
  `}
`;

export const RatingBoxContent = styled.div<{
  ratingBoxWidth: number;
  ratingBoxHeight: number;
}>`
  width: 100%;
  display: flex;
  justify-content: space-between;

  ${breakpoint('tablet')`
    width: ${({ ratingBoxWidth }: RatingBoxWidth) => ratingBoxWidth}px;
    background-color: white;
    border-radius: ${({ ratingBoxHeight }: RatingBoxHeight) =>
      ratingBoxHeight / 2}px 5px 5px
      ${({ ratingBoxHeight }: RatingBoxHeight) => ratingBoxHeight / 2}px;
    position: relative;
    transform: translateY(-${RATING_BOX_OFFSET}px) scaleY(1);
    ${BoxShadow}
  `}


  // slightly jank solution: at the point between tablet and desktop, we need to push the rating box up a little more 
  // because the NumCommentsAndRatingsWrapper changes to a flex-direction: column 
  ${breakpoint('tablet', 'desktop')`
    transform: translateY(-${RATING_BOX_OFFSET + 40}px) scaleY(1);
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
  margin-top: 24px;
  align-items: center;

  ${breakpoint('tablet')`
    align-items: flex-start;
    margin-top: 40px;
    margin-bottom: 50px;
  `}
`;

export const RatingBarsColumnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const ProgressWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0px;
  width: 100%;

  &:first-child {
    margin-top: 16px;
  }

  ${breakpoint('zero', 'desktop')`
    margin: 0 8px 8px 0;
  `}
`;

export const ProgressTextLabel = styled.div``;

export const ProgressBarWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const ProgressNumberLabel = styled.div`
  ${Body};
  margin: 8px;
  flex: none;
`;

export const ReviewsAndGraphButtonWrapper = styled.div`
  justify-content: center;
  width: 100%;
`;

export const NumCommentsAndRatingsWrapper = styled.div`
  display: flex;

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

export const FilterWrapper = styled.div`
  display: flex;
  align-items: center;
  ${Body};
  margin-top: 15px;
  text-wrap: wrap;
  color: ${({ theme }) => theme.dark3};
  ${breakpoint('zero', 'mobileLarge')`
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

export const ProgressLabel = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;

export const DistributionIcon = styled.div<{
  borderColor: string;
  color: string;
}>`
  display: flex;
  cursor: pointer;
  align-items: center;
  border-style: solid;
  margin-left: 8px;
  border-radius: 4px;
  border-width: 2px;
  border-color: ${({ borderColor }) => borderColor};
  color: ${({ borderColor }) => borderColor};

  background-color: ${({ color }) => color};
`;
