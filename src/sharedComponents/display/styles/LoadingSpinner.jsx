import styled, { keyframes } from 'styled-components';

const RotateAnimation = keyframes`
  100% {
    transform: rotate(360deg);
  }
`;

const DashAnimation = keyframes`
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -32px;
  }
  100% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -100px;
  }
`;

export const LoadingSpinnerWrapper = styled.div`
  position: relative;
  margin: ${({ margin }) => margin};
  width: 48px;
  height: 48px;
  content: '';
`;

export const CircularSvg = styled.svg`
  animation: ${RotateAnimation} 2s linear infinite;
  height: 48px;
  width: 48px;
  transform-origin: center center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
`;

export const CircleSvgPath = styled.circle`
  stroke-dasharray: 1, 200;
  stroke-dashoffset: 0;
  animation: ${DashAnimation} 2.5s ease-in-out infinite;
  stroke-linecap: square;
  stroke-width: 4px;
  stroke: ${({ theme }) => theme.primary};
  z-index: 5
`;


export const CircleSvgGrey = styled.circle`
  stroke-width: 4px;
  stroke: ${({ theme }) => theme.light4};
  z-index: 2;
`;