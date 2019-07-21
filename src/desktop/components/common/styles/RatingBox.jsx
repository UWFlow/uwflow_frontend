import styled from 'styled-components';
import { Heading1, Small, Body, Link } from '../../../../constants/Mixins';

export const RatingBoxWrapper = styled.div`
  width: 500px;
  height: ${({ ratingBoxHeight }) => ratingBoxHeight}px;
  background-color: white;
  display: flex;
  border-radius: ${({ ratingBoxHeight }) => ratingBoxHeight / 2}px 5px 5px
    ${({ ratingBoxHeight }) => ratingBoxHeight / 2}px;
  justify-content: space-between;
  position: relative;
  box-shadow: 2px 2px 1px ${({ theme }) => theme.light3};
`;

export const LikesColumn = styled.div`
  margin: 16px;
  display: flex;
  flex-direction: column;
  position: relative;
`;

export const NumbersInCircle = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  bottom: 0;
  left: 0;
  height: ${({ ratingBoxHeight }) => ratingBoxHeight - 32}px;
  width: ${({ ratingBoxHeight }) => ratingBoxHeight - 32}px;
  justify-content: center;
  align-items: center;
`;

export const LargePercentage = styled.div`
  ${Heading1};
`;
export const GreyText = styled.div`
  color: ${({ theme }) => theme.dark2};
  ${Small};
`;

export const ProgressBarColumn = styled.div`
  margin: 16px 16px 16px 0;
  display: flex;
  flex-direction: column;
`;

export const ProgressWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 8px;
`;

export const ProgressTextLabel = styled.div``;

export const ProgressBarWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const ProgressNumberLabel = styled.div`
  ${Body};
  margin: 8px;
`;

export const NumReviewsAndRatingsWrapper = styled.div`
  display: flex;
  margin: 8px;
`;

export const NumReviewsWrapper = styled.div`
  ${Link};
  color: ${({ theme }) => theme.primary};
  text-decoration: underline;
  cursor: pointer;
`;

export const NumRatingsWrapper = styled.div`
  ${Body};
  margin-left: 24px;
`;
