import React, { useRef, useState } from 'react';
import FadeIn from 'react-fade-in';
import { DefaultTheme, useTheme } from 'styled-components';

import {
  AnnouncementBannerWrapper,
  AnnouncementLink,
  AnnouncementText,
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

const AnnouncementBanner = ({
  boldText,
  text,
  linkUrl,
  linkText = 'Learn more',
  id,
  onDismiss,
}: AnnouncementBannerProps) => {
  const theme: DefaultTheme = useTheme();

  const bannerRef = useRef<HTMLDivElement>(null);

  // Create a localStorage key based on the banner ID
  const localStorageKey = `banner-dismissed`;

  const [dismissed, setDismissed] = useState<boolean>(
    localStorage.getItem(localStorageKey) != null,
  );
  const handleDismiss = () => {
    setDismissed(true);
    localStorage.setItem(localStorageKey, 'true');
  };

  // If the banner is dismissed, we return null
  if (dismissed) {
    return null;
  }

  return (
    <FadeIn>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-evenly',
          alignItems: 'center',
          padding: '15px',
          backgroundColor: theme.accent,
        }}
      >
        <div style={{ textAlign: 'center', width: '90%' }}>
          <strong> UWFlow is open source! </strong> Check out the{' '}
          <a href="https://github.com/UWFlow/uwflow/releases/tag/v1.0.0">
            {' '}
            announcement here!{' '}
          </a>
        </div>
        <CloseButton onClick={handleDismiss}>x</CloseButton>
      </div>
    </FadeIn>
  );
};

export default AnnouncementBanner;
