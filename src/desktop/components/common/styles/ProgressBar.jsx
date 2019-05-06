import styled from 'styled-components';

export const ProgressBarWrapper = styled.div`
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  display: flex;
  margin-right: 8px;
`;

export const Complete = styled.span`
  width: ${({ width }) => width}%;
  height: 100%;
  background-color: ${({ theme }) => theme.green};
`;

export const Incomplete = styled.span`
  width: ${({ width }) => width}%;
  height: 100%;
  background-color: ${({ theme }) => theme.light3};
`;
