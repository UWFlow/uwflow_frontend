import styled from 'styled-components';
import { BoxShadow, Body } from '../../../../constants/Mixins';

export const ReviewWrapper = styled.div`
  display: flex;
  margin-bottom: 32px;
  background-color: ${({ theme }) => theme.light1};
  width: 100%;
  min-height: 150px;
  border-radius: 5px;
  ${BoxShadow}
  padding: 24px;
  justify-content: space-between;
`;

export const ReviewPictureWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  margin-right: 24px;
`;

export const ReviewPicture = styled.div`
  width: 70px;
  height: 100px;
  background-color: grey;
  border-radius: 5px 5px 0 0;
`;

export const ReviewUpvotes = styled.div`
  width: 70px;
  background-color: ${({ theme }) => theme.primary};
  display: flex;
  justify-content: center;
  color: white;
  border-radius: 0 0 5px 5px;
`;

export const ReviewTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;
  word-wrap: break-word;
`;

export const ReviewText = styled.div`
  ${Body}
`;

export const ReviewAuthor = styled.div`
  ${Body}
  color: ${({ theme }) => theme.dark1}
`;

export const ReviewMetricsWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const SingleMetricWrapper = styled.div`
  display: flex;
  align-content: center;
`;

export const SingleMetricLabel = styled.div`
  ${Body}
  margin-left: 4px;
`;
