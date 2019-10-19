import styled from 'styled-components';
import { BoxShadow, Body } from '../../../../constants/Mixins';

export const ReviewWrapper = styled.div`
  ${BoxShadow}
  padding: 16px;
  margin-bottom: 32px;
  background-color: ${({ theme }) => theme.light1};
  align-content: center;
`;

export const ReviewPictureAndMetricsRow = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const ReviewPictureAndUpvotesWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 32px;
`;

export const ReviewPicture = styled.div`
  width: 64px;
  height: 64px;
  background-color: ${({ theme }) => theme.dark3};
  border-radius: 32px 32px 32px 32px;
  margin-right: 16px;

  @media only screen and (max-width: 320px) {
    margin-right: 8px
  }
`;

export const ReviewUpvotes = styled.div`
  width: 40px;
  height: 40px;
  ${({ selected, theme }) =>
    selected ? `background-color:${theme.primary};` : ''}
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  border-radius: 20px 20px 20px 20px;
  border: 2px solid ${({ theme }) => theme.light3};
`;

export const UpvoteNumber = styled.div`
  ${Body}
  color: ${({ selected, theme }) => (selected ? 'white' : theme.dark3)}
  margin-left: 4px;
`;

export const ReviewMetricsWrapper = styled.table`
  min-width: 158px;
  margin-left: 8px;
`;

export const ReviewMetricsBody = styled.tbody``;

export const SingleMetricWrapper = styled.tr``;

export const SingleMetricSquares = styled.td`
  display: flex;
  justify-content: flex-end;
`;

export const SingleMetricLabel = styled.td`
  ${Body}
  vertical-align: top;
`;

export const ReviewTextWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  word-wrap: break-word;
`;

export const ReviewText = styled.div`
  word-break: break-word;
  ${Body}
`;

export const ReviewAuthor = styled.div`
  ${Body}
  margin-top: 16px;
  color: ${({ theme }) => theme.dark1};
`;
