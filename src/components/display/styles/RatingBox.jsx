import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';
import { Body, BoxShadow, Hover, Link } from 'constants/Mixins';

export const RatingBoxWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;

  ${breakpoint('tablet')`
    width: ${({ ratingBoxWidth }) => ratingBoxWidth}px;
    height: ${({ ratingBoxHeight }) => ratingBoxHeight}px;
    background-color: white;
    border-radius: ${({ ratingBoxHeight }) => ratingBoxHeight / 2}px 5px 5px
      ${({ ratingBoxHeight }) => ratingBoxHeight / 2}px;
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
  align-items: flex-begin;
  justify-content: center;
`;

export const ProgressWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 8px;

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
  display: flex;
`;

export const NumCommentsAndRatingsWrapper = styled.div`
  display: flex;
  margin: 8px;

  ${breakpoint('zero', 'desktop')`
    flex-direction: column;
    margin: 0 0 16px 0;
  `}
`;

export const NumCommentsWrapper = styled.a`
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
