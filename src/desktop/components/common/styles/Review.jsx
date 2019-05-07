import styled from 'styled-components';

export const ReviewWrapper = styled.div`
  display: flex;
  margin: 8px 16px;
  background-color: ${({ theme }) => theme.light3};
  width: 400px;
  height: 100px;
`;

export const ReviewTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ReviewMetricsWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
