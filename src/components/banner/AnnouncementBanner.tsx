import React, { useRef, useState } from 'react';
import FadeIn from 'react-fade-in';
import { DefaultTheme, useTheme } from 'styled-components';

const AnnouncementBanner = () => {
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
          <strong> UWFlow is open source! </strong> Check out the
          <a href="https://github.com/UWFlow/uwflow/releases/tag/v1.0.0">
            announcement here!
          </a>
        </div>
        <button
          style={{
            background: 'none',
            fontSize: '20px',
            opacity: '50%',
            border: 'none',
            cursor: 'pointer',
          }}
          onClick={handleDismiss}
        >
          x
        </button>
      </div>
    </FadeIn>
  );
};

export default AnnouncementBanner;
