import styled from 'styled-components';
import { Link as RouterLink } from 'react-router-dom';
import breakpoint from 'styled-components-breakpoint';

import { Card, BoxShadow, Body, Link, Hover } from '../../../constants/Mixins';

export const ReviewWrapper = styled.div`
  ${BoxShadow}
  margin-bottom: 32px;
  background-color: ${({ theme }) => theme.light1};
  ${({ theme, isUserReview }) =>
    isUserReview ? `border: 2px solid ${theme.accent};` : ''}

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
  border-radius: 32px;
  background-color: ${({ theme }) => theme.light3};
  background-image: ${({ image }) => `url(${image})`};
  background-size: 64px;
  ${breakpoint('mobile', 'tablet')`
    margin-right: 8px;
  `};
`;

export const ReviewUpvotes = styled.button`
  padding: 0;
  width: 40px;
  height: 40px;
  background-color: ${({ selected, theme }) =>
    selected ? theme.primary : theme.light1};
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  border-radius: 20px 20px 20px 20px;
  border: 2px solid ${({ theme }) => theme.light3};
  cursor: pointer;
  ${Hover()}

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
  color: ${({ theme }) => theme.dark1};
  font-size: 15px;
`;

export const ReviewAuthor = styled.div`
  ${Body}
  font-style: italic;
  color: ${({ theme }) => theme.dark2};
  margin-top: 16px;
`;

export const ReviewMetricsWrapper = styled.table`
  min-width: 168px;
  margin-left: 16px;
`;

export const ReviewMetricsBody = styled.tbody`
  font-weight: 600;
  color: ${({ theme }) => theme.dark2};
`;

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

export const ProfText = styled(RouterLink)`
  color: ${({ theme }) => theme.professors};
  ${Link}
`;
