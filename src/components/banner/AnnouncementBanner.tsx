import React, { useState } from 'react';
import FadeIn from 'react-fade-in';
import { X } from 'lucide-react';
import { DefaultTheme, useTheme } from 'styled-components';

import { Button } from 'components/ui/button';

const AnnouncementBanner = () => {
  const theme: DefaultTheme = useTheme();

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
            announcement here!
          </a>
        </div>
        <Button
          aria-label="Dismiss announcement"
          className="h-8 w-8 shrink-0 text-foreground/60 hover:text-foreground"
          size="icon"
          variant="ghost"
          onClick={handleDismiss}
        >
          <X aria-hidden="true" size={18} />
        </Button>
      </div>
    </FadeIn>
  );
};

export default AnnouncementBanner;
