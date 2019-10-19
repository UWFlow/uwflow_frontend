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
  margin-bottom: 32px;
  margin-right: 32px;
  position: relative;
`;

export const ReviewPicture = styled.div`
  width: 64px;
  height: 64px;
  background-color: ${({ theme }) => theme.dark3};
  border-radius: 32px 32px 32px 32px;
`;

export const ReviewUpvotes = styled.div`
  position: absolute;
  top: 36px;
  right: -16px;
  width: 40px;
  height: 40px;
  ${({ selected, theme }) =>
    selected ? `background-color:${theme.primary};` : ''}
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  border-radius: 20px 20px 20px 20px;
  cursor: pointer;
  border: 2px solid ${({ theme }) => theme.light3};

  &:hover {
    ${({ selected, theme }) =>
      `background-color:${selected ? theme.primaryDark : theme.light3};`
  }
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

export const UpvoteNumber = styled.div`
  ${Body}
  color: ${({ selected, theme }) => (selected ? 'white' : theme.dark3)}
  margin-left: 4px;
`;
