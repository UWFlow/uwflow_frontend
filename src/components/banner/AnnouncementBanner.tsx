import React, { useRef, useState } from 'react';
import FadeIn from 'react-fade-in';
import { DefaultTheme, useTheme } from 'styled-components';

import {
  AnnouncementBannerWrapper,
  AnnouncementLink,
  AnnouncementText,
  BoldAnnouncementText,
  CloseButton,
} from './styles/AnnouncementBanner';

export type AnnouncementType = 'default' | 'success' | 'warning' | 'info';

type AnnouncementBannerProps = {
  /**
   * First bold text to display in the announcement banner
   */
  boldText: string;
  /**
   * The text to display in the announcement banner
   */
  text: string;
  /**
   * URL to direct users when clicking the link
   */
  linkUrl?: string;
  /**
   * Text for the link
   * Defaults to "Learn more"
   */
  linkText?: string;
  /**
   * The type of announcement banner to display
   * Defaults to 'default'
   */
  type?: AnnouncementType;
  /**
   * The ID of the announcement banner
   */
  id: string;
  /**
   * Custom text color for the banner
   * Defaults to theme.dark1
   */
  textColor?: string;
  onDismiss?: () => void;
};

const useAnnouncementTheme = (
  type: AnnouncementType,
): { backgroundColor: string; textColor: string; linkColor: string } => {
  const theme = useTheme();
  let themeColor;
  let textColor;
  let linkColor: string;

  switch (type) {
    case 'success':
      themeColor = theme.announcementSuccess;
      linkColor = theme.white;
      textColor = theme.white;
      break;
    case 'warning':
      themeColor = theme.announcementWarning;
      linkColor = theme.white;
      textColor = theme.white;
      break;
    default:
      themeColor = theme.announcement;
      linkColor = theme.primary;
      textColor = theme.dark1;
      break;
  }

  return { backgroundColor: themeColor, textColor, linkColor };
};

const AnnouncementBanner = ({
  boldText,
  text,
  linkUrl,
  linkText = 'Learn more',
  type = 'default',
  id,
  onDismiss,
}: AnnouncementBannerProps) => {
  const { backgroundColor, textColor, linkColor } = useAnnouncementTheme(type);

  const [isAnimatingOut, setIsAnimatingOut] = useState(false);

  const bannerRef = useRef<HTMLDivElement>(null);

  // Create a localStorage key based on the banner ID
  const localStorageKey = `banner-dismissed-${id}`;

  const [dismissed, setDismissed] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false; // SSR / Jest
    return localStorage.getItem(localStorageKey) === 'true';
  });

  const handleDismiss = () => {
    // Start the animation
    setIsAnimatingOut(true);
    // Wait for animation to complete before removing from DOM
    setTimeout(() => {
      // Call the onDismiss callback if provided
      if (onDismiss) {
        onDismiss();
      }
      setDismissed(true);
      localStorage.setItem(localStorageKey, 'true');
    }, 300); // Matched to the animation duration
  };

  // If the banner is dismissed, we return null
  if (dismissed) {
    return null;
  }

  return (
    <FadeIn>
      <AnnouncementBannerWrapper
        backgroundColor={backgroundColor}
        ref={bannerRef}
        isAnimatingOut={isAnimatingOut}
      >
        <AnnouncementText textColor={textColor}>
          <strong>{boldText}</strong>
          {text}
        </AnnouncementText>
        {linkUrl && (
          <AnnouncementLink
            linkColor={linkColor}
            href={linkUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {linkText}
          </AnnouncementLink>
        )}
        <CloseButton onClick={() => handleDismiss()} textColor={textColor}>
          ✕
        </CloseButton>
      </AnnouncementBannerWrapper>
    </FadeIn>
  );
};

export default AnnouncementBanner;
