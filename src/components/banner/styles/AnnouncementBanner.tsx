import styled from 'styled-components';

import { Body, Link } from 'constants/Mixins';

export const AnnouncementBannerWrapper = styled.div<{
  backgroundColor: string;
  isAnimatingOut: boolean;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;

  position: relative;
  z-index: 2;

  /* All of this is for animating the banner close upwards lmao */

  min-height: ${({ isAnimatingOut }) => (isAnimatingOut ? '0' : '48px')};
  padding: ${({ isAnimatingOut }) => (isAnimatingOut ? '0 24px' : '12px 24px')};
  background-color: ${({ backgroundColor }) => backgroundColor};
  height: ${({ isAnimatingOut }) => (isAnimatingOut ? '0' : 'auto')};
  opacity: ${({ isAnimatingOut }) => (isAnimatingOut ? '0' : '1')};
  overflow: hidden;
  transform: ${({ isAnimatingOut }) =>
    isAnimatingOut ? 'translateY(-100%)' : 'translateY(0)'};
  transform-origin: top;
  transition: height 300ms cubic-bezier(0.4, 0, 0.2, 1),
    opacity 250ms cubic-bezier(0.4, 0, 0.2, 1),
    padding 300ms cubic-bezier(0.4, 0, 0.2, 1),
    transform 300ms cubic-bezier(0.4, 0, 0.2, 1);

  @media only screen and (max-width: ${({ theme }) =>
      theme.breakpoints.tablet}px) {
    padding: ${({ isAnimatingOut }) =>
      isAnimatingOut ? '0 16px' : '12px 16px'};
    flex-direction: column;
  }
`;

export const AnnouncementText = styled.span<{
  textColor: string;
}>`
  ${Body}
  color: ${({ textColor }) => textColor};
  text-align: center;
  font-weight: 500;
  margin-right: 8px;
  
  @media only screen and (max-width: ${({ theme }) =>
    theme.breakpoints.tablet}px) {
    margin-right: 0;
    margin-bottom: 4px;
  }
`;

export const AnnouncementLink = styled.a<{
  linkColor: string;
}>`
  ${Link}
  color: ${({ linkColor }) => linkColor};
  white-space: nowrap;
`;

export const CloseButton = styled.button<{
  textColor: string;
}>`
  background: none;
  border: none;
  color: ${({ textColor }) => textColor};
  cursor: pointer;
  font-size: 16px;
  margin-left: 12px;
  opacity: 0.7;
  padding: 0;
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 1;
  }

  @media only screen and (max-width: ${({ theme }) =>
      theme.breakpoints.tablet}px) {
    position: static;
    transform: none;
    margin-top: 8px;
    margin-left: 0;
  }
`;
