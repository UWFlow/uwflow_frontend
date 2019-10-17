import styled from 'styled-components';
import { Card, BoxShadow, Body } from '../../../../constants/Mixins';

export const ReviewWrapper = styled.div`
  ${Card('24px 32px')}
  ${BoxShadow}
  margin-bottom: 32px;
  background-color: ${({ theme }) => theme.light1};
  justify-content: space-between;
  flex-direction: row;
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

export const ReviewMetricsWrapper = styled.table`
  min-width: 168px;
  margin-left: 16px;
`;

export const ReviewMetricsBody = styled.tbody``;

export const SingleMetricWrapper = styled.tr``;

export const SingleMetricSquares = styled.td`
  display: flex;
  justify-content: flex-end;
`;

export const SingleMetricLabel = styled.td`
  ${Body}
  color: ${({theme}) => theme.dark2};
  padding-left: 8px;
  vertical-align: top;
`;
