import styled, { keyframes } from 'styled-components';

const dash = keyframes`
  from {
    stroke-dashoffset: 1000;
  }
  to {
    stroke-dashoffset: 0;
  }
`;

export const Path = styled.path`
  stroke-dasharray: ${({ start }) => start};
  stroke-dashoffset: 400;
  animation: ${dash} 2s linear normal infinite;
`;
