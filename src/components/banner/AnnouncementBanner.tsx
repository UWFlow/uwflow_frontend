import React, { useState } from 'react';
import FadeIn from 'react-fade-in';
import { Tool, X } from 'react-feather';

// Bump the banner ID when announcing something new so the banner reappears
// for users who dismissed a previous announcement.
const BANNER_ID = 'maintenance-1am-est';

const AnnouncementBanner = () => {
  const localStorageKey = `banner-dismissed-${BANNER_ID}`;

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
      <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 bg-accent px-6 py-3">
        <Tool aria-hidden="true" className="shrink-0 text-dark1" size={20} />
        <div className="min-w-0 text-md text-dark1">
          <strong>Scheduled maintenance tonight, 1:00–2:00 AM EST.</strong> UW
          Flow may be briefly unavailable during this window.
        </div>
        <button
          aria-label="Dismiss announcement"
          className="flex shrink-0 cursor-pointer items-center border-none bg-transparent p-1 text-dark1 opacity-60 transition-opacity hover:opacity-100"
          onClick={handleDismiss}
          type="button"
        >
          <X size={18} />
        </button>
      </div>
    </FadeIn>
  );
};

export default AnnouncementBanner;
