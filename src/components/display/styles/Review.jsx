import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';
import { Card, BoxShadow, Body } from '../../../constants/Mixins';

export const ReviewWrapper = styled.div`
  ${BoxShadow}
  margin-bottom: 32px;
  background-color: ${({ theme }) => theme.light1};

  ${breakpoint('mobile', 'desktop')`
    padding: 16px;
    align-content: center;
  `}

  ${breakpoint('desktop')`
    ${Card('24px 32px')}
    margin-bottom: 32px;
    justify-content: space-between;
    flex-direction: row;
  `}
`;

export const ReviewPictureAndMetricsRow = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export const ReviewPictureAndUpvotesWrapper = styled.div`
  display: flex;
  margin-bottom: 32px;

  ${breakpoint('mobile', 'tablet')`
    align-items: center;
  `}

  ${breakpoint('tablet')`
    margin-right: 32px;
    position: relative;
  `}
`;

export const ReviewPicture = styled.div`
  width: 64px;
  height: 64px;
  background-color: ${({ theme }) => theme.dark3};
  border-radius: 32px 32px 32px 32px;

  ${breakpoint('mobile', 'tablet')`
    margin-right: 8px;
  `}
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
  cursor: pointer;

  &:hover {
    ${({ selected, theme }) =>
      `background-color:${selected ? theme.primaryDark : theme.light3};`}
  }

  ${breakpoint('tablet')`
    position: absolute;
    top: 36px;
    right: -16px;
    cursor: pointer;
  `}
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
  color: ${({ theme }) => theme.dark2};
  padding-left: 8px;
  vertical-align: top;
`;

export const UpvoteNumber = styled.div`
  ${Body}
  color: ${({ selected, theme }) => (selected ? 'white' : theme.dark3)}
  margin-left: 4px;
`;
