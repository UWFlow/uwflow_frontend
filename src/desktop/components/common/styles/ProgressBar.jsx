import styled from 'styled-components';

export const ProgressBarWrapper = styled.div`
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  display: flex;
  margin: 10px 8px 10px 0;
  border: 2px solid ${({ theme }) => theme.light3};
  border-radius: 4px;
  box-shadow:
    0px 2px 5px rgba(236, 237, 237, 0.5),
    0px 0px 5px rgba(142, 147, 148, 0.2);
`;

export const Complete = styled.span`
  border-radius: ${({ width }) => width >= 100 ? '2px' : '2px 0 0 2px' };
  width: ${({ width }) => width}%;
  height: 100%;
  background-color: ${({ theme, width }) => {
    if (width < 30) {
      return theme.low;
    } else if (width < 60) {
      return theme.medium;
    } else {
      return theme.high;
    }
  }};
`;

export const Incomplete = styled.span`
  border-radius: ${({ width }) => width >= 100 ? '2px' : '0 2px 2px 0' };
  width: ${({ width }) => width}%;
  height: 100%;
  background-color: ${({ theme }) => theme.light2};
`;
