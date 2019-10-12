import styled from 'styled-components';
import { BoxShadow, Body } from '../../../../constants/Mixins';

export const ReviewWrapper = styled.div`
  ${BoxShadow}
  padding:  16px;
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
  width: 70px;
  height: 70px;
  background-color: ${({ theme }) => theme.dark3};
  border-radius: 35px 35px 35px 35px;
  margin-right: 16px;
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
  padding-bottom: 4px;
`;

export const SingleMetricLabel = styled.td`
  ${Body}
  padding-bottom: 4px;
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
