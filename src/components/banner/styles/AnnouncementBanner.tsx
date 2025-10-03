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

  z-index: 2;
  min-height: 48px;
  padding: 12px 24px;
  background-color: ${({ backgroundColor }) => backgroundColor};
  overflow: hidden;
  transform-origin: top;
`;

export const AnnouncementText = styled.span<{
  textColor: string;
}>`
  ${Body}
  color: ${({ textColor }) => textColor};
  text-align: center;
  font-weight: 500;
  margin-right: 4px;
  
  @media only screen and (max-width: ${({ theme }) =>
    theme.breakpoints.tablet}px) {
    margin-right: 0;
    margin-bottom: 4px;
  }
`;

export const BoldAnnouncementText = styled(AnnouncementText)`
  font-weight: 700;
`;

export const AnnouncementLink = styled.a<{
  linkColor: string;
}>`
  ${Link}
  margin-top: 1px;
  color: ${({ linkColor }) => linkColor};
  white-space: nowrap;
`;

export const CloseButton = styled.button`
  background: none;
  color: ${({ theme }) => theme.dark1};
  border: none;
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
