import styled from 'styled-components';
import { Body, BoxShadow } from '../../../../constants/Mixins';
import { PAGE_CONTENT_WIDTH } from '../../../../constants/PageConstants';

export const RatingBoxWrapper = styled.div`
  width: ${({ ratingBoxWidth }) => ratingBoxWidth}px;
  height: ${({ ratingBoxHeight }) => ratingBoxHeight}px;
  background-color: white;
  display: flex;
  border-radius: ${({ ratingBoxHeight }) => ratingBoxHeight / 2}px 5px 5px
    ${({ ratingBoxHeight }) => ratingBoxHeight / 2}px;
  justify-content: space-between;
  position: relative;
  ${BoxShadow}

  @media only screen and (max-width: ${PAGE_CONTENT_WIDTH + 32}px) {
    margin-right: 32px;
  }
`;

export const LikesColumn = styled.div`
  margin: 16px;
  display: flex;
  flex-direction: column;
  position: relative;
`;

export const ProgressBarColumn = styled.div`
  margin: 16px 0 16px 16px;
  display: flex;
  flex-direction: column;
`;

export const ProgressBarColumnWrapper = styled.div`
  margin: auto;
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

export const NumCommentsAndRatingsWrapper = styled.div`
  display: flex;
  margin: 8px;
`;

export const NumCommentsWrapper = styled.div`
  ${Body};
  color: ${({ theme }) => theme.dark3};
`;

export const NumRatingsWrapper = styled.div`
  ${Body};
  margin-left: 24px;
  color: ${({ theme }) => theme.dark3};
`;
