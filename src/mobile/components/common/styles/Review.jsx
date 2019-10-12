import styled from 'styled-components';
import { Card, BoxShadow, Body } from '../../../../constants/Mixins';

export const ReviewWrapper = styled.div`
  ${Card('24px 32px')}
  ${BoxShadow}
  margin-bottom: 32px;
  background-color: ${({ theme }) => theme.light1};
  align-content: center;
`;

export const ReviewPictureAndMetricsRow = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const ReviewPictureWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  margin-right: 24px;
`;

export const ReviewPicture = styled.div`
  width: 80px;
  height: 112px;
  background-color: ${({ theme }) => theme.light3};
  border-radius: 4px 4px 0 0;
`;

export const ReviewUpvotes = styled.div`
  width: 80px;
  background-color: ${({ theme }) => theme.primary};
  display: flex;
  justify-content: center;
  color: white;
  border-radius: 0 0 4px 4px;
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
